import React from "react";
import dynamic from "next/dynamic";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

const AlternatingSections = dynamic(
  () => import("@/components/utils/AlternatingSections"),
  { ssr: false }
);
const ImageGrid = dynamic(() => import("@/components/utils/ImageGrid"), {
  ssr: false,
});

interface WhatWeDoPageProps {
  contents: { [key: string]: string };
}

const WhatWeDoPage: React.FC<WhatWeDoPageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow md:translate-y-40 overflow-y-auto">
        {/* Content */}
        <div className="relative flex flex-col justify-start pt-8 font-gi consistent-margin">
          <div className="mb-8 prose prose-lg max-w-full font-gi">
            <MarkDownProperties content={contents["whatwedo.md"]} />
          </div>
        </div>
        {/* AI2C Portfolios */}
        <div className="ml-16">
          <div className="relative flex flex-col justify-start font-gi consistent-margin">
            <div>
              <MarkDownProperties content={contents["portfolios.md"]} />
              <div className="mt-4 mb-16">
                <ImageGrid
                  jsonPath="/content/what-we-do/teamImages.json"
                  imageShape="circle"
                  columns={3}
                  backgroundColor="#f9dd41"
                  padding="2.5rem"
                />
              </div>
            </div>
          </div>
          {/* Alternating Sections */}
          <div className="consistent-margin">
            <p className="text-2xl font-bold">
              Current Examples of Minimum Viable Products from the AI2C
              Incubator:
            </p>
            <AlternatingSections jsonPath="/content/what-we-do/what_we_do_sections.json" />
          </div>
        </div>
        <div className="consistent-margin mb-40 prose prose-lg max-w-full font-gi">
          <MarkDownProperties content={contents["integrated_activities.md"]} />
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "what-we-do";
  const filePaths = [
    "whatwedo.md",
    "portfolios.md",
    "integrated_activities.md",
  ];
  const content = await getContent(directory, filePaths);
  return <WhatWeDoPage contents={content} />;
}
