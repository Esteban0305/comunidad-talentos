'use client';

import RegisterForm from '@/components/RegisterForm';
import UserForm from '@/components/UserForm';
import ValidateForm from '@/components/ValidateForm';
import React from 'react';

// export const metadata = {
//   title: 'Registro',
// };

export default function RegisterPage() {
  const [currentForm, setCurrentForm] = React.useState<'validate' | 'register' | 'user'>('validate');

  return (
    <main className="min-h-dvh flex items-center">
      <div className="w-full m-auto max-w-md p-5">
        {currentForm === 'validate' && <ValidateForm validate={() => setCurrentForm('register')}/>}
        {currentForm === 'register' && <RegisterForm register={() => setCurrentForm('user')}/>}
        {currentForm === 'user' && <UserForm />}
      </div>
    </main>
  );
}