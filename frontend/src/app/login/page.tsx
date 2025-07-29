"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post('/auth/jwt/create/', { username, password });
    Cookies.set('access_token', data.access);
    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleLogin} className="p-6 max-w-md mx-auto mt-32 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-2 w-full border p-2"
        placeholder="Usuário"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 w-full border p-2"
        placeholder="Senha"
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">
        Entrar
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Não tem uma conta?{' '}
        <Link href="/register" className="text-blue-600 hover:underline">
          Registre-se
        </Link>
      </p>
    </form>
  );
}
