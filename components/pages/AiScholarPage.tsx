import React from "react";
import Image from "next/image";
import { getContent } from "@/components/utils/contentUtils";
import dynamic from "next/dynamic";
import MarkDownProperties from "../utils/MarkDownProperties";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import ResourceTail from "@/components/resources-tail";

const OutlinedBox = dynamic(() => import("@/components/utils/OutlinedBox"), {
  ssr: false,
});
const TestimonialCarousel = dynamic(
  () => import("@/components/utils/TestimonialCarousel"),
  { ssr: false }
);
const CustomSection = dynamic(
  () => import("@/components/utils/CustomSections"),
  { ssr: false }
);

interface AiScholarPageProps {
  contents: { [key: string]: string };
}

const AiScholarPage: React.FC<AiScholarPageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow translate-y-20 md:translate-y-40 overflow-y-auto mb-40">
        {/* Top Material */}
        <div className="relative flex flex-col font-gi consistent-margin">
          <div className="flex flex-col md:flex-row justify-between items-start md:mt-10 mb-8">
            <div className=" max-w-4xl">
              <MarkDownProperties content={contents["main.md"]} />
            </div>
            <div className="ml-4 max-w-sm">
              <OutlinedBox
                headerText="Information for AI Scholar Prospects"
                content="The FY25 application window is closed. Be on the lookout for the FY25 Brodening Opportunities Catalogue!"
              />
            </div>
          </div>
        </div>
        <div className="relative justify-between items-start consistent-margin mt-8">
          <div className="max-w-4xl">
            <MarkDownProperties content={contents["testamonial-title.md"]} />
            <div className="mt-4 mb-20">
              <TestimonialCarousel
                jsonPath="/content/join/ai-scholar/testamonials.json"
                backgroundColor="bg-gray-200"
                marginClass="mx-8"
                buttonPadding="mt-64 md:mt-28"
              />
            </div>
          </div>
        </div>
        <div className="consistent-margin max-w-4xl">
          <CustomSection jsonPath="/content/join/ai-scholar/more_info.json" />
        </div>
        <div className="relative consistent-margin">
          <div className="relative bg-white border-8 border-white shadow-lg overflow-hidden">
            <Image
              src="/assets/images/dt-pgh.png"
              alt="Downtown Pittsburgh"
              width={1280}
              height={720}
              className="object-cover w-full h-64"
            />
            <button className="absolute top-4 right-4 text-white">
              <FullscreenOutlinedIcon fontSize="large" />
            </button>
          </div>
          <div className="text-xs italic text-[#888888]">
            <MarkDownProperties content={contents["caption.md"]} />
          </div>
        </div>
        <div className="consistent-margin mt-8">
          <div className="text-center bg-brand-yellow pb-4 flex justify-center mb-8 pt-20">
            <CustomSection jsonPath="/content/join/ai-scholar/apply_now.json" />
          </div>
        </div>
        {/* <ResourceTail /> */}
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = ["join", "ai-scholar"];
  const filePaths = ["main.md", "testamonial-title.md", "caption.md"];
  const content = await getContent(directory, filePaths);
  return <AiScholarPage contents={content} />;
}
