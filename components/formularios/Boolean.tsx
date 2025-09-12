export default function BooleanElement({ contenido, callback, respuesta = null}: { contenido: string, callback: (value : number | string | boolean) => void, respuesta? : boolean | null}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{contenido}</label>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="boolean" value="true" className="form-radio" onChange={(e) => callback(true)} checked={respuesta === true}/>
          Sí
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="boolean" value="false" className="form-radio" onChange={(e) => callback(false)} checked={respuesta === false}/>
          No
        </label>
      </div>
    </div>
  );
}