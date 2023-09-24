import clsx from "clsx";
import React, { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";

export const variants = {
  primary:
    "bg-primary border-primary text-white hover:text-primary hover:bg-white focus:ring-primary",
  primarySub:
    "bg-white border-gray-100 text-secondary hover:text-secondary hover:bg-gray-100 focus:ring-secondary",
  secondary:
    "bg-secondary border-secondary text-white hover:text-secondary hover:bg-white focus:ring-secondary",
  danger:
    "bg-danger border-danger text-white hover:text-danger hover:bg-white focus:ring-danger",
};

const sizes = {
  xs: "py-1 px-2 h-7 text-xs",
  sm: "py-2 px-4 h-9 text-sm",
  md: "py-2 px-4 h-9 text-md",
  lg: "py-3 px-8 h-10 text-lg",
};

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { startIcon?: never; endIcon: React.ReactElement }
  | { startIcon?: undefined; endIcon?: undefined };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      variant = "primary",
      size = "sm",
      isLoading = false,
      className = "",
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={clsx(
          "flex items-center justify-center rounded-lg border font-medium shadow-sm transition duration-200 ease-in focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
        type={type}
        data-textid="button"
      >
        {isLoading && (
          <FiLoader className="h-5 w-5 animate-spin text-current" />
        )}
        {!isLoading && (
          <span className="hidden text-xl md:block">{startIcon}</span>
        )}
        <span className="mx-2 whitespace-nowrap">{props.children}</span>
        {!isLoading && (
          <span className="hidden text-xl md:block">{endIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
