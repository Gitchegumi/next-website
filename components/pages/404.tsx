import Link from "next/link";
import Image from "next/image";
import { getContent } from "../utils/contentUtils";

interface NotFoundPageProps {
  contents: { [key: string]: any };
}

const NotFound: React.FC<NotFoundPageProps> = ({ contents }) => {
  const notFound = contents["404.json"];

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] text-center bg-brand-dark-bg">
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
      <h1 className="text-[3rem] mb-[1rem] text-white">{notFound["title"]}</h1>
      <p className="text-[1.5rem] mb-[2rem] text-white">
        {notFound["message"]}
      </p>
      <Link href="/">
        <p className="text-[1.2rem] text-[#0070f3] hover:text-blue-200 underline">
          {notFound["home"]}
        </p>
      </Link>
    </div>
  );
};

export default async function Page() {
  const directory = "404";
  const filePaths = ["404.json"];
  const content = await getContent(directory, filePaths);
  return <NotFound contents={content} />;
}
