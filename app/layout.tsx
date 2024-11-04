import type { Metadata } from "next";
import "@/styles/globals.css"
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"/>
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
