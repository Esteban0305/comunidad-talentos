'use client';

import React, { useEffect, useState } from 'react';
import { iniciarSesionToken, iniciarSesionUsuarioSupabase, obtenerSesion } from '@/lib/supabase/usuario';
import { useRouter } from 'next/navigation';

export default  function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const access_token = searchParams.access_token as string | undefined;
  // const refresh_token = searchParams.refresh_token as string | undefined;

  useEffect(() => {
    async function fetchTokens() {
      const params = await searchParams;
      const access_token = params!.access_token as string | undefined;
      const refresh_token = params!.refresh_token as string | undefined;

      if (access_token && refresh_token) {
        setLoading(true);
        iniciarSesionToken(access_token, refresh_token).then((data) => {
          router.push('/dashboard');
        }).catch((err) => {
          console.error('Error al iniciar sesión:', err);
        });
      } else {
        obtenerSesion().then((data) => {
          if (data) {
            const role = data.data.role;
            switch (role) {
              case 'egresado':
                router.push('/dashboard/egresado');
                break;
              case 'empresa':
                router.push('/dashboard/empresa');
                break;
            }
          } else {
            console.log('No hay sesión activa');
          }
        });
      }
    }

    fetchTokens();
  }, [router]);

  const iniciarSesion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const correo = formData.get("correo") as string;
    const contrasena = formData.get("contraseña") as string;

    const {user, session} = await iniciarSesionUsuarioSupabase(correo, contrasena);

    obtenerSesion()
      .then((data) => {
        if (data) {
          const role = data.data.role;
          switch (role) {
            case 'egresado':
              router.push('/dashboard/egresado');
              break;
            case 'empresa':
              router.push('/dashboard/empresa');
              break;
          }
        } else {
          console.log('No hay sesión activa');
        }
      });
    setLoading(false);
  }

  return (
    <main className="min-h-dvh flex items-center">
      <div className="w-full m-auto max-w-md p-5">
        <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {iniciarSesion(e); e.preventDefault(); }}>
          <label className='text-2xl font-bold text-center my-4'>Inicio de sesión</label>
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
            {loading ? "" : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}