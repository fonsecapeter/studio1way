import React, { useState } from "react";

interface FilterDropDownProps {
  readonly name: string;
  readonly options: Record<string, string>; // { option_key: option_label }
  readonly selectedOptions: Set<string>;
  readonly onChange: Function;
}

export const FilterDropdown = ({
  name,
  options,
  selectedOptions,
  onChange,
}: FilterDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const nextSelectedOptions = new Set(selectedOptions);
    if (checked) {
      nextSelectedOptions.add(value);
    } else {
      nextSelectedOptions.delete(value);
    }
    onChange(nextSelectedOptions);
  };
  return (
    <div className="filter-dropdown">
      <button className="button-link" onClick={toggleDropdown}>
        {isOpen ? "↑ " : "↓ "}
        {name}
        {isOpen ? " ↑" : " ↓"}
      </button>
      {isOpen && (
        <div className="filter-dropdown-options">
          {Object.entries(options).map(([option, label]) => (
            <label key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.has(option)}
                onChange={handleCheckboxChange}
              />
              {label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
