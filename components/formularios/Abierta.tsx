export default function Abierta({ contenido, callback, respuesta}: { contenido: string, callback: (value : number | string | boolean) => void, respuesta?: string | null }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{contenido}</label>
      <textarea className="border border-gray-300 rounded p-2" rows={4} onChange={(e) => callback(e.target.value)} value={respuesta ?? ''}></textarea>
    </div>
  );
}