import Header from "../../../components/dashboard/egresados/Header";
import Footer from "@/components/dashboard/egresados/Footer";

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
      <body style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
        <Header />
        <main style={{ flex: 1, padding: '1rem' }} >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
