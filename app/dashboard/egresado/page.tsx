'use client';

import Loading from "@/components/Loading";
import { ListadoFormularios, Formulario } from "@/components/dashboard/egresados/ListadoFormularios";
import { obtenerEgresado } from "@/lib/supabase/egresado";
import { getAllFormularios, getAllInstanciasByEgresadoID } from "@/lib/supabase/formulario";
import { obtenerSesion } from "@/lib/supabase/usuario";
import { Egresado } from "@/models/Egresado";
import { useEffect, useState } from "react";

export default function EgresadoDashboard() {
  const [nombre, setNombre] = useState("prueba");
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [formulariosContestados, setFormulariosContestados] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);
  const [egresado, setEgresado] = useState<Egresado | null>(null);

  const fetchFormularios = async (id_egresado: number) => {
    getAllFormularios().then((formularios) => {
      getAllInstanciasByEgresadoID(id_egresado).then((instancias) => {
        console.log('Instancias:', instancias);
        // Filtrar los formularios que no están en las instancias
        const formulariosContestados = formularios.filter(formulario => 
          instancias.some(instancia => instancia.id_formulario === formulario.id_formulario)
        );

        const formulariosNoContestados = formularios.filter(formulario => 
          !instancias.some(instancia => instancia.id_formulario === formulario.id_formulario)
        );
        setFormulariosContestados(formulariosContestados)
        setFormularios(formulariosNoContestados);
        console.log(formulariosNoContestados);
      });
    });
  }

  useEffect(() => {
    obtenerSesion().then((data) => {
      if (data && data.user) {
        const user = data.user;
        console.log(user);
        obtenerEgresado(user.id).then(async (egresado) => {
          setNombre(egresado.nombre + " " + egresado.apellido_p + " " + egresado.apellido_m);
          setEgresado({...egresado, correo: user.email!});
          console.log("Egresado", data);
          await fetchFormularios(egresado.id_egresado);
          setLoading(false);
        });
      }
    });
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      {!loading ? 
      <>

      <div className="bg-white shadow rounded max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Datos personales</h2>
        <label className="block font-bold mb-1">Nombre:</label>
        <p className="mb-2">{nombre}</p>
        <label className="block font-bold mb-1">Generación:</label>
        <p className="mb-2">{(egresado!.fecha_egreso - 3) + " - " + egresado?.fecha_egreso}</p>
        <label className="block font-bold mb-1">Correo:</label>
        <p className="mb-2">{egresado?.correo}</p>
        {/* <label className="block font-bold mb-1">Fecha de registro:</label>
        <p className="mb-2">{egresado?.created_at}</p> */}
      </div>

      <section className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Formularios disponibles</h2>
        {/* Aquí iría el listado de formularios */}
        <ListadoFormularios formularios={formularios} />
        <h2 className="text-xl font-semibold mb-4 mt-4">Formularios contestados</h2>
        {/* Aquí iría el listado de formularios */}
        <ListadoFormularios formularios={formulariosContestados} contestados={true} />
      </section>
      </>
      : null}
    </>
  );
}