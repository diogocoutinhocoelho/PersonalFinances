export interface Transaction {
  id: number;
  description: string;
  value: number;
  currency: string;
  date: string;
  category: string;
  type: 'entrada' | 'saida';
}
