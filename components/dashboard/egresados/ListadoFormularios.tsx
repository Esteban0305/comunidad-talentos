import Link from "next/link";

export interface Formulario {
  id_formulario: number;
  titulo: string;
  descripcion: string;
}
export function ListadoFormularios({formularios}: {formularios: Formulario[]}) {
  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      {formularios.map((formulario) => (
      <div
        key={formulario.id_formulario}
        className="bg-white shadow rounded-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-lg transition"
      >
        <h3 className="text-xl font-bold mb-2 text-blue-700">{formulario.titulo}</h3>
        <p className="text-gray-700 mb-4">{formulario.descripcion}</p>
        <Link
          href={`/formularios/${formulario.id_formulario}`}
          className="mt-auto inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition w-fit"
        >
          Ir al formulario
        </Link>
      </div>
      ))}
    </div>
  )
}