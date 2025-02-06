import React from "react";
import { useTableContext } from "../context/TableProvider";

export const GrandTotalRow = () => {
  const { data } = useTableContext();

  const calculateGrandTotal = () => {
    return data.reduce((total, item) => total + item.value, 0);
  };

  return (
    <tr className="bg-[#004526] font-bold">
      <td className="border px-3 text-center py-3 ">Grand Total</td>
      <td className="border p-4">{calculateGrandTotal().toFixed(2)}</td>
      <td colSpan="4" className="border p-2"></td>
    </tr>
  );
};
