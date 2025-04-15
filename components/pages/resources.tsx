import React from "react";
import dynamic from "next/dynamic";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

const TestimonialCarousel = dynamic(
  () => import("@/components/utils/TestimonialCarousel"),
  { ssr: false }
);

interface ResourcesPageProps {
  contents: { [key: string]: any };
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ contents }) => {
  const videos = contents["videos.json"];
  const content = contents["content.json"];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow md:translate-y-48 overflow-y-auto">
        {/* Top Material */}
        <div className="font-gi consistent-margin">
          <div className="mb-8">
            <MarkDownProperties content={contents["resources.md"]} />
          </div>
        </div>

        {/* Videos Section */}
        <div className="consistent-margin">
          <h2 className="text-xl font-bold text-black mb-8">
            {content["videos"]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {videos.map(
              (video: { title: string; url: string }, index: number) => (
                <div key={index} className="aspect-w-16 aspect-h-8 mb-40">
                  <iframe
                    src={video.url}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "resources";
  const filePaths = [
    "resources.md",
    "videos.json",
    "recommendations.md",
    "content.json",
  ];
  const content = await getContent(directory, filePaths);
  return <ResourcesPage contents={content} />;
}
