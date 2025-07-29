'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/types/transaction";
import { getTransactions } from "@/lib/api";
import MonthlySummary from "./components/MonthlySummary";
import CategoryChart from "./components/CategoryChart";
import TransactionList from "./components/TransactionList";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      setTransactions(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-4 grid gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button
          onClick={() => router.push('/transactions/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Nova Transação
        </button>
      </div>

      <MonthlySummary transactions={transactions} />
      <CategoryChart transactions={transactions} />
      <TransactionList transactions={transactions} />
    </div>
  );
}
