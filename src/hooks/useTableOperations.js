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
        if (item.id === id) return { ...item, value: inputValue };

        if (item.children) {
          const childUpdated = item.children.map((child) =>
            child.id === id ? { ...child, value: inputValue } : child
          );

          const totalChildValue = childUpdated.reduce(
            (sum, child) => sum + child.value,
            0
          );
          const updatedChildrenWithProportion = childUpdated.map((child) => ({
            ...child,
            value: (child.value / totalChildValue) * inputValue,
          }));

          return { ...item, children: updatedChildrenWithProportion };
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
