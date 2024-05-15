import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  register: UseFormRegisterReturn;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  options,
  error,
  register,
}) => {
  return (
    <div className="mb-5 w-full relative animate-slideUp">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-400">
        {label}
      </label>
      <div className="flex flex-wrap">
        {options.map((option) => (
          <label
            key={option.value}
            className="mr-4 mb-0 text-slate-700 dark:text-slate-400"
          >
            <input
              type="checkbox"
              {...register}
              value={option.value}
              className="mr-2"
            />
            {option.label}
          </label>
        ))}
      </div>

      <span
        className={`absolute top-full text-red-500 text-sm ${error ? "opacity-1" : "opacity-0"} transition-opacity duration-300`}
      >
        {error}
      </span>
    </div>
  );
};

export default CheckboxGroup;
