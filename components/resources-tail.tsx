import React from "react";
import Link from "next/link";
import { getContent } from "./utils/contentUtils";

interface ResourceTailProps {
    contents: { [key: string]: any };
  }

const ResourceTail: React.FC<ResourceTailProps> = ({ contents }) => {
    const content = contents["resource-tail.json"];

    return (
        <div className="bg-white py-8">
            <div className="solid-bar consistent-margin"></div>
            <div className="max-w-5xl md:mb-40 consistent-margin pt-8">
                <h1 className="text-xl font-bold text-black mb-8">
                    <span className="block">{content["title"]}</span>
                </h1>
                <p className="text-black">
                {content["description"]}
                </p>
                <div className="pt-2">
                    <Link href="/resources" className="bg-brand-blue text-white font-bold py-3 px-6 rounded-lg inline-block hover:bg-blue-200 hover:text-black">
                    {content["button"]}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default async function Page() {
    const directory = "component-content";
    const filePaths = [
      "resource-tail.json"
    ];
    const content = await getContent(directory, filePaths);
    return <ResourceTail contents={content} />;
  }