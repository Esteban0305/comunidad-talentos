'use client';

import React, { useState } from 'react';

type PreEgresado = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_egreso: number;
}

function validarEgresado() {
  const nombre            = document.getElementById("nombre") as HTMLInputElement;
  const apellido_paterno  = document.getElementById("apellido_paterno") as HTMLInputElement;
  const apellido_materno  = document.getElementById("apellido_materno") as HTMLInputElement;
  const fecha_egreso      = document.getElementById("fecha_egreso") as HTMLSelectElement;

  fetch('/api/egresados/validacion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: nombre.value,
      apellido_paterno: apellido_paterno.value,
      apellido_materno: apellido_materno.value,
      fecha_egreso: parseInt(fecha_egreso.value),
    })
  }).then(res => res.json()).then(data => {
    if (data.validacion) {
      console.log('Egresado validado:', data.egresado);
    } else {
      console.log('Validación fallida:', data.message);
    }
  }).catch(err => {
    console.error('Error en la solicitud:', err);
  });

  console.log(nombre.value, apellido_paterno.value, apellido_materno.value, fecha_egreso.value);
}

export default function ValidateForm() {
  const currentYear = new Date().getFullYear();
  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {validarEgresado(); e.preventDefault();}}>
      <label className='text-2xl font-bold text-center my-4'>Registro</label>
      <label htmlFor="nombre">Nombres</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="text" name="nombre" id="nombre" placeholder="Juan" required/>
      <label htmlFor="apellido_paterno">Apellido paterno</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="text" name="apellido_paterno" id='apellido_paterno' placeholder="Gutiérrez" required />
      <label htmlFor="apellido_materno">Apellido materno</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="text" name='apellido_materno' id='apellido_materno' placeholder='Morales'/>
      <label htmlFor="fecha_egreso">Generación</label>
      <select name="fecha_egreso" id="fecha_egreso" className='p-2 border border-gray-300 rounded mb-3' required defaultValue={-1}>
        <option value={-1} disabled>Año de egreso</option>
        {
          Array.from({ length: currentYear - 2011 }, (_, i) => currentYear - i).map(year => (
            <option key={year} value={year}>{year - 3} - {year} | Generación {year - 2011}</option>
          ))
        }
      </select>
      <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'>Siguiente</button>
    </form>
  );
}