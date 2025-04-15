import React from "react";
import Image from "next/image";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

interface BackgroundImageProps {
  src: string;
  alt: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={1920}
    height={1080}
    style={{ objectFit: "contain", objectPosition: "top" }}
    className="relative right-0"
    priority
  />
);

interface HeaderContentProps {
  title: string;
  description?: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({
  title,
  description,
}) => (
  <div className="relative mb-42 consistent-margin">
    <h1 className="text-xl font-bold text-white mb-8">
      <span className="block">{title}</span>
    </h1>
    <p className="text-white">{description}</p>
  </div>
);

interface CollaboratePageProps {
  contents: { [key: string]: string };
}

const CollaboratePage: React.FC<CollaboratePageProps> = ({ contents }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow md:translate-y-40 md:pt-0 overflow-y-auto">
        {/* Content */}
        {/* <div className="relative flex flex-col justify-start py-8 font-gi w-full">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <BackgroundImage
              src="/assets/images/collaborate-header.jpg"
              alt="Background Image"
            />
          </div>
          <HeaderContent
            title="Submit an Idea"
            description="Partner with the Army to apply innovation techniques and transform our operations."
          />
        </div> */}
        <div className="prose prose-lg max-w-full consistent-margin">
          <MarkDownProperties content={contents["collaborate.md"]} />
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "collaborate";
  const filePaths = ["collaborate.md"];
  const content = await getContent(directory, filePaths);
  return <CollaboratePage contents={content} />;
}
