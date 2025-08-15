export default function UserForm() {
  const registrarEgresado = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data = {
      correo: formData.get('correo')?.toString().trim() || '',
      contraseña: formData.get('contraseña')?.toString().trim() || '',
    };

    console.log('Datos del formulario:', data);
  }

  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg' onSubmit={(e) => {registrarEgresado(e); e.preventDefault(); }}>
      <label className='text-2xl font-bold text-center my-4'>Registro</label>
      <label htmlFor="correo">Correo</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="email" name="correo" id="correo" placeholder="juan_perez@email.com" required/>
      <label htmlFor="contraseña">Sexo</label>
      <input className='p-2 border border-gray-300 rounded mb-3' type="password" name="contraseña" id="contraseña" placeholder="********" required/>
      <button type="submit" className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'>Registrarme</button>
    </form>
  );
}