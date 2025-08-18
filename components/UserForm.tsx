import { useState } from "react";

export default function UserForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const registrarEgresado = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      correo: formData.get('correo')?.toString().trim() || '',
      contraseña: formData.get('contraseña')?.toString().trim() || '',
    };

    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(data.correo)) {
      setError('Correo electrónico inválido');
      setLoading(false);
      return;
    }

    if (data.contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    const nombre            = localStorage.getItem('nombre');
    const apellido_paterno  = localStorage.getItem('apellido_paterno');
    const apellido_materno  = localStorage.getItem('apellido_materno');
    const fecha_egreso      = localStorage.getItem('fecha_egreso');

    const curp  = localStorage.getItem('curp');
    const sexo  = localStorage.getItem('sexo');
    const bio   = localStorage.getItem('bio');

    const correo      = data.correo;
    const contraseña  = data.contraseña;

    fetch('/api/egresados/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre : nombre,
        apellido_paterno : apellido_paterno,
        apellido_materno : apellido_materno,
        fecha_egreso : parseInt(fecha_egreso || '0'),
        curp : curp,
        sexo : sexo,
        bio : bio,
        correo : correo,
        contraseña : contraseña,
      })
    }).then(res => res.json()).then(data => {
      if (data.message) {
        console.log('Egresado registrado:', data);
        alert('Registro exitoso. ¡Bienvenido!');
        // localStorage.clear();
      } else {
        setError(data.error || 'Error al registrar el egresado. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error en el registro:', data);
      }
    }).catch(err => {
      setError('Error al registrar el egresado. Por favor, inténtalo de nuevo más tarde.');
      console.error('Error en la solicitud:', err);
      localStorage.clear();
    });
    setLoading(false);
  }

  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {registrarEgresado(e); e.preventDefault(); }}>
      <label className='text-2xl font-bold text-center my-4'>Registro</label>
      <label htmlFor="correo">Correo</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="email" name="correo" id="correo" placeholder="juan_perez@email.com" required/>
      <label htmlFor="contraseña">Contraseña</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="password" name="contraseña" id="contraseña" placeholder="********" required/>
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