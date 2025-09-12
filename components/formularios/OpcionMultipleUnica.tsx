export default function OpcionMultipleUnica({ contenido, opciones, callback, respuesta}: { contenido: string, opciones: {id_opcion : number, contenido : string}[], callback?: (opcionSeleccionada: number) => void, respuesta?: number | null }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{contenido}</label>
      <div className="flex flex-col gap-2">
        {opciones.map((opcion, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="radio" name="opcion-multiple-unica" value={opcion.id_opcion} className="form-radio" onChange={() => callback && callback(opcion.id_opcion)} checked={respuesta === opcion.id_opcion} />
            {opcion.contenido}
          </label>
        ))}
      </div>
    </div>
  );
}