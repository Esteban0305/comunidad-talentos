import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from './server';

export async function registrarUsuarioSupabase(correo: string, contrasena: string) {
  const { data, error } = await supabaseServer.auth.signUp({
    email: correo,
    password: contrasena,
    phone: '312'
  });
  if (error) throw new Error(error.message);
  return data;
}