import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  disabled = false,
  error,
  className = "",
  onKeyDown,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full rounded-lg border
          px-4 py-2
          text-gray-900
          placeholder-gray-400
          outline-none
          transition-all
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-200"
              : "border-gray-300"
          }
          ${className}
        `}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;