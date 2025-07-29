'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const categories = ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Salário', 'Outros'];
const currencies = ['BRL', 'USD', 'EUR'];

export default function TransactionForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    type: 'saida',
    category: '',
    currency: 'BRL',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(`/api/transactions/`, {
        ...form,
        value: parseFloat(form.amount),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-4 shadow rounded-xl">
      <input
        name="description"
        type="text"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <input
        name="amount"
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2"
      />

      <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2">
        <option value="entrada">Receita</option>
        <option value="saida">Despesa</option>
      </select>

      <select name="category" value={form.category} onChange={handleChange} className="border rounded px-3 py-2" required>
        <option value="">Selecione uma categoria</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select name="currency" value={form.currency} onChange={handleChange} className="border rounded px-3 py-2">
        {currencies.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border rounded px-3 py-2"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Salvar Transação
      </button>
    </form>
  );
}
