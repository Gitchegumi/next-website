import React from "react";
import Link from "next/link";
import { getContent } from "@/components/utils/contentUtils";
import ResourceTail from "@/components/resources-tail";
import MarkDownProperties from "@/components/utils/MarkDownProperties";

interface PortfolioPageProps {
  contents: { [key: string]: any };
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ contents }) => {
  const JSON = contents["portfolio.json"];

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <div className="relative flex-grow pt-4 md:pt-0 md:translate-y-40 overflow-y-auto">
        {/* Breadcrumb */}
        <nav className="md:pt-4 consistent-margin">
          <ol className="list-reset flex text-gray-700">
            <li>
              <Link href="/what-we-do" className="hover:text-brand-yellow">
                {JSON["title"]}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="underline">{JSON["portfolios"]}</li>
          </ol>
        </nav>
        {/* Content */}
        <div className="relative flex flex-col prose prose-lg justify-start max-w-full font-gi pt-8 consistent-margin md:mb-40">
          <MarkDownProperties content={contents["portfolio.md"]} />
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const directory = ["what-we-do", "portfolios"];
  const filePaths = ["portfolio.md", "portfolio.json"];
  const content = await getContent(directory, filePaths);
  return <PortfolioPage contents={content} />;
}
