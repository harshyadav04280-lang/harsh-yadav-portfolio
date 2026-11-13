import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Harsh Yadav — Multidisciplinary Creative",
  description: "Video editing, AI video production, motion design, VFX and visual storytelling.",
  metadataBase: new URL("https://harshyadav.vercel.app"),
  openGraph: { title: "Harsh Yadav — Multidisciplinary Creative", description: "Ideas into images. Images into impact.", type: "website" }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}