import { useTransactions } from "../context/TransactionContext";
import { Search, ArrowUpDown } from "lucide-react";
import type { Category, TransactionType } from "../types/index";

const categories: (Category | "all")[] = [
  "all", "Food", "Rent", "Salary", "Transport",
  "Entertainment", "Healthcare", "Shopping", "Other",
];

export default function FilterBar() {
  const { state, dispatch } = useTransactions();
  const { filters } = state;

  function setFilter(payload: any) {
    dispatch({ type: "SET_FILTER", payload });
  }

  return (
<div className="bg-black border border-green-900 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2 flex-1 min-w-48">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
        />
      </div>

      {/* Type filter */}
      <select
        value={filters.type}
        onChange={(e) => setFilter({ type: e.target.value as TransactionType | "all" })}
        className="bg-gray-800 text-white text-sm rounded-xl px-3 py-2 border border-gray-700 outline-none"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category filter */}
      <select
        value={filters.category}
        onChange={(e) => setFilter({ category: e.target.value as Category | "all" })}
        className="bg-gray-800 text-white text-sm rounded-xl px-3 py-2 border border-gray-700 outline-none"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "All Categories" : c}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sortBy}
        onChange={(e) => setFilter({ sortBy: e.target.value as "date" | "amount" })}
        className="bg-gray-800 text-white text-sm rounded-xl px-3 py-2 border border-gray-700 outline-none"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      {/* Sort order */}
      <button
        onClick={() => setFilter({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}
        className="flex items-center gap-2 bg-gray-800 text-white text-sm rounded-xl px-3 py-2 border border-gray-700 hover:bg-gray-700 transition"
      >
        <ArrowUpDown size={14} />
        {filters.sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}