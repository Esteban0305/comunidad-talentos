import React from 'react';

export default function RegisterForm() {
  const registrarEgresado = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      curp: formData.get('nombre')?.toString().trim() || '',
      sexo: formData.get('apellido_paterno'),
      bio: formData.get('bio')?.toString().trim() || '',
      privacidad: formData.get('privacidad') ? true : false,
    };

    console.log('Datos del formulario:', data);
  }

  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {registrarEgresado(e); e.preventDefault(); }}>
      <label className='text-2xl font-bold text-center my-4'>Registro</label>
      <label htmlFor="nombre">CURP</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="text" name="nombre" id="nombre" placeholder="PERJ251202HCMXRSE8" required/>
      <label htmlFor="apellido_paterno">Sexo</label>
      <select className='p-2 border border-gray-300 rounded mb-3' required>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
        <option value="O">Otro</option>
        <option value="N">Prefiero no decirlo</option>
      </select>
      <label htmlFor="bio">Un poco de mi...</label>
      <textarea className='p-2 border border-gray-300 rounded mb-3' name="bio" id="bio" placeholder='Escribe algo sobre ti...' rows={4}></textarea>
      <div className="flex items-center gap-2 mb-3">
        <input className='border border-gray-300 rounded' type="checkbox" name="privacidad" id="privacidad" required />
        <label htmlFor="privacidad">Aceptar Acuerdo de Privacidad</label>
      </div>
      <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'>Siguiente</button>
    </form>
  );
}