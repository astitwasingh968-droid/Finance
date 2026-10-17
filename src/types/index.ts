export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Rent"
  | "Salary"
  | "Transport"
  | "Entertainment"
  | "Healthcare"
  | "Shopping"
  | "Other";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: Category;
  type: TransactionType;
  date: string;
}

export interface FilterState {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}
