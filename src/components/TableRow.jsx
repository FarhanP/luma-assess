import React, { useState } from "react";
import { useTableContext } from "../context/TableProvider";
import { calculateVariance } from "../utils/calculations";

export const TableRow = ({ item, isChild = false }) => {
  const [inputValue, setInputValue] = useState("");
  const { handleAllocationPercentage, handleAllocationValue, error, setError } =
    useTableContext();

  const handlePercentageAllocation = () => {
    const percentage = parseFloat(inputValue);
    if (isNaN(percentage)) {
      setError("Invalid percentage input");
      return;
    }
    handleAllocationPercentage(item.id, percentage);
  };

  const handleValueAllocation = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError("Invalid value input");
      return;
    }
    handleAllocationValue(item.id, value);
  };

  return (
    <tr className={`${isChild ? "bg-gray-50" : "bg-white"} text-black`}>
      <td className={`border p-2 text-center ${isChild ? "pl-8" : ""}`}>
        {isChild && ""}
        {item.label}
      </td>
      <td className="border p-2">{item.value.toFixed(2)}</td>
      <td className="border p-2">
        <input
          type="number"
          className="w-full p-1 border bg-white"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </td>
      <td className="border p-2">
        <button
          onClick={handlePercentageAllocation}
          className="bg-blue-500 text-white p-1 w-full  rounded"
        >
          % Alloc
        </button>
      </td>
      <td className="border p-2">
        <button
          onClick={handleValueAllocation}
          className="bg-green-500 text-white p-1 w-full rounded"
        >
          Val Alloc
        </button>
      </td>
      <td className="border p-2">
        {calculateVariance(item.value, item.originalValue)}%
      </td>
    </tr>
  );
};
