import type { Metadata } from "next";
import "./globals.css";
import { WindowManagerProvider } from "@/contexts/WindowManager";

export const metadata: Metadata = {
  title: "Abhay Deep Singh | Portfolio",
  description: "Computer Science student at Georgia State University - Presidential Scholar, Amazon SDE Intern, Full Stack & AI/ML Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WindowManagerProvider>
          {children}
        </WindowManagerProvider>
      </body>
    </html>
  );
}
