import { NextResponse } from "next/server";
import { buscarEgresadoValidacion } from "@/lib/supabase/egresado";

export async function POST(req: Request) {
  try {
    const {nombre, apellido_paterno, apellido_materno, fecha_egreso} = await req.json();

    const { data, error } = await buscarEgresadoValidacion({
      nombre: nombre,
      apellido_paterno: apellido_paterno,
      apellido_materno: apellido_materno,
      fecha_egreso: fecha_egreso,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data.length == 1) {
      return NextResponse.json({ validacion: true, egresado: data[0] }, { status: 200 });
    } else {
      return NextResponse.json({ validacion: false, message: 'Egresado no encontrado o datos incorrectos' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}