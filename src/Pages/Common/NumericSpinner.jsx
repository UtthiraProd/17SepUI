import React, { useState } from 'react';
export function NumericSpinner() {
const NumericSpinner = ({ min = 0, max = 100, step = 1, initialValue = 0, onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    const intValue = parseInt(newValue, 10);
    if (!isNaN(intValue)) {
      const clampedValue = Math.min(Math.max(intValue, min), max);
      setValue(clampedValue);
      if (onChange) {
        onChange(clampedValue);
      }
    }
  };

  const increment = () => {
    handleChange(value + step);
  };

  const decrement = () => {
    handleChange(value - step);
  };

  return (
    <div>
      <button onClick={decrement}>-</button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => handleChange(e.target.value)}
      />
      <button onClick={increment}>+</button>
    </div>
  );
};
}

