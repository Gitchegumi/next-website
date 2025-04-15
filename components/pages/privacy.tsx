import React from "react";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

interface PrivacyPageProps {
  contents: { [key: string]: any };
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ contents }) => {

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow translate-y-20 md:translate-y-40 overflow-y-auto">
        {/* Content */}
        <div className="relative flex flex-col justify-start font-gi md:consistent-margin">
          <div className="mb-40 mt-8 prose prose-lg max-w-full font-gi">
            <MarkDownProperties content={contents["privacy.md"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "privacy"
  const filePaths = ["privacy.md"];
  const content = await getContent(directory, filePaths);
  return <PrivacyPage contents={content} />;
}