import RegisterForm from '@/components/RegisterForm';

export const metadata = {
  title: 'Registro',
};

export default function RegisterPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <RegisterForm />
    </main>
  );
}