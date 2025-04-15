"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { lighten } from "polished";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface CustomSectionProps {
  marginClass?: string;
  title?: string;
  description?: string | string[];
  buttonText?: string;
  buttonTextColor?: string;
  hoverTextColor?: string;
  buttonLink?: string;
  newPage?: boolean;
  buttonColor?: string;
  widthClass?: string;
  titleMargin?: string;
  jsonPath?: string;
}

const CustomSection: React.FC<CustomSectionProps> = ({
  marginClass = "mb-20",
  title,
  description = "",
  buttonText = "Learn More",
  buttonTextColor = "white",
  hoverTextColor = "black",
  buttonLink = "#",
  newPage = false,
  buttonColor = "#269AFF",
  widthClass = "max-w-5xl",
  titleMargin = "mb-8",
  jsonPath,
}) => {
  const [content, setContent] = useState<{
    title?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    widthClass?: string;
    newPage?: boolean;
  }>({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (jsonPath) {
        try {
          setIsLoading(true);
          const response = await fetch(jsonPath);
          const data = await response.json();
          setContent({
            ...data,
            newPage: Boolean(data.newPage),
          });
        } catch (error) {
          console.error("Error fetching content:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [jsonPath]);

  const buttonStyles = {
    backgroundColor: buttonColor,
    color: buttonTextColor,
    fontWeight: "bold",
    padding: "0.75rem 1.5rem",
    borderRadius: "0.5rem",
    display: "inline-block",
    transition: "background-color 0.3s, color 0.3s",
  };

  const hoverStyles = {
    backgroundColor: lighten(0.1, buttonColor),
    color: hoverTextColor,
  };

  const descriptionText = Array.isArray(content.description)
    ? content.description.join("\n\n")
    : Array.isArray(description)
    ? description.join("\n\n")
    : content.description || description;

  console.log("Props newPage:", newPage);
  console.log("Content newPage:", content.newPage);

  return (
    <div className={`${marginClass} ${content.widthClass || widthClass}`}>
      <h1 className={`text-xl font-bold text-black ${titleMargin}`}>
        <span className="block">{content.title || title}</span>
      </h1>
      <div className="text-black prose prose-full-width">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {descriptionText}
        </ReactMarkdown>
      </div>
      <div className="pt-2">
        <Link
          href={content.buttonLink || buttonLink || "#"}
          target={
            isLoading ? "_self" : content.newPage === true ? "_blank" : "_self"
          }
          style={buttonStyles}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, hoverStyles);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, buttonStyles);
          }}
        >
          {content.buttonText || buttonText}
        </Link>
      </div>
    </div>
  );
};

export default CustomSection;
