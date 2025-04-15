import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getContent } from "../utils/contentUtils";
import MarkDownProperties from "../utils/MarkDownProperties";
import LatestArticle from "../utils/LatestArticle";

const TestimonialCarousel = dynamic(
  () => import("@/components/utils/TestimonialCarousel"),
  { ssr: false }
);
const AnimatedCards = dynamic(() => import("../utils/AnimatedCards"), {
  ssr: false,
});

interface HomePageProps {
  contents: { [key: string]: any };
}

const HomePage: React.FC<HomePageProps> = ({ contents }) => {
  const additionalContent = contents["additional-content.json"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40rem] md:h-[calc(100vh-80px)] md:pt-0">
        <Image
          src="/assets/images/hero-image.jpg"
          alt="Hero Image"
          fill
          className="transform scale-x-[-1] object-cover object-left"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-top md:justify-center pt-16 px-4 md:p-8">
          <div className="consistent-margin">
            <MarkDownProperties
              content={contents["hero-section.md"]}
              isHomePage={true}
            />
            <Link
              href="/join"
              className="bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg inline-block hover:bg-yellow-200"
            >
              {additionalContent["actionText"]}
            </Link>
          </div>
        </div>
      </div>

      {/* Project Cards */}
      <div className="bg-white pt-20 pb-8 md:py-16">
        <div className="max-w-7xl consistent-margin md:mx-auto px-4">
          <div className="-mt-32">
            <AnimatedCards jsonPath="/content/home-page/project-cards.json" />
          </div>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <TestimonialCarousel 
        jsonPath="/data/testamonials.json"
        marginClass="consistent-margin"
        buttonPadding="mt-32 md:mt-16"
      />

      {/* Additional Sections */}
      <div className="bg-white">
        <div className="max-w-[100%]">
          <div className="bg-white pb-16 consistent-margin">
            <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-16 bg-brand-dark-bg p-4">
              <div>
                <MarkDownProperties
                  content={contents["be-involved-title.md"]}
                  isHomePage={true}
                />
              </div>
              <div>
                <LatestArticle additionalContent={additionalContent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = "home-page";
  const filePaths = [
    "be-involved-title.md",
    "hero-section.md",
    "additional-content.json",
  ];
  const content = await getContent(directory, filePaths);
  return <HomePage contents={content} />;
}
