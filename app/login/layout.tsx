import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | ATHERNIX",
  description: "Inicia sesión en ATHERNIX VR Ecosystem",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
