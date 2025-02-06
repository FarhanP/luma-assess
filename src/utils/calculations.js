export const calculateVariance = (current, original) => {
  try {
    if (original === 0) return 0;
    const variance = ((current - original) / original) * 100;
    return Number(variance.toFixed(2));
  } catch (error) {
    console.error("Variance Calculation Error:", error);
    return 0;
  }
};

export const updateParentValues = (rows) => {
  try {
    return rows.map((parent) => {
      if (parent.children) {
        const originalValue = parent.value; // Store old value before update
        const newValue = parent.children.reduce(
          (sum, child) => sum + Number(child.value),
          0
        );
        const variance = calculateVariance(newValue, originalValue); // Calculate variance

        return { ...parent, value: newValue, variance };
      }
      return parent;
    });
  } catch (error) {
    console.error("Parent Value Update Error:", error);
    return rows;
  }
};
