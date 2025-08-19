import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import { renderToString } from 'react-dom/server';

type PreEgresado = {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_egreso: number;
}

export default function ValidateForm({validate}: {validate?: () => void}) {
  const currentYear = new Date().getFullYear();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validarEgresado = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get('nombre')?.toString().trim() || '',
      apellido_paterno: formData.get('apellido_paterno')?.toString().trim() || '',
      apellido_materno: formData.get('apellido_materno')?.toString().trim() || '',
      fecha_egreso: parseInt(formData.get('fecha_egreso')?.toString() || '-1'),
    }

    console.log(data.nombre)

    fetch('/api/egresados/validacion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(dataR => {
      if (dataR.validacion) {
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('apellido_paterno', data.apellido_paterno);
        localStorage.setItem('apellido_materno', data.apellido_materno);
        localStorage.setItem('fecha_egreso', data.fecha_egreso.toString());
        validate!();
      } else {
        setError(dataR.message || 'No se encontró un egresado con esos datos.');
        console.log('Validación fallida:', dataR.message);
      }
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setError('Error al validar el egresado. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error en la solicitud:', err);
    });
  }

  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {validarEgresado(e); e.preventDefault();}}>
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
      <label className='text-red-500'>{error}</label>
      <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors h-10 flex items-center justify-center gap-2'>
        {loading && (
          <svg className="w-5 h-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" ></path>
          </svg>
        )}
        {loading ? "" : "Siguiente"}
      </button>
    </form>
  );
}