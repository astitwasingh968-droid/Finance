import { useTransactions } from "../context/TransactionContext";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";
import FilterBar from "../components/FilterBar";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
function SummaryCard({
  title, amount, icon: Icon, color, bg,
}: {
  title: string; amount: number; icon: any; color: string; bg: string;
}) {
  return (
    <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 flex items-center gap-4 min-w-0">
      <div className={`${bg} p-3 rounded-xl shrink-0`}>
        <Icon className={color} size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-gray-400 text-sm truncate">{title}</p>
        <p className="text-white text-xl font-bold truncate">
          ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
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
        <h1 className="text-2xl font-bold text-white">Welcome</h1>
        <p className="text-gray-400 mt-1">Here's your financial overview.</p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard title="Total Balance" amount={totalBalance} icon={Wallet} color="text-blue-400" bg="bg-blue-500/10" />
        <SummaryCard title="Total Income" amount={totalIncome} icon={TrendingUp} color="text-green-400" bg="bg-green-500/10" />
        <SummaryCard title="Total Expenses" amount={totalExpenses} icon={TrendingDown} color="text-red-400" bg="bg-red-500/10" />
      </div>

      
      <Charts />

      
      <FilterBar />
     
<div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-white font-semibold">Recent Transactions</h3>
    <span className="text-gray-500 text-xs">Last 5</span>
  </div>
  {transactions.length === 0 ? (
    <div className="text-center text-gray-500 py-6">No transactions yet</div>
  ) : (
    <div className="space-y-3">
      {transactions.slice(0, 5).map((t) => (
        <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${t.type === "income" ? "bg-green-500/10" : "bg-red-500/10"}`}>
              {t.type === "income"
                ? <ArrowUpCircle className="text-green-400" size={16} />
                : <ArrowDownCircle className="text-red-400" size={16} />}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{t.title}</p>
              <p className="text-gray-500 text-xs">{t.category} • {new Date(t.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
            </div>
          </div>
          <span className={`font-bold text-sm ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
            {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
          </span>
        </div>
      ))}
    </div>
  )}
</div>
    </div>
  );
}