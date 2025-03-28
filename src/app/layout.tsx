// import { DefaultSeo } from "next-seo";
// import SEO from "../../next-seo.config";

export default function Layout({ children }: any) {
  return (
    <html>
      {/* <DefaultSeo /> */}
      <body>{children}</body>
    </html>
  );
}
