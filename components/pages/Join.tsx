import React from "react";
import { getContent } from "@/components/utils/contentUtils";
import dynamic from "next/dynamic";
import MarkDownProperties from "../utils/MarkDownProperties";

const AlternatingSections = dynamic(
  () => import("@/components/utils/AlternatingSections"),
  { ssr: false }
);
const TestimonialCarousel = dynamic(
  () => import("@/components/utils/TestimonialCarousel"),
  { ssr: false }
);
const CustomSection = dynamic(
  () => import("@/components/utils/CustomSections"),
  { ssr: false }
);

interface JoinPageProps {
  contents: { [key: string]: string };
}

const JoinUsPage: React.FC<JoinPageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow translate-y-20 md:translate-y-40 overflow-y-auto mb-40">
        {/* Top Material */}
        <div className="relative flex flex-col justify-start md:pt-8 font-gi consistent-margin">
          <div className="mb-8">
            <MarkDownProperties content={contents["join.md"]} />
          </div>
        </div>
        <div className="consistent-margin">
          <AlternatingSections jsonPath="/content/join/join_sections.json" />
        </div>
        <div className="consistent-margin">
          <TestimonialCarousel
            jsonPath="/data/testamonials.json"
            backgroundColor="bg-gray-200"
            marginClass="mx-8"
            buttonPadding="mt-40 md:mt-14"
          />
        </div>
        <div className="consistent-margin">
          <AlternatingSections jsonPath="/content/join/tda.json" />
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "join";
  const filePaths = ["join.md"];
  const content = await getContent(directory, filePaths);
  return <JoinUsPage contents={content} />;
}
