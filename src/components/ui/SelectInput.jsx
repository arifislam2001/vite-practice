import React from "react";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  disabled = false,
  className = "",
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[auto_1fr] items-center gap-2">
        {label && (
          <label
            htmlFor={name}
            className="whitespace-nowrap text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full rounded-lg border px-4 py-2
            bg-white text-gray-700
            focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            outline-none transition
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectInput;