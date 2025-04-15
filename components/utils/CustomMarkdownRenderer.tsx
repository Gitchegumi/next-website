import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import ResourceTail from "@/components/resources-tail";

const ImageGrid = dynamic(() => import("@/components/utils/ImageGrid"), { ssr: false });
const TestimonialCarousel = dynamic(() => import("@/components/utils/TestimonialCarousel"), { ssr: false });

interface CustomComponents extends Components {
    ImageGrid: React.FC<ComponentProps>;
    TestimonialCarousel: React.FC<ComponentProps>;
    ResourceTail: React.FC<ComponentProps>;
  }

const H1: Components["h1"] = ({ children }) => (
  <h1 className="text-xl font-gi font-bold text-black mb-8">
    {children || "Untitled"}
  </h1>
);

const P: Components["p"] = ({ children }) => (
  <p className="text-black font-gi mt-2">
    {children}
  </p>
);

const A: Components["a"] = ({ children, href }) => (
  <a
    className="text-[#0073E6] hover:text-blue-200 font-gi"
    href={href}
  >
    {children || href}
  </a>
);

const Ul: Components["ul"] = ({ children }) => (
  <ul className="list-disc ml-8 font-gi">
    {children}
  </ul>
);

const Li: Components["li"] = ({ children }) => (
  <li className="mt-1 list-disc font-gi">
    {children}
  </li>
);

interface ComponentProps {
  node?: any;
  [key: string]: any;
}

const components: CustomComponents = {
  h1: H1,
  p: P,
  a: A,
  ul: Ul,
  li: Li,
  ImageGrid: ({ jsonPath }) => (
    <ImageGrid jsonPath={jsonPath} />
  ),
  TestimonialCarousel: () => (
    <TestimonialCarousel />
  ),
  ResourceTail: () => (
    <ResourceTail />
  ),
};

interface CustomMarkdownRendererProps {
  content: string;
}

const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({
  content,
}) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[
        rehypeRaw,
        [rehypeReact, { createElement: React.createElement, components }],
      ]}
  >
    {content}
  </ReactMarkdown>
);

export default CustomMarkdownRenderer;
