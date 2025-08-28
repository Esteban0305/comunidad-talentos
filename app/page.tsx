import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Comunidad Talentos</h1>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Inicio de Sesión
          </Link>
          <Link
            href="/registro"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Registro
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Bienvenido al Portal de Egresados
          </h2>
          <p className="text-gray-700 mb-6">
            Este portal está diseñado para conectar a los egresados de la
            Secundaria de Talentos, facilitar el acceso a recursos, encuestas y
            oportunidades, y mantenerte informado sobre eventos y novedades.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 text-center p-4">
        &copy; {new Date().getFullYear()} Comunidad Talentos. Todos los derechos
        reservados.
      </footer>
    </div>
  );
}
