"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  link?: string;
  width?: number;
  height?: number;
}

interface ImageGridProps {
  jsonPath: string;
  imageShape?: "circle" | "square";
  columns?: number;
  backgroundColor?: string;
  padding?: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  jsonPath,
  imageShape,
  columns,
  backgroundColor,
  padding,
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(jsonPath);
        const data: ImageItem[] = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Failed to fetch images:", error);
      }
    };

    fetchImages();
  }, [jsonPath]);

  const gridClassName = `grid gap-4 md:gap-8 ${
    columns === 2
      ? "md:grid-cols-2"
      : columns === 3
      ? "md:grid-cols-3"
      : columns === 4
      ? "md:grid-cols-4"
      : columns === 5
      ? "md:grid-cols-5"
      : columns === 6
      ? "md:grid-cols-6"
      : "md:grid-cols-1"
  }`;

  const imageClassName = imageShape === "circle" ? "rounded-full" : "";

  return (
    <div className={`block ${gridClassName}`}>
      {images.map((image) => {
        const imgWidth = image.width || 160;
        const imgHeight = image.height || 160;

        return (
          <div key={image.id} className="flex flex-col items-center">
            {image.link ? (
              <Link href={image.link}>
                <div
                  className={`overflow-hidden ${imageClassName}`}
                  style={{
                    width: imgWidth,
                    height: imgHeight,
                    backgroundColor: backgroundColor || "transparent",
                    padding: padding || "0",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={imgWidth}
                    height={imgHeight}
                    className="object-contain"
                  />
                </div>
              </Link>
            ) : (
              <div
                className={`overflow-hidden ${imageClassName}`}
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  backgroundColor: backgroundColor || "transparent",
                  padding: padding || "0",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={imgWidth}
                  height={imgHeight}
                  className="object-contain"
                />
              </div>
            )}
            <h3 className="mt-2 text-center max-w-72 font-bold">
              {image.title}
            </h3>
            {image.subtitle && (
              <p className="text-balance max-w-72">{image.subtitle}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
