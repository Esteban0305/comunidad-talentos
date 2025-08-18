import React, { useState } from 'react';

export default function RegisterForm(register: {register?: () => void}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registrarEgresado = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      curp: formData.get('nombre')?.toString().toLocaleUpperCase().trim() || '',
      sexo: formData.get('sexo')?.valueOf().toString() || '',
      bio: formData.get('bio')?.toString().trim() || '',
      privacidad: formData.get('privacidad') ? true : false,
    };

    const curpRegex = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
    if (!curpRegex.test(data.curp)) {
      setLoading(false);
      setError('CURP inválida');
      return;
    }

    if (['M', 'F', 'O', 'N'].indexOf(data.sexo) === -1) {
      setLoading(false);
      setError('Sexo inválido');
      return;
    }

    if (!data.privacidad) {
      setLoading(false);
      setError('Debes aceptar el Acuerdo de Privacidad');
      return;
    }

    localStorage.setItem('curp', data.curp);
    localStorage.setItem('sexo', data.sexo);
    localStorage.setItem('bio', data.bio);
    register.register!();
    setLoading(false);
  }

  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={registrarEgresado}>
      <label className='text-2xl font-bold text-center my-4'>Registro</label>
      <label htmlFor="nombre">CURP</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="text" name="nombre" id="nombre" placeholder="PERJ251202HCMXRSE8" required/>
      <label htmlFor="sexo">Sexo</label>
      <select name='sexo' className='p-2 border border-gray-300 rounded mb-3' required>
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