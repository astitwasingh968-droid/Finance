import { useTransactions } from "../context/TransactionContext";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function Transactions() {
  const { state } = useTransactions();
  const { transactions } = state;

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-gray-400 mt-1">Manage and track all your transactions.</p>
      </div>

      {/* Mini Summary */}
      {/* Mini Summary */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3 min-w-0">
    <div className="bg-blue-500/10 p-2.5 rounded-xl shrink-0">
      <Wallet className="text-blue-400" size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs">Balance</p>
      <p className="text-white font-bold text-sm truncate">
        ₹{totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  </div>
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3 min-w-0">
    <div className="bg-green-500/10 p-2.5 rounded-xl shrink-0">
      <TrendingUp className="text-green-400" size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs">Total Income</p>
      <p className="text-green-400 font-bold text-sm truncate">
        ₹{totalIncome.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  </div>
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-3 min-w-0">
    <div className="bg-red-500/10 p-2.5 rounded-xl shrink-0">
      <TrendingDown className="text-red-400" size={20} />
    </div>
    <div className="min-w-0">
      <p className="text-gray-400 text-xs">Total Expenses</p>
      <p className="text-red-400 font-bold text-sm truncate">
        ₹{totalExpenses.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
      </p>
    </div>
  </div>
</div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Transaction count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
  Showing{" "}
  <span className="text-white font-medium">
    {transactions.filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(state.filters.search.toLowerCase());
      const matchType = state.filters.type === "all" || t.type === state.filters.type;
      const matchCategory = state.filters.category === "all" || t.category === state.filters.category;
      return matchSearch && matchType && matchCategory;
    }).length}
  </span>{" "}
  of <span className="text-white font-medium">{transactions.length}</span> transactions
</p>
      </div>

      {/* Transactions Table */}
      <TransactionList />
    </div>
  );
}