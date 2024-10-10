import { createContext, ReactNode, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

interface TodoItem {
  name: string;
  completed: boolean;
  id: string;
}

export interface TodoContextType {
  items: TodoItem[];
  filteredItems: TodoItem[];
  addItem: (itemName: string) => void;
  removeItem: (itemId: string) => void;
  editItem: (itemId: string) => void;
  searchItems: (query: string) => void;
  filterItems: (filter: "all" | "completed" | "incomplete") => void;
  currentFilter: "all" | "completed" | "incomplete";
}

export const todoContext = createContext<TodoContextType | null>(null);

const setLocalStorage = (items: TodoItem[]) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const defaultList = JSON.parse(localStorage.getItem("list") || "[]");

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<TodoItem[]>(defaultList);
  const [filteredItems, setFilteredItems] = useState<TodoItem[]>(defaultList);
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "completed" | "incomplete"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const addItem = (itemName: string): void => {
    const newItem: TodoItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    applyFilters(newItems, searchQuery, currentFilter);
    toast.success("Item Added");
  };

  const removeItem = (itemId: string): void => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);
    applyFilters(newItems, searchQuery, currentFilter);
    toast.success("Item Removed");
  };

  const editItem = (itemId: string): void => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
    applyFilters(newItems, searchQuery, currentFilter);
  };

  const applyFilters = (
    items: TodoItem[],
    query: string,
    filter: "all" | "completed" | "incomplete"
  ) => {
    let result = items;
    if (query) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filter === "completed") {
      result = result.filter((item) => item.completed);
    } else if (filter === "incomplete") {
      result = result.filter((item) => !item.completed);
    }

    setFilteredItems(result);
  };

  const debounceRef = useRef<NodeJS.Timeout>();

  const searchItems = (query: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(query);
      applyFilters(items, query, currentFilter);
    }, 300);
  };

  const filterItems = (filter: "all" | "completed" | "incomplete") => {
    setCurrentFilter(filter);
    applyFilters(items, searchQuery, filter);
  };

  return (
    <todoContext.Provider
      value={{
        items,
        filteredItems,
        addItem,
        removeItem,
        editItem,
        searchItems,
        filterItems,
        currentFilter,
      }}
    >
      {children}
    </todoContext.Provider>
  );
};
