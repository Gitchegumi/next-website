import { promises as fs } from "fs";
import path from "path";
import sanitize from "sanitize-filename";

// Constants
const CONTENT_DIR = path.normalize(
  path.join(process.cwd(), "public", "content")
);
const ALLOWED_EXTENSIONS = [".md", ".json", ".mdx"] as const;
const ALLOWED_CHARS = /^[a-zA-Z0-9-_\.]+$/;
const ALLOWED_DIRS = new Set([
  "join",
  "ai-scholar",
  "ai-technician",
  "content",
  "404",
  "collaborate",
  "coming-soon",
  "component-content",
  "footer",
  "header",
  "home-page",
  "what-we-do",
  "who-we-are",
  "portfolios",
  "resources",
  "contact",
  "privacy",
  "upskill",
]);

// Validate path component
const isValidComponent: (part: string) => boolean = (part: string): boolean => {
  if (!part || typeof part !== "string") return false;
  const sanitized = sanitize(part);
  return Boolean(
    sanitized === part &&
      !part.includes("..") &&
      !path.isAbsolute(part) &&
      ALLOWED_CHARS.test(part) &&
      (ALLOWED_DIRS.has(part) ||
        ALLOWED_EXTENSIONS.some((ext) => part.endsWith(ext)))
  );
};

// Verify path security
const verifyPath = async (targetPath: string): Promise<void> => {
  const normalizedTarget = path.normalize(targetPath);
  const normalizedBase = path.normalize(CONTENT_DIR);

  if (!normalizedTarget.startsWith(normalizedBase)) {
    throw new Error("Invalid path location");
  }

  try {
    await fs.access(normalizedTarget);
  } catch {
    throw new Error("File access denied");
  }
};

const validateAndResolvePath = (
  basePath: string,
  ...parts: string[]
): string => {
  // Use safe base path
  const safeBasePath = path.resolve(CONTENT_DIR);

  // Validate and sanitize each path part
  const sanitizedParts = parts.map((part) => {
    if (!isValidComponent(part)) {
      throw new Error(`Invalid path component: ${part}`);
    }
    return sanitize(part);
  });

  // Construct final path safely
  const finalPath = path.join(safeBasePath, ...sanitizedParts);

  // Ensure the final path is within the allowed directory
  if (!finalPath.startsWith(safeBasePath)) {
    throw new Error("Path traversal detected");
  }

  return finalPath;
};

export const getContent = async (
  directoryParts: string | string[],
  filePaths: string[]
): Promise<{ [key: string]: any }> => {
  const contents: { [key: string]: any } = {};

  if (!directoryParts || !Array.isArray(filePaths)) {
    throw new Error("Invalid input parameters");
  }

  const dirParts = Array.isArray(directoryParts)
    ? directoryParts
    : [directoryParts];

  for (const filePath of filePaths) {
    try {
      // Validate and resolve the full path before any file operations
      const fullPath = validateAndResolvePath(
        CONTENT_DIR,
        ...dirParts.filter(Boolean),
        filePath
      );

      await verifyPath(fullPath);

      const content = await fs.readFile(fullPath, "utf8");
      contents[filePath] = filePath.endsWith(".json")
        ? JSON.parse(content)
        : content;
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
      contents[filePath] = "";
    }
  }

  return contents;
};
