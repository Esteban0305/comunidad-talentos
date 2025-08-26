'use client';

import HeaderDashboard from "@/components/HeaderDashboard";
import { obtenerEgresado } from "@/lib/supabase/egresado";
import { obtenerSesion } from "@/lib/supabase/usuario";
import { useEffect, useState } from "react";

export default function EgresadoDashboard() {
  const [nombre, setNombre] = useState("prueba");

  useEffect(() => {
    obtenerSesion().then((data) => {
      if (data && data.user) {
        const user = data.user;
        console.log(user);
        obtenerEgresado(user.id).then((egresado) => {
          setNombre(egresado.nombre + " " + egresado.apellido_p + " " + egresado.apellido_m);
          console.log(egresado);
        });
      }
    });
  }, []);

  return (
    <main>
      {/* <HeaderDashboard /> */}
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-100 p-4 rounded mb-6">
        <span className="font-bold text-lg">Egresados</span>
        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="material-icons">notifications</span>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">3</span>
          </button>
          <span className="font-medium">Esteban Muñoz</span>
        </div>
      </nav>
      {/* Datos personales */}
      <div className="bg-white shadow rounded p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">Datos personales</h2>
        <label className="block font-bold mb-1">Nombre:</label>
        <p className="mb-2">Esteban Antonio Muñoz de la Cruz</p>
        <label className="block font-bold mb-1">Generación:</label>
        <p className="mb-2">2016 - 2019</p>
        <label className="block font-bold mb-1">Correo:</label>
        <p className="mb-2">emunoz4@ucol.mx</p>
        <label className="block font-bold mb-1">Fecha de registro:</label>
        <p className="mb-2">15/03/2020</p>
      </div>
    </main>
  );
}