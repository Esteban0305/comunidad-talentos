export interface Elemento {
  id_elemento: number;
  id_formulario: number;
  contenido: string;
  tipo: "Opción múltiple múltiple" | "Opción múltiple única" | "Diccionario" | "Boolean" | "Numérica" | "Abierta" | "Condicionante" | "Texto" | "Pausa" | "Fin";
  metadata: string[];
  flujo: {
    cases: [
      {
        value: boolean;
        id_elemento: number;
        id_siguiente: number;
      }
    ];
    default: number;
  };
  opciones: {id_opcion: number, contenido: string}[];
}

export default Elemento;