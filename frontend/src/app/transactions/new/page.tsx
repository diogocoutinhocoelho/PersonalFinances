import TransactionForm from './TransactionForm';

export default function NewTransactionPage() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nova Transação</h1>
      <TransactionForm />
    </div>
  );
}
