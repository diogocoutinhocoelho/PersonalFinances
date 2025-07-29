import { Transaction } from "@/types/transaction";

export default function MonthlySummary({ transactions }: { transactions: Transaction[] }) {0
    const parseSafe = (val: string | number): number => {
      const num = typeof val === 'number' ? val : parseFloat(val);
      return isNaN(num) ? 0 : num;
    };

  const income = transactions
    .filter(t => t.type === "entrada")
    .reduce((sum, t) => sum + parseSafe(t.value), 0);

  const expense = transactions
    .filter(t => t.type === "saida")
    .reduce((sum, t) => sum + parseSafe(t.value), 0);

  const balance = income - expense;

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2">Resumo Mensal</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>Entradas: <strong className="text-green-600">R$ {income}</strong></div>
        <div>Saídas: <strong className="text-red-600">R$ {expense}</strong></div>
        <div>Saldo: <strong className="text-blue-600">R$ {balance}</strong></div>
      </div>
    </div>
  );
}
