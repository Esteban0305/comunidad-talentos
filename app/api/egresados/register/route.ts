import { buscarEgresadoValidacion, registrarEgresado } from "@/lib/supabase/egresado";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {nombre, apellido_paterno, apellido_materno, fecha_egreso, curp, sexo, bio, correo, contrasena} = await req.json();

  const { data, error } = await buscarEgresadoValidacion({
    nombre: nombre,
    apellido_paterno: apellido_paterno,
    apellido_materno: apellido_materno,
    fecha_egreso: fecha_egreso,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data.length != 1) {
    return NextResponse.json({ error: 'Egresado no encontrado o datos incorrectos' }, { status: 404 });
  }

  const egresado = await registrarEgresado({
    nombre: nombre,
    apellido_paterno: apellido_paterno,
    apellido_materno: apellido_materno,
    fecha_egreso: parseInt(fecha_egreso),
    curp: curp,
    sexo: sexo,
    bio: bio,
    correo: correo,
    contrasena: contrasena,
  });

  console.log('Egresado registrado:', egresado);

  return Response.json({ message: 'Hello from Next.js!' });
}