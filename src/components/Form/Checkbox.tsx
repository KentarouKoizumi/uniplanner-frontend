import clsx from "clsx";
import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelContent?: React.ReactNode;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  labelContent,
  className,
  disabled,
  ...props
}: CheckboxProps) => {
  return (
    <label className="flex items-center space-x-2">
      <input
        disabled={disabled}
        type="checkbox"
        className={clsx(
          "h-5 w-5 cursor-pointer rounded-md border-gray-100 leading-5 text-blue-600 shadow-sm focus:ring-primary",
          className
        )}
        {...props}
      />
      <span className="flex items-center space-x-2">{labelContent}</span>
    </label>
  );
};
