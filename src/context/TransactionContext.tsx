import { createContext, useContext, useEffect, useReducer } from "react";
import type { Transaction, FilterState } from "../types/index";

interface State {
  transactions: Transaction[];
  filters: FilterState;
}

type Action =
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<FilterState> };

const defaultFilters: FilterState = {
  search: "",
  type: "all",
  category: "all",
  sortBy: "date",
  sortOrder: "desc",
};

const initialState: State = {
  transactions: JSON.parse(localStorage.getItem("transactions") || "[]"),
  filters: defaultFilters,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

const TransactionContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state.transactions));
  }, [state.transactions]);

  return (
    <TransactionContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
}