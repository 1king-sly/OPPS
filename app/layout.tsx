"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Header from "./(ui)/User/Component/Header";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />

          <PrimeReactProvider>
            <div className="w-screen h-screen flex flex-col overflow-hidden gap-1">
              <div
                className={clsx(
                  `w-full bg-gray-200 shadow-md min-h-[10vh]`,
                  pathname === "/" && "hidden"
                )}>
                <Header />
              </div>
              <div
                className={clsx(
                  `w-full h-full flex flex-1 flex-row`,
                  pathname !== "/" && "max-h-[90vh]"
                )}>
                <div className="h-full overflow-y-auto w-full bg-gray-200 overflow-x-clip">
                  {children}
                </div>
              </div>
            </div>
          </PrimeReactProvider>
        </AuthContext>
      </body>
    </html>
  );
}
