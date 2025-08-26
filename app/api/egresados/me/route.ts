import { NextResponse } from "next/server";
import { buscarEgresadoValidacion } from "@/lib/supabase/egresado";
import { obtenerSesion } from "@/lib/supabase/usuario";

export async function GET() {
  try {
    const session = await obtenerSesion();
    if (!session) {
      return NextResponse.json({ error: 'No se encontró la sesión' }, { status: 401 });
    }

    const { user } = session;
    return NextResponse.json({ user }, { status: 200 });
    // const { data, error } = await buscarEgresadoValidacion({ user_id: user.id });

    // if (error) {
    //   return NextResponse.json({ error: error.message }, { status: 500 });
    // }

    // if (data.length == 1) {
    //   return NextResponse.json({ validacion: true, egresado: data[0] }, { status: 200 });
    // } else {
    //   return NextResponse.json({ validacion: false, message: 'Egresado no encontrado o datos incorrectos' }, { status: 404 });
    // }
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500 });
  }
}