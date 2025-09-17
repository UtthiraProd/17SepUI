import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export function ImageCrop() {
  const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateYears = (startYear, endYear) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};

const [checkedItems, setCheckedItems] = useState({});
const startYear = 2020; // Define your start year
const endYear = 2025; // Define your end year
const years = generateYears(startYear, endYear);

const handleChange = (month, year) => {
  const key = `${month}-${year}`;
  setCheckedItems((prevCheckedItems) => ({
    ...prevCheckedItems,
    [key]: !prevCheckedItems[key],
  }));
};

  return (
    <div>
    <h3>Select Months and Years</h3>
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th></th> {/* Empty cell for the top-left corner */}
          {years.map((year, index) => (
            <th key={index}>{year}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {months.map((month, monthIndex) => (
          <tr key={monthIndex}>
            <td>{month}</td>
            {years.map((year, yearIndex) => (
              <td key={yearIndex}>
                <input
                  type="checkbox"
                  name={`${month}-${year}`}
                  checked={checkedItems[`${month}-${year}`] || false}
                  onChange={() => handleChange(month, year)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}