"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconButton } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface FooterProps {
  contents: { [key: string]: any };
}

const Footer: React.FC<FooterProps> = ({ contents }) => {
  const footer = contents;

  const socialLinks = [
    {
      id: "facebook",
      icon: FacebookRoundedIcon,
      url: "https://www.facebook.com/",
    },
    {
      id: "twitter",
      icon: XIcon,
      url: "https://x.com/USArmyAI",
    },
    {
      id: "linkedin",
      icon: LinkedInIcon,
      url: "https://www.linkedin.com/company/usarmy-ai/",
    },
  ];

  const linkClass = "text-white no-underline mb-2 text-sm hover:underline";
  const headerClass = "text-base mb-4 text-gray-400";

  return (
    <footer className="bg-brand-dark-bg py-10 text-white font-gi">
      <div className="consistent-margin">
        <div className="flex justify-between flex-wrap">
          <div className="flex items-center mb-5">
            <Image
              src="/assets/images/ai2c-logo.png"
              alt="AI2C Logo"
              width={60}
              height={60}
              className="mr-4"
            />
            <h2 className="text-xl leading-tight m-0">
              {footer["title-1"]}
              <br />
              {footer["title-2"]}
            </h2>
          </div>
          <div>
            <div className="flex gap-32">
              <div className="flex flex-col">
                <h3 className={headerClass}>{footer["ai2c"]}</h3>
                <Link href="/who-we-are" className={linkClass}>
                  {footer["about-us"]}
                </Link>
                <Link href="/contact" target="_blank" className={linkClass}>
                  {footer["contact-us"]}
                </Link>
                <Link
                  href="https://www.usajobs.gov/search/results/?l=&p=1&k=artificial%20intelligence%20integration%20center"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["careers"]}
                </Link>
                <Link
                  href="https://open.defense.gov/transparency/foia.aspx"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["foia"]}
                </Link>
                <Link
                  href="https://prhome.defense.gov/NoFear/"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["no-fear-act"]}
                </Link>
              </div>

              <div className="flex flex-col">
                <h3 className={headerClass}>{footer["support"]}</h3>
                <Link href="/privacy" className={linkClass}>
                  {footer["privacy-policy"]}
                </Link>
                <Link
                  href="https://www.defense.gov/Legal-Administrative/Privacy-Security/"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["privacy"]}
                </Link>
                <Link
                  href="https://www.esd.whs.mil/DD/plainlanguage/"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["terms"]}
                </Link>
                <Link
                  href="https://www.defense.gov/Legal-Administrative/Privacy-Security/"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["accessibility"]}
                </Link>
                <Link
                  href="https://www.defense.gov//Resources/DOD-Information-Quality-Guidelines/"
                  target="_blank"
                  className={linkClass}
                >
                  {footer["dod-iq"]}
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h3 className={headerClass}>{footer["follow"]}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <IconButton
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={0}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") window.open(social.url, "_blank");
                  }}
                >
                  <social.icon className="text-[#9ca3af] hover:text-brand-yellow" />
                </IconButton>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-right text-sm text-gray-400 mr-auto">
          © 2024 AI2C, United States Army. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

const FooterContainer: React.FC = () => {
  const [content, setContent] = useState<{ [key: string]: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("/content/footer/footer.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setError("Failed to load content");
      }
    };

    fetchContent();
  }, []);

  if (error) {
    return <div>{error}</div>; // or a more user-friendly error message
  }

  if (!content) {
    return null; // or a loading spinner
  }

  return <Footer contents={content} />;
};

export default FooterContainer;
