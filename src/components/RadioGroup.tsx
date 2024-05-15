import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface RadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  register: UseFormRegisterReturn;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
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
      <div>
        {options.map((option) => (
          <label
            key={option.value}
            className="mr-4 text-slate-700 dark:text-slate-400 block md:inline"
          >
            <input
              type="radio"
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

export default RadioGroup;
