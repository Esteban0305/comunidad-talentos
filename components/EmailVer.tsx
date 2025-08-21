export default function EmailVerificationForm() {
  return (
    <form className='flex flex-col gap-2 w-full max-w-md border border-gray-300 shadow-2xl p-5 rounded-lg'>
      <label className='text-2xl font-bold text-center mt-4'>Verificación de correo electrónico</label>
      <label htmlFor="email" className="mb-2">Te enviamos un correo a tu bandeja de entrada. Haz clic en él para continuar</label>
    </form>
  );
}