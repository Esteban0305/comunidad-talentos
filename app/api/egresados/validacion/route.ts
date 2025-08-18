import { supabaseServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {nombre, apellido_paterno, apellido_materno, fecha_egreso} = await req.json();
    const nombreCompleto = `${apellido_paterno} ${apellido_materno} ${nombre}`.toUpperCase();

    const { data, error } = await supabaseServer.from('egresado_validacion').select('*').limit(10).ilikeAnyOf('nombre_completo', [nombreCompleto, nombreCompleto.replace(/\s+/g, '')]).eq('fecha_egreso', fecha_egreso);

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