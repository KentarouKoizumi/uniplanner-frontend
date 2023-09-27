import clsx from "clsx";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export const inputFieldBgColorVariants = {
  white: "bg-white",
  gray: "bg-gray-100",
};

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "password" | "email" | "number";
  step?: number;
  disabled?: boolean;
  fontSize?: "sm" | "base";
  className?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
  bgColor?: keyof typeof inputFieldBgColorVariants;
  hasBorder?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    step,
    label,
    className,
    placeholder,
    disabled,
    defaultValue,
    required,
    fontSize = "sm",
    description,
    bgColor = "white",
    hasBorder = true,
    onChange,
    onBlur,
  } = props;
  return (
    <FieldWrapper
      label={label}
      className={className}
      description={description}
      required={required}
    >
      <div className="relative">
        <input
          type={type}
          step={step}
          disabled={disabled}
          className={clsx(
            `block w-full appearance-none rounded-md border-gray-100 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-gray-100 focus:shadow-sm focus:shadow-primary focus:outline-none focus:ring-0 disabled:bg-gray-300 sm:text-sm`,
            fontSize === "sm" ? "text-sm" : "text-base",
            inputFieldBgColorVariants[bgColor],
            hasBorder ? "border" : "border-0",
            className
          )}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </FieldWrapper>
  );
};
