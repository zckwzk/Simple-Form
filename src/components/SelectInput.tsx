import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectInputProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  multiple?: boolean;
  register: UseFormRegisterReturn;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  error,
  multiple,
  register,
}) => {
  return (
    <div className="mb-5 w-full relative animate-slideUp">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
        {label}
      </label>
      <select
        {...register}
        multiple={multiple}
        className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-300 border ${error ? "border-red-500" : "border-slate-300"} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span
        className={`absolute top-full text-red-500 text-sm ${error ? "opacity-1" : "opacity-0"} transition-opacity duration-300`}
      >
        {error}
      </span>
    </div>
  );
};

export default SelectInput;
