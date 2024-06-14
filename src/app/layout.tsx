import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Menu from "@/src/components/Menu";
import "react-resizable/css/styles.css";
import Providers from "../redux/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel Wiśniewski - Recruitment Task",
  description: "OpenLayers Map Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Header />
          <div className="flex">
            <Menu />
            {children}
          </div>
        </body>
      </Providers>
    </html>
  );
}
