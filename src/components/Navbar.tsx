import AddTransaction from "./AddTransaction";

interface Props {
  activePage: string;
}

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard Overview",
  transactions: "Transactions",
  budget: "Budget",
  insights: "Insights",
};

export default function Navbar({ activePage }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
      <div>
        <h2 className="text-white font-semibold text-lg">{pageTitles[activePage]}</h2>
        <p className="text-gray-500 text-xs">{today}</p>
      </div>
      <div className="flex items-center gap-4">
        <AddTransaction />
       
       
      </div>
    </div>
  );
}