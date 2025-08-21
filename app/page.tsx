import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>Portal en desarrollo</div>
      <Link href="/login">Ir a la página de autenticación</Link>
      <br />
      <Link href="/registro">Ir a la página de registro</Link>
    </main>
  );
}
