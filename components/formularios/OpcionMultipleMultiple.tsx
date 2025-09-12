import React from "react";
import { useEffect } from "react";

export default function OpcionMultipleMultiple({contenido, opciones, callback, respuesta} : {contenido : string, opciones: {id_opcion: number, contenido: string}[], callback: (respuesta: number[]) => void, respuesta: number | string | boolean | null}) {
  const [respuestas, setRespuestas] = React.useState<number[]>(Array.isArray(respuesta) ? respuesta : []);

  useEffect(() => {
    callback(respuestas);
  }, [respuestas]);
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">{contenido}</h2>
      <p>Por favor, selecciona una o más opciones:</p>
      <div className="mt-2">
        {opciones.map((opcion) => (
          <div key={opcion.id_opcion} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`opcion-${opcion.id_opcion}`}
              className="mr-2"
              checked={respuestas.includes(opcion.id_opcion)}
              onChange={(e) => {
                if (e.target.checked) {
                  setRespuestas([...respuestas, opcion.id_opcion]);
                } else {
                  setRespuestas(respuestas.filter((id) => id !== opcion.id_opcion));
                }
              }}
            />
            <label htmlFor={`opcion-${opcion.id_opcion}`}>{opcion.contenido}</label>
          </div>
        ))}
      </div>
    </div>
  );
}