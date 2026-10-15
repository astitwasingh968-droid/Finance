import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import type { Category, TransactionType } from "../types/index";
import { PlusCircle, X } from "lucide-react";

const categories: Category[] = [
  "Food", "Rent", "Salary", "Transport",
  "Entertainment", "Healthcare", "Shopping", "Other",
];

export default function AddTransaction() {
  const { dispatch } = useTransactions();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food" as Category,
    type: "expense" as TransactionType,
    date: new Date().toISOString().split("T")[0],
  });

  function handleSubmit() {
    if (!form.title || !form.amount) return;
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: crypto.randomUUID(),
        title: form.title,
        amount: parseFloat(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
      },
    });
    setForm({
      title: "",
      amount: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
    setOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        <PlusCircle size={18} />
        Add Transaction
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white text-lg font-bold">Add Transaction</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Grocery shopping"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Type</label>
                <div className="flex gap-2">
                  {(["income", "expense"] as TransactionType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition ${
                        form.type === t
                          ? t === "income"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-gray-800 text-white rounded-xl px-4 py-2.5 text-sm border border-gray-700 focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition mt-2"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}