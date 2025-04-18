import type { Metadata } from "next";
import "@/app/globals.css";
import FontStyle from "@/components/js/fontStyle.mjs";
import HeaderContainer from "@/components/Header";
import FooterContainer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Artificial Intelligence Integration Center",
  description: "The website for AI2C",
  other: {
    "Content-Security-Policy": `
      default-src 'self';
      script-src 'self';
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data:;
      font-src 'self' data: https://fonts.googleapis.com https://fonts.gstatic.com;
      connect-src 'self' https:;
      frame-ancestors 'none';
      form-action 'self';
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },  
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-gi pt-36 md:pt-0">
        <FontStyle />
        <HeaderContainer />
        <main className="flex-grow mt-20 lg:mt-0 mb-16">{children}</main>
        <FooterContainer />
      </body>
    </html>
  );
};

export default RootLayout;
