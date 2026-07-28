import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | ATHERNIX",
  description: "Regístrate en ATHERNIX VR Ecosystem",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
