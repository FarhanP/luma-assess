export const calculateVariance = (current, original) => {
  try {
    return original === 0
      ? 0
      : Number((((current - original) / original) * 100).toFixed(2));
  } catch (error) {
    console.error("Variance Calculation Error:", error);
    return 0;
  }
};

export const updateParentValues = (rows) => {
  try {
    return rows.map((parent) => {
      if (parent.children) {
        const newValue = parent.children.reduce(
          (sum, child) => sum + child.value,
          0
        );
        return { ...parent, value: newValue };
      }
      return parent;
    });
  } catch (error) {
    console.error("Parent Value Update Error:", error);
    return rows;
  }
};
