import React from "react";
import { TableProvider } from "./context/TableProvider";
import { HierarchicalTable } from "./components/HierarchicalTable";
import { GrandTotalRow } from "./components/GrandTotalRow";

const initialData = {
  rows: [
    {
      id: "electronics",
      label: "Electronics",
      value: 1400,
      originalValue: 1400,
      children: [
        {
          id: "phones",
          label: "Phones",
          value: 800,
          originalValue: 800,
        },
        {
          id: "laptops",
          label: "Laptops",
          value: 700,
          originalValue: 700,
        },
      ],
    },
    {
      id: "furniture",
      label: "Furniture",
      value: 1000,
      originalValue: 1000,
      children: [
        {
          id: "tables",
          label: "Tables",
          value: 300,
          originalValue: 300,
        },
        {
          id: "chairs",
          label: "Chairs",
          value: 700,
          originalValue: 700,
        },
      ],
    },
  ],
};

function App() {
  return (
    <TableProvider initialData={initialData.rows}>
      <h2 className="font-bold  text-center mt-8 text-2xl">
        Simple Hierarchical Table
      </h2>
      <HierarchicalTable />
    </TableProvider>
  );
}

export default App;
