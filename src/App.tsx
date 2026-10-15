import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import { Menu } from "lucide-react";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
     
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

     
      <div className={`fixed lg:static z-30 h-full transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setSidebarOpen(false);
          }}
        />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
       
        <div className="lg:hidden flex items-center px-4 py-3 bg-black border-b border-green-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white mr-3"
          >
            <Menu size={22} />
          </button>
          <span className="text-white font-semibold">💰 FinanceApp</span>
        </div>

        <Navbar activePage={activePage} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {activePage === "dashboard" && <Dashboard />}
          {activePage === "transactions" && <Transactions />}
          {activePage === "budget" && <Budget />}
          {activePage === "insights" && <Insights />}
        </main>
      </div>
    </div>
  );
}

export default App;