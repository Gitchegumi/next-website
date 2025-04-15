import React from "react";
import { getContent } from "@/components/utils/contentUtils";
import MarkDownProperties from "@/components/utils/MarkDownProperties";
import PhoneBook from "../utils/PhoneBook";

interface ContactUsPageProps {
  contents: { [key: string]: any };
}

const ContactUsPage: React.FC<ContactUsPageProps> = ({ contents }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-white overflow-hidden">
        <div className="relative flex-grow translate-y-20 md:translate-y-40 overflow-y-auto">
          {/* Content */}
          <div className="relative flex flex-col justify-start p-8 font-gi mb-40 consistent-margin">
            <div className="prose prose-lg max-w-full font-gi">
              <MarkDownProperties content={contents["intro.md"]} />
              <div className="flex flex-col md:flex-row md:col-2 md:space-x-4 mb-4">
                <MarkDownProperties content={contents["contact.md"]} />
                <MarkDownProperties content={contents["location.md"]} />
              </div>
              <p className="text-xl font-bold">Supporting Contact</p>
              <PhoneBook />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default async function Page() {
  const directory = "contact";
  const filePaths = ["contact.md", "intro.md", "location.md"];
  const content = await getContent(directory, filePaths);
  return <ContactUsPage contents={content} />;
}
