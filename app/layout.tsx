import type { Metadata } from "next";
import "@/styles/globals.css"
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"
import { getServerSession } from "next-auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and share AI Prompts",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient"/>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
