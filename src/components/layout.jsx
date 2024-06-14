// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Judson } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./styles.css";

const judson = Judson({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-judson",
});
const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant_garamond",
});

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={judson.variable + " " + cormorant_garamond.variable}>
        {children}
      </body>
    </html>
  );
}
