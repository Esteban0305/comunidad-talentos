import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from './server';

export async function registrarUsuarioSupabase(correo: string, contrasena: string) {
  const { data, error } = await supabaseServer.auth.signUp({
    email: correo,
    password: contrasena,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000/login',
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function iniciarSesionUsuarioSupabase(correo: string, contrasena: string) {
  const { data, error } = await supabaseServer.auth.signInWithPassword({
    email: correo,
    password: contrasena
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function iniciarSesionToken(access_token: string, refresh_token: string) {
  const { data, error } = await supabaseServer.auth.setSession({
    access_token,
    refresh_token
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function registrarRol(id_usuario: string, role: string) {
  const { data, error } = await supabaseServer
    .from('usuarios')
    .insert({ id_usuario: id_usuario, role: role }).select();

  if (error) throw new Error(error.message);
  return data;
}

export async function obtenerSesion() {
  const { data: { user }, error } = await supabaseServer.auth.getUser();
  if (error) throw new Error('Error al obtener el usuario');

  if (user) {
    const { data, error } = await supabaseServer.from('usuarios').select('role').eq('id_usuario', user.id).single();
    if (error) {
      throw new Error('Error al obtener el rol del usuario');
    }
    return { user, data };
  } else {
    return false;
  }
}