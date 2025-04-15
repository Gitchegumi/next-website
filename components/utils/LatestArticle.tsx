"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LatestArticleProps {
  additionalContent: { [key: string]: any };
}

const LatestArticle: React.FC<LatestArticleProps> = ({ additionalContent }) => {
  const [latestArticle, setLatestArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch("/api/linkedinArticle");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const article = await response.json();
        setLatestArticle(article);
      } catch (error) {
        console.error("Error fetching LinkedIn article:", error);
      }
    };
    fetchArticle();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <h2 className="text-3xl font-bold text-brand-yellow mb-4">
        {latestArticle ? latestArticle.title : additionalContent["newsTitle"]}
      </h2>
      <p className="text-white mb-4">
        <span className="block text-xs">
          {additionalContent["latestNews"]}{" "}
          <span className="text-brand-yellow">
            {latestArticle
              ? new Date(latestArticle.date).toLocaleDateString()
              : today}
          </span>
        </span>
        <span>
          {latestArticle
            ? latestArticle.description
            : additionalContent["newsDescription"]}{" "}
        </span>
        <Link
          href={
            latestArticle
              ? latestArticle.link
              : "https://www.linkedin.com/company/usarmy-ai/"
          }
          target="_blank"
          className="text-brand-yellow underline hover:text-yellow-200"
        >
          {additionalContent["readMore"]}
        </Link>
      </p>
      <Link
        href={
          "https://www.linkedin.com/company/usarmy-ai/"
        }
        target="_blank"
        className="bg-brand-yellow text-black font-bold py-3 px-6 rounded-lg inline-block hover:bg-yellow-200"
      >
        {additionalContent["otherStories"]}
      </Link>
    </div>
  );
};

export default LatestArticle;
