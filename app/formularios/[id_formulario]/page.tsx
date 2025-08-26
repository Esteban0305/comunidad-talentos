export default async function Formulario({
  params,
} : {
  params: Promise<{id_formulario: string}>
}) {
  const {id_formulario} = await params;
  return (
    <div>
      <h1>Formulario ID: {id_formulario}</h1>
      {/* Add your form logic here */}
    </div>
  );
}