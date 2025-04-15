import Image from "next/image";
import Link from "next/link";
import { getContent } from "../utils/contentUtils";
import React from "react";

interface ComingSoonPageProps {
  contents: { [key: string]: any };
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ contents }) => {
  const comingSoon = contents["coming-soon.json"];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-brand-dark-bg to-zinc-600 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Link
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="/"
            rel="noopener noreferrer"
          >
            {comingSoon["home"]}
          </Link>
        </div>
      </div>

      <div className="siteLogo">
        <Link href="/">
          <Image
            src="/assets/images/ai2c-logo.png"
            alt="AI2C Logo"
            className="ai2cLogo"
            width={84}
            height={84}
          />
        </Link>
      </div>

      <h1 className="text-4xl font-bold mt-8 mb-4">{comingSoon["title"]}</h1>
      <p className="text-xl mb-8">{comingSoon["message"]}</p>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {comingSoon["home"]}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {comingSoon["home-description"]}
          </p>
        </Link>

        <Link
          href="/who-we-are"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {comingSoon["about"]}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {comingSoon["about-description"]}
          </p>
        </Link>

        <Link
          href="/what-we-do"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg:neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {comingSoon["what-we-do"]}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {comingSoon["what-we-do-description"]}
          </p>
        </Link>

        <Link
          href="/contact"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg:neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {comingSoon["contact"]}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            {comingSoon["contact-description"]}
          </p>
        </Link>
      </div>
    </main>
  );
};

export default async function Page() {
  const directory = "coming-soon";
  const filePaths = ["coming-soon.json"];
  const content = await getContent(directory, filePaths);
  return <ComingSoonPage contents={content} />;
}
