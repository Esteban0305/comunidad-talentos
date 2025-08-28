'use client';

import { getFormularioByID } from "@/lib/supabase/formulario";
import { useRouter } from "next/navigation";
import React from "react";

export default function Formulario({
  params,
}: {
  params: { id_formulario: string }
}) {
  const router = useRouter();
  const [formulario, setFormulario] = React.useState<{nombre: string, descripcion: string, id_formulario: number} | null>(null);
  const [id_formulario, setIdFormulario] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState(true);

  const nombreFormulario = "Encuesta de Egresados";
  const descripcion = "Por favor responde este formulario para ayudarnos a mejorar la experiencia de los egresados. Tus respuestas son confidenciales.";

  const fetchFormulario = async () => {
    const { id_formulario } = await params;
    setIdFormulario(parseInt(id_formulario));
    getFormularioByID(parseInt(id_formulario)).then((formulario) => {
      if (!formulario) {
        router.replace('/not-found');
      } else {
        setFormulario(formulario);
      }
      setLoading(false);
    })
    .catch( () => {
      router.replace('/not-found');
    });
  }

  fetchFormulario();

  const startFormulario = () => {
    console.log("Iniciando formulario...");
    console.log(formulario);
    // router.push(`/formularios/${id_formulario}/continuar`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded p-6">
      {loading && <p>Cargando formulario...</p>}
      {!loading && !formulario && <p>Formulario no encontrado</p>}
      {!loading &&
        <>
          <h1 className="text-2xl font-bold mb-4">{formulario!.nombre}</h1><p className="text-gray-600 mb-6">{formulario!.descripcion}</p><div className="flex gap-4">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={() => router.back()}
          >
            Regresar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={startFormulario}
          >
            Continuar
          </button>
        </div>
        <div className="mt-8 text-sm text-gray-400">
          <span>ID del formulario: {formulario!.id_formulario}</span>
        </div>
      </>
    }
  </div>
  );
}