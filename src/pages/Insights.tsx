import { useTransactions } from "../context/TransactionContext";
import { TrendingUp, TrendingDown, AlertCircle, Award } from "lucide-react";

export default function Insights() {
  const { state } = useTransactions();
  const { transactions } = state;

  if (transactions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Add transactions to see insights
      </div>
    );
  }

  // Highest spending category
  const categoryMap: Record<string, number> = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
  const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
  const highestCategory = sortedCategories[0];

  // Monthly comparison
  const monthlyMap: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expense: 0 };
    if (t.type === "income") monthlyMap[month].income += t.amount;
    else monthlyMap[month].expense += t.amount;
  });
  const months = Object.entries(monthlyMap);
  const currentMonth = months[months.length - 1];
  const previousMonth = months[months.length - 2];

  // Total income vs expense
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = totalIncome > 0
    ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Insights</h1>
        <p className="text-gray-400 mt-1">Smart analysis of your finances.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Highest Spending Category */}
        {highestCategory && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-orange-400" size={20} />
              <h3 className="text-white font-semibold">Highest Spending Category</h3>
            </div>
            <p className="text-4xl font-bold text-orange-400">{highestCategory[0]}</p>
            <p className="text-gray-400 mt-2">
              ₹{highestCategory[1].toLocaleString("en-IN", { minimumFractionDigits: 2 })} spent
            </p>
            <div className="mt-4 space-y-2">
              {sortedCategories.slice(0, 4).map(([cat, amt]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-orange-400 h-2 rounded-full"
                      style={{ width: `${(amt / highestCategory[1]) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-400 text-xs w-24 text-right">{cat}</span>
                  <span className="text-white text-xs w-20 text-right">
                    ₹{amt.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Savings Rate */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Award className="text-blue-400" size={20} />
            <h3 className="text-white font-semibold">Savings Rate</h3>
          </div>
          <p className="text-4xl font-bold text-blue-400">{savingsRate}%</p>
          <p className="text-gray-400 mt-2">of your income saved</p>
          <div className="mt-4 bg-gray-800 rounded-full h-3">
            <div
              className="bg-blue-400 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(Number(savingsRate), 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Monthly Comparison */}
        {currentMonth && previousMonth && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-green-400" size={20} />
              <h3 className="text-white font-semibold">Monthly Comparison</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[previousMonth, currentMonth].map(([month, data]) => (
                <div key={month} className="space-y-3">
                  <p className="text-gray-400 text-sm font-medium">{month}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-400" /> Income
                    </span>
                    <span className="text-green-400 font-bold">
                      ₹{data.income.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <TrendingDown size={14} className="text-red-400" /> Expenses
                    </span>
                    <span className="text-red-400 font-bold">
                      ₹{data.expense.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-800 pt-2">
                    <span className="text-gray-400 text-sm">Net</span>
                    <span className={`font-bold ${data.income - data.expense >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ₹{(data.income - data.expense).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}