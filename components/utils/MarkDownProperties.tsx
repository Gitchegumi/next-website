import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const H1: Components["h1"] = ({ children }) => (
  <h1 className="text-2xl font-gi font-bold text-black mb-8">
    {children || "Untitled"}
  </h1>
);

const H2: Components["h2"] = ({ children }) => (
  <h2 className="text-xl font-gi font-bold text-black my-8">
    {children || "Untitled"}
  </h2>
);

const H3: Components["h3"] = ({ children }) => (
  <h3 className="text-lg font-gi font-bold text-[#949494]">
    {children || "Untitled"}
  </h3>
);

const P: Components["p"] = ({ children }) => (
  <p className="text-black font-gi mt-2">{children}</p>
);

const A: Components["a"] = ({ children, href, target, rel }) => (
  <a
    className="text-[#0073E6] hover:text-blue-200 no-underline font-gi"
    href={href}
    target={target}
    rel={rel}
  >
    {children || href}
  </a>
);

const Ul: Components["ul"] = ({ children }) => (
  <ul className="list-disc ml-8 font-gi">{children}</ul>
);

const Li: Components["li"] = ({ children }) => (
  <li className="mt-1 list-decimal font-gi">{children}</li>
);

// Custom components for the homepage
const HomePageH1: Components["h1"] = ({ children }) => (
  <h1 className="text-5xl font-gi font-bold text-white mb-4">
    {children || "Untitled"}
  </h1>
);

const HomePageH2: Components["h2"] = ({ children }) => (
  <h2 className="text-3xl font-gi font-bold text-brand-yellow mb-4">
    {children || "Untitled"}
  </h2>
);

const HomePageH3: Components["h3"] = ({ children }) => (
  <h3 className="text-2xl font-gi text-gray-200 mb-8">
    {children || "Untitled"}
  </h3>
);

const HomePageP: Components["p"] = ({ children }) => (
  <p className="text-white font-gi mb-12 text-wrap">{children}</p>
);

interface MarkDownPropertiesProps {
  content: string;
  isHomePage?: boolean;
}

const components: Components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: Ul,
  li: Li,
};

const homePageComponents: Components = {
  ...components,
  h1: HomePageH1,
  h2: HomePageH2,
  h3: HomePageH3,
  p: HomePageP,
};

const MarkDownProperties: React.FC<MarkDownPropertiesProps> = ({
  content,
  isHomePage = false,
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={isHomePage ? homePageComponents : components}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDownProperties;
