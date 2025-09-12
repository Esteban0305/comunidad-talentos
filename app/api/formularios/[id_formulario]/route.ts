import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request, { params }: { params: Promise<{ id_formulario: string }> }) {
  try {
    const { id_formulario } = await params;
    const { id_egresado, respuestas } = await req.json();

    // Aquí iría la lógica para guardar las respuestas en la base de datos
    console.log("Guardar respuestas para el formulario:", id_formulario);
    console.log("Egresado ID:", id_egresado);
    console.log("Respuestas:", respuestas);

    const { data, error } = await supabaseServer
      .from("instancias")
      .insert([{ id_formulario, id_egresado }])
      .select()
      .single();

    if (error) {
      throw new Error(`Supabase insert error: ${error.message}`);
    }

    if (data) {
      const id_instancia = data.id_instancia;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const respuestasConInstancia = respuestas.map((respuesta: any) => ({
        ...respuesta,
        respuesta: JSON.stringify(respuesta.respuesta),
        id_instancia,
      }));
      
      console.log(respuestasConInstancia);

      const { error: respuestasError } = await supabaseServer
        .from("respuestas")
        .insert(respuestasConInstancia);

      if (respuestasError) {
        throw new Error(`Supabase insert respuestas error: ${respuestasError.message}`);
      }
    }

    return NextResponse.json({ message: "Respuestas guardadas exitosamente" }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}