import type { Metadata } from "next";

import "./globals.css";
import { MyProviders } from "./providers";
import { LayoutWrapper } from "./components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Memeo",
  description: "Find the perfect taste for your Memebuds!",
  icons: "memeo1.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MyProviders>
          <LayoutWrapper>{children}</LayoutWrapper>
        </MyProviders>
      </body>
    </html>
  );
}
