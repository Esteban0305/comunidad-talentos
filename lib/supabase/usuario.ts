import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from './server';

export async function registrarUsuarioSupabase(correo: string, contrasena: string) {
  const { data, error } = await supabaseServer.auth.signUp({
    email: correo,
    password: contrasena
  });
  if (error) throw new Error(error.message);

  // if (data.user) {
  //   await supabaseServer
  //     .from('usuarios')
  //     .insert({ id_usuario: data.user.id, telefono });
  // }

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