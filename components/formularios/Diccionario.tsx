import { useEffect, useState } from "react";

type Option = {id_opcion: number, contenido: string};

export function Diccionario({
  contenido,
  opciones = [],
  callback,
  respuesta
}: {
  contenido?: string;
  opciones?: Option[];
  callback: (value: number | string | boolean) => void;
  respuesta?: number | null;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);

  const filteredOptions =
    query.length > 0
      ? opciones
          .filter((opt) =>
            opt.contenido.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 7)
      : [];

  useEffect(() => {
    if (respuesta) {
      const initialSelected = opciones.find(opt => opt.id_opcion === respuesta) || null;
      setSelected(initialSelected);
      if (initialSelected) {
        setQuery(initialSelected.contenido);
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{contenido}</label>
      <input
        type="text"
        className="border border-gray-300 rounded p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar..."
      />
      {query.length > 0 && (
        <ul className="border rounded bg-white max-h-40 overflow-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt.id_opcion}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                selected?.id_opcion === opt.id_opcion ? "bg-gray-200" : ""
              }`}
              onClick={() => {setSelected(opt); callback(opt.id_opcion); setQuery(opt.contenido);}}
            >
              {opt.contenido}
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <div className="text-sm text-gray-600">
          Seleccionado: <span className="font-semibold">{selected.contenido}</span>
        </div>
      )}
    </div>
  );
}