'use client';

import Abierta from "@/components/formularios/Abierta";
import BooleanElement from "@/components/formularios/Boolean";
import { Condicionante } from "@/components/formularios/Condicionante";
import { Diccionario } from "@/components/formularios/Diccionario";
import Fin from "@/components/formularios/Fin";
import Numerica from "@/components/formularios/Numerica";
import OpcionMultipleMultiple from "@/components/formularios/OpcionMultipleMultiple";
import OpcionMultipleUnica from "@/components/formularios/OpcionMultipleUnica";
import Pausa from "@/components/formularios/Pausa";
import Loading from "@/components/Loading";
import { obtenerEgresado } from "@/lib/supabase/egresado";
import { getAllElementosByFormularioID, getFormularioByID } from "@/lib/supabase/formulario";
import { obtenerSesion } from "@/lib/supabase/usuario";
import { Elemento } from "@/models/Elemento";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Formulario({ params }: { params: Promise<{ id_formulario: string }> }) {
  // params: { id_formulario: string }
  const router = useRouter();
  const [formulario, setFormulario] = React.useState<{titulo: string, descripcion: string, id_formulario: number} | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [elementos, setElementos] = React.useState<Map<number, Elemento>>(new Map());
  const [primerElemento, setPrimerElemento] = React.useState<number | null>(null);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [elementoActual, setElementoActual] = React.useState<Elemento | null>(null);
  const [nodoActual, setNodoActual] = React.useState<NodoElemento | null>(null);
  const [egresado, setEgresado] = React.useState<{id_egresado: number, nombre: string} | null>(null);

  type NodoElemento = {
    elemento: Elemento;
    respuesta: number | number[] | string | boolean | null;
    anterior: NodoElemento | null;
    siguiente: NodoElemento | null;
  };

  const agregarNodo = (elemento: Elemento, respuesta: number | number[] | string | boolean | null = null) => {
    if (!nodoActual) {
      const nuevoNodo: NodoElemento = {
        elemento,
        respuesta,
        anterior: null,
        siguiente: null,
      };
      setNodoActual(nuevoNodo);
      setElementoActual(elemento);
      return;
    }

    const nuevoNodo: NodoElemento = {
      elemento,
      respuesta: null,
      anterior: nodoActual,
      siguiente: null,
    };

    if (nodoActual.siguiente?.elemento.id_elemento == elemento.id_elemento) {
      nuevoNodo.respuesta = nodoActual.siguiente!.respuesta;
      nuevoNodo.siguiente = nodoActual.siguiente!.siguiente;
      if (nodoActual.siguiente!.siguiente) {
        nodoActual.siguiente!.siguiente.anterior = nuevoNodo;
      }
      // FIX: Que solo se traslade entre los nodos, no que genere nuevos
    } else {
      nodoActual.siguiente = nuevoNodo;
    }


    setNodoActual(nuevoNodo);
    setElementoActual(elemento);
  };

  const regresarElementoAnterior = () => {
    if (nodoActual && nodoActual.anterior) {
      nodoActual.anterior.siguiente = nodoActual;
      setNodoActual(nodoActual.anterior);
      setNextDisabled(false);
      console.log(nodoActual);

      if (nodoActual.elemento.tipo === "Condicionante") {
        regresarElementoAnterior();
      } else {
        setElementoActual(nodoActual.anterior.elemento);
      }
    }
  };

  useEffect(() => {
    const validarEgresado = async () => {
      obtenerSesion().then((data) => {
        if (data && data.user) {
          const user = data.user;
          console.log(user);
          obtenerEgresado(user.id).then(async (egresado) => {
            setEgresado({id_egresado: egresado.id_egresado, nombre: egresado.nombre + " " + egresado.apellido_p + " " + egresado.apellido_m});
            fetchFormulario();
          });
        } else {
          router.replace('/login');
        }
      })
      .catch( () => {
        router.replace('/login');
      });
    }

    const fetchFormulario = async () => {
      const { id_formulario } = await params;
      getFormularioByID(parseInt(id_formulario)).then(async (formularioF) => {
        if (!formularioF) {
          router.replace('/not-found');
        } else {
          console.log(formularioF);
          setFormulario(formularioF);
          fetchElementos(formularioF.id_formulario);
        }
        setLoading(false);
      })
      .catch( () => {
        router.replace('/not-found');
      });
    }
    validarEgresado();
  }, [params, router]);

  const fetchElementos = async (id_formulario : number) => {
    getAllElementosByFormularioID(id_formulario).then((elementosF) => {
      console.log(elementosF);
      setPrimerElemento(elementosF.length > 0 ? elementosF[0].id_elemento : null);
      elementosF.forEach((el: Elemento) => {
        setElementos(prev => new Map(prev).set(el.id_elemento, el));
      });
    });
  }


  const startFormulario = () => {
    if (elementoActual == null) {
      setElementoActual(primerElemento ? (elementos.get(primerElemento) ?? null) : null);
      agregarNodo(elementos.get(primerElemento!)!);
    }
  };

  const handleRespuesta = (respuesta: number | string | boolean | number[]) => {
    setNextDisabled(false);
    console.log("Respuesta recibida:", respuesta);
    if (nodoActual) {
      const nuevoNodo = {
        ...nodoActual,
        respuesta,
      };
      setNodoActual(nuevoNodo);

      if (nodoActual.elemento.tipo === "Condicionante") {
        handleNext();
      }
    }
  };

  const handleNext = () => {
    if (elementoActual?.tipo === "Fin" || elementoActual?.tipo === "Pausa") {
      saveRespuestas().then(() => {
        // router.push('/formulario-completado');
      });
      return;
    } else {
      setNextDisabled(true);
    }
    
    if (elementoActual && elementoActual.flujo) {
      let siguienteId: number | undefined;
      if (elementoActual.flujo.cases && Array.isArray(elementoActual.flujo.cases)) {
        const caseMatch = elementoActual.flujo.cases.find(
          (c: { value: boolean | number | string; id_elemento: number; id_siguiente: number }) => {
            // Busca el nodo cuya id_elemento coincida con el case.id_elemento
            let nodo = nodoActual;
            while (nodo) {
              if (nodo.elemento.id_elemento === c.id_elemento) {
                return nodo.respuesta === c.value;
              }
              nodo = nodo.anterior;
            }
            return false;
          }
        );
        console.log(caseMatch);
        siguienteId = caseMatch ? caseMatch.id_siguiente : elementoActual.flujo.default;
      } else {
        siguienteId = elementoActual.flujo.default;
      }

      if (siguienteId !== undefined) {
        setNextDisabled(true);
        if (elementos.get(siguienteId)?.tipo === "Fin" || elementos.get(siguienteId)?.tipo === "Pausa") {
          setNextDisabled(false);
        }
        agregarNodo(elementos.get(siguienteId) ?? elementoActual);
        if (nodoActual && nodoActual!.siguiente?.respuesta !== null) {
          setNextDisabled(false);
        }
      }
    } else {
      startFormulario();
    }
  };

  const saveRespuestas = async () => {
    let nodo = nodoActual;
    const respuestas = [];
    while (nodo && nodo.anterior) {
      const respuesta = {
        id_elemento: nodo.elemento.id_elemento,
        respuesta: nodo.respuesta
      }

      respuestas.push(respuesta);

      nodo = nodo.anterior;
    }
    if (nodo) {
      const respuesta = {
        id_elemento: nodo.elemento.id_elemento,
        respuesta: nodo.respuesta
      }

      respuestas.push(respuesta);
    }

    respuestas.reverse();

    fetch(`/api/formularios/${formulario?.id_formulario}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_egresado: egresado?.id_egresado,
        respuestas: respuestas,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      router.push('/dashboard/egresado');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow rounded p-6">
      {!loading && formulario && (
        <>
          <div className="mt-8 text-sm text-gray-400 w-100">
            <span className="w-100 text-right">ID del formulario: {formulario.id_formulario}</span>
          </div>
          {/* Título del formulario */}
          {elementoActual?.tipo === "Fin" || elementoActual?.tipo === "Pausa" ? null : <h1 className="text-2xl font-bold my-4">{formulario.titulo}</h1>}

          {/* Elementos del formulario */}
            <div className="mb-6">
            {/* Renderizar el elemento actual o la descripción si es nulo */}
            {
              elementoActual === null
              ? <p className="text-gray-600">{formulario?.descripcion}</p>
              : (() => {
                switch (elementoActual.tipo) {
                  case "Boolean":
                  return <BooleanElement contenido={elementoActual.contenido} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Boolean' ? nodoActual.respuesta as boolean : null}/>;
                  case "Opción múltiple única":
                  return <OpcionMultipleUnica contenido={elementoActual.contenido} opciones={elementoActual.opciones} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Opción múltiple única' ? nodoActual.respuesta as number : null}/>;
                  case "Opción múltiple múltiple":
                  return <OpcionMultipleMultiple contenido={elementoActual.contenido} opciones={elementoActual.opciones} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Opción múltiple múltiple' ? nodoActual.respuesta as number : null}/>;
                  case "Abierta":
                  return <Abierta contenido={elementoActual.contenido} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Abierta' ? nodoActual.respuesta as string : null}/>;
                  case "Diccionario":
                  return <Diccionario contenido={elementoActual.contenido} opciones={elementoActual.opciones} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Diccionario' ? nodoActual.respuesta as number : null}/>;
                  case "Numérica":
                  return <Numerica contenido={elementoActual.contenido} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Numérica' ? nodoActual.respuesta as number : null}/>;
                  case "Fin":
                  return <Fin contenido={elementoActual.contenido} />;
                  case "Pausa":
                  return <Pausa contenido={elementoActual.contenido} />;
                  case "Texto":
                  return <p className="text-gray-600">{elementoActual.contenido}</p>;
                  case "Condicionante":
                  return <Condicionante contenido={elementoActual.contenido} callback={handleRespuesta} respuesta={nodoActual?.elemento.tipo == 'Condicionante' ? nodoActual.respuesta as boolean | null : null} condicion={false} />;
                  default:
                  return <p>Tipo de elemento no soportado aún: {elementoActual?.tipo}</p>;
                }
                })()
            }
            </div>

          {/* Botones de navegación */}
          <div className="flex gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              onClick={regresarElementoAnterior}
            >
              Regresar
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={handleNext}
              disabled={nextDisabled}
            >
              {elementoActual?.tipo === "Fin" || elementoActual?.tipo === "Pausa" ? "Finalizar" : "Siguiente"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}