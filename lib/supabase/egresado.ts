import { supabaseServer } from "@/lib/supabase/server";
import { registrarRol, registrarUsuarioSupabase } from "./usuario";

export async function buscarEgresadoValidacion({
  nombre,
  apellido_paterno,
  apellido_materno,
  fecha_egreso,
}: {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_egreso: string;
}) {
  const nombreCompleto = `${apellido_paterno} ${apellido_materno} ${nombre}`.toUpperCase();
  return await supabaseServer
    .from('egresado_validacion')
    .select('*')
    .limit(10)
    .ilikeAnyOf('nombre_completo', [nombreCompleto, nombreCompleto.replace(/\s+/g, '')])
    .eq('fecha_egreso', fecha_egreso);
}

export async function registrarEgresado({
  nombre,
  apellido_paterno,
  apellido_materno,
  fecha_egreso,
  curp,
  sexo,
  bio,
  correo,
  contrasena,
}: {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_egreso: number;
  curp: string;
  sexo: string;
  bio: string | null;
  correo: string;
  contrasena: string;
}) {
  if (!nombre || !apellido_paterno || !apellido_materno || !fecha_egreso || !curp || !sexo || !correo || !contrasena) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (contrasena.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres');
  }

  const usuario = await registrarUsuarioSupabase(correo, contrasena);
  
  if (!usuario) {
    throw new Error('Error al registrar el usuario');
  }

  const egresado = {
    id_usuario: usuario.user!.id,
    nombre: nombre.toUpperCase(),
    apellido_p: apellido_paterno.toUpperCase(),
    apellido_m: apellido_materno.toUpperCase(),
    fecha_egreso,
    curp: curp.toUpperCase(),
    sexo,
    bio: bio || null,
  }

  const role = await registrarRol(usuario.user!.id, 'egresado');

  if (!role) {
    throw new Error('Error al registrar el rol');
  }

  const { data, error } = await supabaseServer
    .from('egresados')
    .insert(egresado).select();

  if (error) {
    throw error;
  }

  return data;
}

export async function obtenerEgresado(id_usuario: string) {
  const { data, error } = await supabaseServer
    .from('egresados')
    .select('*')
    .eq('id_usuario', id_usuario)
    .single();

  if (error) {
    throw error;
  }

  return data;
}