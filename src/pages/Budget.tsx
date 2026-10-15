import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import type { Category } from "../types/index";
import { PlusCircle, Trash2 } from "lucide-react";

const categories: Category[] = [
  "Food", "Rent", "Salary", "Transport",
  "Entertainment", "Healthcare", "Shopping", "Other",
];

interface Budget {
  category: Category;
  limit: number;
}

export default function Budget() {
  const { state } = useTransactions();
  const { transactions } = state;

  const [budgets, setBudgets] = useState<Budget[]>(() => {
    return JSON.parse(localStorage.getItem("budgets") || "[]");
  });

  const [selectedCategory, setSelectedCategory] = useState<Category>("Food");
  const [limit, setLimit] = useState("");

  function saveBudget() {
    if (!limit || isNaN(Number(limit))) return;
    const existing = budgets.find((b) => b.category === selectedCategory);
    let updated: Budget[];
    if (existing) {
      updated = budgets.map((b) =>
        b.category === selectedCategory ? { ...b, limit: Number(limit) } : b
      );
    } else {
      updated = [...budgets, { category: selectedCategory, limit: Number(limit) }];
    }
    setBudgets(updated);
    localStorage.setItem("budgets", JSON.stringify(updated));
    setLimit("");
  }

  function deleteBudget(category: Category) {
    const updated = budgets.filter((b) => b.category !== category);
    setBudgets(updated);
    localStorage.setItem("budgets", JSON.stringify(updated));
  }

  function getSpent(category: Category) {
    return transactions
      .filter((t) => t.type === "expense" && t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Budget 🐷</h1>
        <p className="text-gray-400 mt-1">Set and track your spending limits.</p>
      </div>

      {/* Add Budget */}
      <div className="bg-black border border-green-900 rounded-2xl p-5">
        <h3 className="text-white font-semibold mb-4">Set Budget Limit</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
            className="bg-green-950 text-white text-sm rounded-xl px-4 py-2.5 border border-green-800 outline-none w-full sm:w-auto"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Budget limit (₹)"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="bg-green-950 text-white text-sm rounded-xl px-4 py-2.5 border border-green-800 outline-none flex-1"
          />
          <button
            onClick={saveBudget}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition w-full sm:w-auto"
          >
            <PlusCircle size={16} />
            Set Budget
          </button>
        </div>
      </div>

      {/* Budget List */}
      {budgets.length === 0 ? (
        <div className="bg-black border border-green-900 rounded-2xl p-8 text-center text-gray-500">
          No budgets set yet. Add one above!
        </div>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const spent = getSpent(budget.category);
            const percentage = Math.min((spent / budget.limit) * 100, 100);
            const isOver = spent > budget.limit;
            const remaining = budget.limit - spent;

            return (
              <div
                key={budget.category}
                className="bg-black border border-green-900 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{budget.category}</h4>
                    <p className="text-gray-400 text-xs mt-0.5">
                      ₹{spent.toLocaleString("en-IN")} spent of ₹{budget.limit.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${isOver ? "text-red-400" : "text-green-400"}`}>
                      {isOver
                        ? `₹${Math.abs(remaining).toLocaleString("en-IN")} over`
                        : `₹${remaining.toLocaleString("en-IN")} left`}
                    </span>
                    <button
                      onClick={() => deleteBudget(budget.category)}
                      className="text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="bg-green-950 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      isOver ? "bg-red-400" : percentage > 75 ? "bg-orange-400" : "bg-green-400"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                  <span>{percentage.toFixed(0)}% used</span>
                  <span>Limit: ₹{budget.limit.toLocaleString("en-IN")}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}