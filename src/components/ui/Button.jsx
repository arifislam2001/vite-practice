import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  disabled = false,
  ...props
}) => {

  const baseStyle =
    " px-6 py-3 inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none ";

  // Variants
  const variants = {
    primary: "bg-brand text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;