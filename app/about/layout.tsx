import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | ATHERNIX",
  description: "Conoce más sobre ATHERNIX VR Ecosystem",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
