import { useState } from "react";
import { updateParentValues } from "../utils/calculations";

export const useTableOperations = (initialData) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  const handleAllocationPercentage = (id, percentage) => {
    try {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          const newValue = item.value * (1 + percentage / 100);
          return { ...item, value: newValue };
        }
        if (item.children) {
          const childUpdated = item.children.map((child) =>
            child.id === id
              ? { ...child, value: child.value * (1 + percentage / 100) }
              : child
          );
          return { ...item, children: childUpdated };
        }
        return item;
      });

      const finalData = updateParentValues(updatedData);
      setData(finalData);
    } catch (err) {
      setError("Failed to update percentage allocation");
      console.error(err);
    }
  };

  const handleAllocationValue = (id, inputValue) => {
    try {
      const updatedData = data.map((item) => {
        if (item.id === id) {
          const oldValue = item.value;
          const variance = ((inputValue - oldValue) / oldValue) * 100;
          return { ...item, value: inputValue, variance: variance.toFixed(2) };
        }

        if (item.children) {
          const childUpdated = item.children.map((child) =>
            child.id === id
              ? {
                  ...child,
                  value: inputValue,
                  variance: (
                    ((inputValue - child.value) / child.value) *
                    100
                  ).toFixed(2),
                }
              : child
          );
          return { ...item, children: childUpdated };
        }
        return item;
      });

      const finalData = updateParentValues(updatedData);
      setData(finalData);
    } catch (err) {
      setError("Failed to update direct allocation");
      console.error(err);
    }
  };

  return {
    data,
    error,
    handleAllocationPercentage,
    handleAllocationValue,
    setError,
  };
};
