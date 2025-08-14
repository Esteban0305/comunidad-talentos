import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Comunidad Talentos",
  description: "Portal de egresados de la Secundaria de Talentos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
