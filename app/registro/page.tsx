import ValidateForm from '@/components/ValidateForm';

export const metadata = {
  title: 'Registro',
};

export default function RegisterPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center p-6">
      <ValidateForm />
    </main>
  );
}