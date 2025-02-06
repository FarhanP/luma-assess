import React, { createContext, useContext } from "react";
import { useTableOperations } from "../hooks/useTableOperations";

const TableContext = createContext();

export const TableProvider = ({ children, initialData }) => {
  const tableOperations = useTableOperations(initialData);
  return (
    <TableContext.Provider value={tableOperations}>
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
