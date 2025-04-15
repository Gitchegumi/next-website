import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface OutlinedBoxProps {
  headerText: string;
  content: string | string[];
}

const OutlinedBox: React.FC<OutlinedBoxProps> = ({ headerText, content }) => {
  const contentText = Array.isArray(content) ? content.join("\n\n") : content;

  return (
    <div className="border-[1px] border-brand-yellow">
      <div className="bg-brand-yellow text-black text-sm p-2 font-bold">
        {headerText}
      </div>
      <div className="text-xs prose prose-sm prose-em:text-red-500 p-2">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{contentText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default OutlinedBox;
