import { Transaction } from "@/types/transaction";

export default function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-2">Transações</h2>
      <ul className="divide-y divide-gray-200">
        {transactions.map(tx => (
          <li key={tx.id} className="py-2 flex justify-between">
            <span>{tx.description}</span>
            <span className={tx.type === 'entrada' ? 'text-green-600' : 'text-red-600'}>
              {tx.type === 'saida' ? '-' : '+'} R$ {tx.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
