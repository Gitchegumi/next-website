"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface AnimatedCardsProps {
  jsonPath: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  link,
}) => {
  const cardContent = (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-80 group relative">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-300 
            ${
              id === 3
                ? "scale-[1.6] translate-x-[20%] translate-y-[30%] group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0"
                : "scale-125 group-hover:scale-100"
            } 
            ${id === 3 ? "object-[center_right]" : "object-full"}`}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white transition-all duration-300 group-hover:translate-y-full">
        <div className="text-center p-4">
          <h3 className="relative bottom-[45px] text-xl font-bold mb-2 text-brand-yellow group-hover:translate-y-[-80%] duration-300">
            {title}
          </h3>
          <p className="relative bottom-[45px] text-xs lg:text-sm text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link href={link} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
};

const AnimatedCards: React.FC<AnimatedCardsProps> = ({ jsonPath }) => {
  const [projectCards, setProjectCards] = useState<ProjectCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        setProjectCards(data);
      } catch (error) {
        console.error("Error fetching project cards data:", error);
      }
    };

    fetchData();
  }, [jsonPath]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {projectCards.map((card) => (
        <ProjectCard
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
          link={card.link}
        />
      ))}
    </div>
  );
};

export default AnimatedCards;
