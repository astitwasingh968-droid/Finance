import { useTransactions } from "../context/TransactionContext";
import { Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function TransactionList() {
  const { state, dispatch } = useTransactions();
  const { transactions, filters } = state;

  const filtered = transactions
    .filter((t) => {
      const matchSearch = t.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === "all" || t.type === filters.type;
      const matchCategory = filters.category === "all" || t.category === filters.category;
      return matchSearch && matchType && matchCategory;
    })
    .sort((a, b) => {
      if (filters.sortBy === "date") {
        return filters.sortOrder === "desc"
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return filters.sortOrder === "desc"
          ? b.amount - a.amount
          : a.amount - b.amount;
      }
    });

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <h3 className="text-white font-semibold mb-4">Recent Transactions</h3>

      {filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No transactions found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-800">
                <th className="text-left pb-3 font-medium">Title</th>
                <th className="text-left pb-3 font-medium">Category</th>
                <th className="text-left pb-3 font-medium">Date</th>
                <th className="text-left pb-3 font-medium">Type</th>
                <th className="text-right pb-3 font-medium">Amount</th>
                <th className="text-right pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-gray-800/50 transition">
                  <td className="py-3 text-white font-medium">{t.title}</td>
                  <td className="py-3">
                    <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-xs">
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(t.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-3">
                    <span
                      className={`flex items-center gap-1 w-fit px-2 py-1 rounded-lg text-xs font-medium ${
                        t.type === "income"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {t.type === "income" ? (
                        <ArrowUpCircle size={12} />
                      ) : (
                        <ArrowDownCircle size={12} />
                      )}
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`py-3 text-right font-bold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}₹
                    {t.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() =>
                        dispatch({ type: "DELETE_TRANSACTION", payload: t.id })
                      }
                      className="text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}