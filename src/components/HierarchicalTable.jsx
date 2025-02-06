import React from "react";
import { TableRow } from "./TableRow";
import { GrandTotalRow } from "./GrandTotalRow";
import { useTableContext } from "../context/TableProvider";

export const HierarchicalTable = () => {
  const { data, error } = useTableContext();

  return (
    <div className="container mx-auto p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <table className="w-full border">
        <thead>
          <tr className="bg-black-700">
            <th className="border p-3">Label</th>
            <th className="border p-3">Value</th>
            <th className="border p-3">Input</th>
            <th className="border p-3">Allocation %</th>
            <th className="border p-3">Allocation Val</th>
            <th className="border p-3">Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow item={item} />
              {item.children &&
                item.children.map((child) => (
                  <TableRow key={child.id} item={child} isChild />
                ))}
            </React.Fragment>
          ))}
          <GrandTotalRow />
        </tbody>
      </table>
    </div>
  );
};
