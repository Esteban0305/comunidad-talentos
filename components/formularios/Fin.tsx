export default function Fin({contenido}: {contenido?: string}) {
  return (
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-2xl font-bold my-4">¡Has completado el formulario!</h2>
      <p className="text-lg">{contenido ?? "Gracias por tu participación."}</p>
      <p className="pt-4">Haz clic en Finalizar para guardar el formulario</p>
    </div>
  );
}