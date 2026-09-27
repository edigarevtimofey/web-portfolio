import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { TaskOption } from "./content";

type Selection = {
  task: TaskOption;
  setTask: (task: TaskOption) => void;
};

const SelectionContext = createContext<Selection | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [task, setTask] = useState<TaskOption>("Лендинг");
  const value = useMemo(() => ({ task, setTask }), [task]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const value = useContext(SelectionContext);
  if (!value) throw new Error("useSelection must be used within SelectionProvider");
  return value;
}
