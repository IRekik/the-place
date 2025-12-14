import type { Metadata } from "next";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "A general blog to post and interact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="relative overflow-hidden">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}