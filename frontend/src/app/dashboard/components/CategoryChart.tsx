'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from "@/types/transaction";

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

export default function CategoryChart({ transactions }: { transactions: Transaction[] }) {
  const categoryTotals: { [key: string]: number } = {};

    transactions
      .filter(t => t.type === 'saida')
      .forEach(t => {
        const numericValue = parseFloat(String(t.value));
        if (!isNaN(numericValue)) {
          categoryTotals[t.category] = (categoryTotals[t.category] || 0) + numericValue;
        }
      });

  const data = Object.entries(categoryTotals).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2">Gastos por Categoria</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
