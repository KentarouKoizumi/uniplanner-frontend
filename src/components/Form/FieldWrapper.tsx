import React from "react";
type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  description?: string;
  disabled?: boolean;
  required?: boolean;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const {
    label,
    className = "",
    children,
    description,
    required = false,
  } = props;
  return(
  <div className={className}>
    <span className="block space-y-1 text-sm text-dark">
      {label && (
        <label className="rounded-md px-1 py-0.5 font-bold decoration-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="mt-0.5">{children}</div>
    </span>
    {description && (
      <>
        <div
          role="alert"
          aria-label={description}
          className="block cursor-default select-none break-keep text-sm"
        >
          {description}
        </div>
      </>
    )}
  </div>
  )
};