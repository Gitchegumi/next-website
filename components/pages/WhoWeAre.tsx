import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

const ImageGrid = dynamic(() => import("@/components/utils/ImageGrid"), {
  ssr: false,
});

const TestimonialCarousel = dynamic(
  () => import("@/components/utils/TestimonialCarousel"),
  {
    ssr: false,
  }
);

interface WhoWeArePageProps {
  contents: { [key: string]: string };
}

const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* Image */}
      <div className="md:absolute inset-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/images/map graphic.png"
          alt="Map Image"
          width={1027}
          height={864}
          style={{ objectFit: "cover", objectPosition: "right-top" }}
          className="absolute right-0 md:translate-y-40 opacity-100 md:opacity-70"
          priority
        />
      </div>
      <div className="relative flex-grow md:translate-y-40 overflow-y-auto">
        <div className="relative flex flex-col justify-start pt-8 font-gi consistent-margin">
          <div className="prose prose-lg prose-full-width max-w-md mb-10">
            <MarkDownProperties content={contents["whoweare.md"]} />
          </div>
          <div className="max-w-5xl mb-20">
            <MarkDownProperties content={contents["goals.md"]} />
            <div className="mt-8">
              <ImageGrid
                jsonPath="/content/who-we-are/goalImages.json"
                imageShape="circle"
                columns={3}
                backgroundColor="#f9dd41"
                padding="1rem"
              />
            </div>
          </div>
          <div className="w-full mb-40">
            <MarkDownProperties content={contents["leadership.md"]} />
            <div className="max-w-screen-xl w-full mx-auto my-8">
              <ImageGrid
                jsonPath="/content/who-we-are/leadershipImages.json"
                imageShape="square"
                columns={4}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Testimonial Section */}
      <TestimonialCarousel
        jsonPath="/data/testamonials.json"
        marginClass="consistent-margin"
        buttonPadding="mt-32 md:mt-10"
      />
      <div className="bg-white pt-16">
        <div className="consistent-margin">
          <MarkDownProperties content={contents["programs.md"]} />
          <div className="mt-8 text-balance">
            <ImageGrid
              jsonPath="/content/who-we-are/programImages.json"
              imageShape="square"
              columns={3}
            />
          </div>
        </div>
        {/* Resources
        <ResourceTail /> */}
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "who-we-are";
  const filePaths = ["whoweare.md", "leadership.md", "goals.md", "programs.md"];
  const content = await getContent(directory, filePaths);
  return <WhoWeArePage contents={content} />;
}
