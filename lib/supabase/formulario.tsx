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

export async function getAllElementosByFormularioID( id_formulario : number ) {
  const {data, error} = await supabaseServer
  .from('vw_elementos')
  .select('*')
  .eq('id_formulario', id_formulario);

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllFormularios() {
  const {data, error} = await supabaseServer.from('formularios').select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function getAllInstanciasByEgresadoID( id_egresado : number ) {
  const {data, error} = await supabaseServer
  .from('instancias')
  .select('*')
  .eq('id_egresado', id_egresado);

  if (error) {
    throw error;
  }

  return data;
}