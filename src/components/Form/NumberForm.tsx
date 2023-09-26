import clsx from "clsx";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { Button } from "../Elements";
import { FiMinus, FiPlus } from "react-icons/fi";

type InputFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  required?: boolean;
  defaultValue?: string;
  number: number;
  setNumber: (n: number) => void;
  min?: number;
  max?: number;
};

export const NumberForm = (props: InputFieldProps) => {
  const {
    label,
    className,
    required,
    description,
    max,
    min,
    number,
    setNumber,
  } = props;
  const increment = () => {
    if (number === max) {
      return;
    }
    setNumber(number + 1);
  };
  const decrement = () => {
    if (number === min) {
      return;
    }
    setNumber(number - 1);
  };

  return (
    <FieldWrapper
      label={label}
      className={className}
      description={description}
      required={required}
    >
      <div className={className}>
        <div className="flex items-center">
          <Button
            variant="primarySub"
            className="w-10 h-10"
            onClick={decrement}
          >
            <FiMinus />
          </Button>
          <div className="w-10 justify-center flex text-lg">{number}</div>
          <Button
            variant="primarySub"
            className="w-10 h-10"
            onClick={increment}
          >
            <FiPlus />
          </Button>
        </div>
      </div>
    </FieldWrapper>
  );
};
