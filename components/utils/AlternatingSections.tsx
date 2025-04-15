"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomSection from "@/components/utils/CustomSections";
import OutlinedBox from "@/components/utils/OutlinedBox";

interface CustomSectionProps {
  marginClass?: string;
  title?: string;
  description: string;
  buttonText: string;
  buttonTextColor?: string;
  hoverTextColor?: string;
  buttonLink: string;
  buttonColor?: string;
  widthClass?: string;
  titleMargin?: string;
}

interface OutlinedBoxProps {
  headerText: string;
  content: string;
}

const componentMap = {
  CustomSection: CustomSection,
  OutlinedBox: OutlinedBox,
};

type ComponentType = keyof typeof componentMap;

interface SectionContent {
  type: ComponentType;
  props: CustomSectionProps | OutlinedBoxProps;
}

interface SectionProps {
  id: number;
  title?: string;
  content: SectionContent | string;
  imageSrc?: string;
  imageAlt?: string;
  imageOnLeft?: boolean;
  bulletPoints?: string[];
  imageComponent?: SectionContent;
  marginClass?: string;
  imageWidthClass?: string;
  contentWidthClass?: string;
  imageOnBottomSmall?: boolean;
}

interface AlternatingSectionsProps {
  jsonPath: string;
}

const isCustomSectionProps = (
  props: CustomSectionProps | OutlinedBoxProps
): props is CustomSectionProps => {
  return (props as CustomSectionProps).description !== undefined;
};

const isOutlinedBoxProps = (
  props: CustomSectionProps | OutlinedBoxProps
): props is OutlinedBoxProps => {
  return (props as OutlinedBoxProps).headerText !== undefined;
};

export const AlternatingSection: React.FC<SectionProps> = ({
  id,
  title,
  content,
  imageSrc,
  imageAlt,
  imageOnLeft = true,
  bulletPoints,
  imageComponent,
  marginClass = "mb-20",
  imageWidthClass = "w-full md:w-1/6",
  contentWidthClass = "w-full md:w-5/6",
  imageOnBottomSmall = false,
}) => {
  return (
    <div
      id={`section-${id}`}
      className={`flex flex-col ${
        imageOnBottomSmall ? "flex-col-reverse" : "flex-col"
      } items-start py-8 font-gi ${
        imageOnLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`${imageWidthClass} px-4 mb-6 md:mb-0`}>
        {imageComponent &&
          (isCustomSectionProps(imageComponent.props) ? (
            <CustomSection
              marginClass={imageComponent.props.marginClass}
              title={imageComponent.props.title}
              description={imageComponent.props.description}
              buttonText={imageComponent.props.buttonText}
              buttonTextColor={imageComponent.props.buttonTextColor}
              hoverTextColor={imageComponent.props.hoverTextColor}
              buttonLink={imageComponent.props.buttonLink}
              buttonColor={imageComponent.props.buttonColor}
              widthClass={imageComponent.props.widthClass}
              titleMargin={imageComponent.props.titleMargin}
            />
          ) : isOutlinedBoxProps(imageComponent.props) ? (
            <OutlinedBox
              headerText={imageComponent.props.headerText}
              content={imageComponent.props.content}
            />
          ) : null)}
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt || "Image"}
            width={100}
            height={100}
            className="object-contain w-full h-auto"
            priority
          />
        )}
      </div>
      <div className={`${contentWidthClass} ${marginClass}`}>
        <h2 id={`section-title-${id}`} className="text-xl font-bold text-black">
          <span className="block">{title}</span>
        </h2>
        <div className="text-black mb-4">
          {typeof content === "string"
            ? content
            : isCustomSectionProps(content.props)
            ? React.createElement(CustomSection, content.props)
            : isOutlinedBoxProps(content.props)
            ? React.createElement(OutlinedBox, content.props)
            : null}
        </div>
        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="list-disc list-inside">
            {bulletPoints.map((point, index) => (
              <li key={`${id}-${index}`} className="mb-0">
                {point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const AlternatingSections: React.FC<AlternatingSectionsProps> = ({
  jsonPath,
}) => {
  const [sections, setSections] = useState<SectionProps[]>([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(jsonPath);
        const data: SectionProps[] = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Failed to fetch sections:", error);
      }
    };

    fetchSections();
  }, [jsonPath]);

  return (
    <>
      {sections.map((section) => (
        <AlternatingSection
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
          imageSrc={section.imageSrc}
          imageAlt={section.imageAlt}
          imageOnLeft={section.imageOnLeft ?? section.id % 2 === 0}
          bulletPoints={section.bulletPoints}
          imageComponent={section.imageComponent}
          marginClass={section.marginClass}
          imageWidthClass={section.imageWidthClass}
          contentWidthClass={section.contentWidthClass}
          imageOnBottomSmall={section.imageOnBottomSmall}
        />
      ))}
    </>
  );
};

export default AlternatingSections;
