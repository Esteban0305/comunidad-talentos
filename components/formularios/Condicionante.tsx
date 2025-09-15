import React from "react";

export function Condicionante({
  contenido,
  condicion,
  callback,
  respuesta
}: {
  contenido?: string;
  condicion: boolean;
  callback: (value: boolean) => void;
  respuesta?: boolean | null;
}) {
  React.useEffect(() => {
    callback(true);
  }, []);

  return (<p onClick={() => {callback(true);}}>Hola</p>);
  // return (
  //   <div className="flex flex-col gap-2">
  //     <label className="font-medium">{contenido}</label>
  //     <div className="flex items-center gap-4">
  //       <label className="flex items-center gap-2">
  //         <input
  //           type="radio"
  //           name={contenido}
  //           checked={condicion === true}
  //           onChange={() => {callback(true);}}
  //         />
  //         Sí
  //       </label>
  //       <label className="flex items-center gap-2">
  //         <input
  //           type="radio"
  //           name={contenido}
  //           checked={condicion === false}
  //           onChange={() => {callback(false);}}
  //         />
  //         No
  //       </label>
  //     </div>
  //   </div>
  // );
}