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
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </head>
      <body>{children}</body>
    </html>
  );
}
