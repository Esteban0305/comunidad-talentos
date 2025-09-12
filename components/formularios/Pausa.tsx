export default function Pausa({ contenido }: { contenido: string }) {
  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-2xl font-bold my-4">El formulario está en pausa</h2>
      <p className="text-lg">{contenido}</p>
    </div>
  );
}