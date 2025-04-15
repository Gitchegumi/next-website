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
const AlternatingSections = dynamic(
  () => import("@/components/utils/AlternatingSections"),
  { ssr: false }
);

interface AiTechPageProps {
  contents: { [key: string]: string };
}

const AiTechPage: React.FC<AiTechPageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow translate-y-20 md:translate-y-40 overflow-y-auto">
        {/* Top Material */}
        <div className="relative flex flex-col font-gi consistent-margin">
          <div className="flex flex-col lg:flex-row justify-between items-start md:mt-10 mb-8">
            <div className=" max-w-4xl">
              <MarkDownProperties content={contents["main.md"]} />
            </div>
            <div className="ml-4 max-w-sm">
              <OutlinedBox
                headerText="Information for AI Technitian Applications"
                content={[
                  "Portal Closed until 01 May 2025",
                  "Applications will be accepted from 01 May 2025 to 30 June 2025",
                  "Elligible Ranks: SGT-SFC, CW2-CW3, and 1LT-MAJ",
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-start consistent-margin mt-8">
          <div className=" max-w-4xl">
            <MarkDownProperties content={contents["testamonial-title.md"]} />
            <div className="mt-4 mb-8">
              <TestimonialCarousel
                jsonPath="/content/join/ai-technician/testamonials.json"
                backgroundColor="bg-gray-200"
                marginClass="mx-8"
                buttonPadding="mt-72 md:mt-36"
              />
            </div>
          </div>
          <div className="ml-4 max-w-sm">
            <OutlinedBox
              headerText="Application Portal"
              content={[
                "The portal can be accessed <a href='https://play.apps.appsplatform.us/play/e/default-fae6d70f-954b-4811-92b6-0530d6f84c43/a/93892b50-a94c-428a-9521-35bda96a969e?tenantId=fae6d70f-954b-4811-92b6-0530d6f84c43' target='_blank' rel='noopener noreferer'>here</a> *CaC Required*",
                "*The portal is currently closed and will re-open on* 01 May 2025",
              ]}
            />
          </div>
        </div>
        <div className="prose prose-full-width">
          <div className="max-w-5xl consistent-margin">
          <CustomSection jsonPath="/content/join/ai-technician/more_info.json" />
          </div>
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
          <div className="text-xs italic text-[#888888] mb-8">
            <MarkDownProperties content={contents["caption.md"]} />
          </div>
        </div>
        <div className="consistent-margin">
          <div className="text-center bg-brand-yellow flex justify-center content-center pt-20 mb-40">
            <CustomSection jsonPath="/content/join/ai-technician/apply_now.json" />
          </div>
        </div>
        {/* <ResourceTail /> */}
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = ["join", "ai-technician"];
  const filePaths = ["main.md", "testamonial-title.md", "caption.md"];
  const content = await getContent(directory, filePaths);
  return <AiTechPage contents={content} />;
}
