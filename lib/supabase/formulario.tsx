import { supabaseServer } from "./server";

export async function getFormularioByID( id_formulario : number ) {
  const {data, error} = await supabaseServer
  .from('formularios')
  .select('*')
  .eq('id_formulario', id_formulario)
  .single();

  if (error) {
    throw error;
  }

  return data;
}