export default function Numerica({contenido, callback, respuesta}: {contenido?: string, callback: (respuesta: number) => void, respuesta: number | null}) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">{contenido}</h2>
      <p>Por favor, ingresa un valor numérico:</p>
      <input
        type="number"
        className="mt-2 p-2 border border-gray-300 rounded w-full"
        placeholder="Ingresa un número"
        value={respuesta !== null ? respuesta : ''}
        onChange={(e) => callback(Number(e.target.value))}
      />
    </div>
  );
}