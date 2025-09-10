'use client';

import HeaderDashboard from "@/components/HeaderDashboard";
import Loading from "@/components/Loading";
import { ListadoFormularios, Formulario } from "@/components/dashboard/egresados/ListadoFormularios";
import { obtenerEgresado } from "@/lib/supabase/egresado";
import { getAllFormularios } from "@/lib/supabase/formulario";
import { obtenerSesion } from "@/lib/supabase/usuario";
import { use, useEffect, useState } from "react";

export default function EgresadoDashboard() {
  const [nombre, setNombre] = useState("prueba");
  const [formularios, setFormularios] = useState<Formulario[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFormularios = async () => {
    getAllFormularios().then((formularios) => {
      setFormularios(formularios);
      console.log(formularios);
    });
  }

  useEffect(() => {
    obtenerSesion().then((data) => {
      if (data && data.user) {
        const user = data.user;
        console.log(user);
        obtenerEgresado(user.id).then(async (egresado) => {
          setNombre(egresado.nombre + " " + egresado.apellido_p + " " + egresado.apellido_m);
          console.log(egresado);
          await fetchFormularios();
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
        <p className="mb-2">2016 - 2019</p>
        <label className="block font-bold mb-1">Correo:</label>
        <p className="mb-2">emunoz4@ucol.mx</p>
        <label className="block font-bold mb-1">Fecha de registro:</label>
        <p className="mb-2">15/03/2020</p>
      </div>

      <section className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Formularios disponibles</h2>
        {/* Aquí iría el listado de formularios */}
        <ListadoFormularios formularios={formularios} />
      </section>
      </>
      : null}
    </>
  );
}