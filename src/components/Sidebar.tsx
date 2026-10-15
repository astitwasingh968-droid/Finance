import { LayoutDashboard, ArrowLeftRight, PiggyBank, Lightbulb } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "budget", label: "Budget", icon: PiggyBank },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({ activePage, setActivePage }: Props) {
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 flex flex-col p-4 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-white"> FinanceApp</h1>
        <p className="text-xs text-gray-500 mt-1">Personal Finance Dashboard</p>
      </div>

      <nav className="flex flex-col gap-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActivePage(id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
              activePage === id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Icon size={18} className={activePage === id ? "text-white" : "text-gray-500"} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-2 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">Finance Dashboard v1.0</p>
      </div>
    </div>
  );
}