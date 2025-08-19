import { supabaseServer } from "@/lib/supabase/server";
import bcrypt from "bcryptjs";

export async function registrarUsuario({
  correo,
  contrasena,
}: {
  correo: string;
  contrasena: string;
}) {
  if (!correo || !contrasena) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (contrasena.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  const hashedPassword = await bcrypt.hash(contrasena, 10);

  const { data, error } = await supabaseServer
    .from('usuarios')
    .insert({
      correo: correo,
      hash: hashedPassword,
    }).select();
  
  if (error) {
    throw new Error(error.message);
  }

  return data;
}