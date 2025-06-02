'use client';

import { Input } from "@windmill/react-ui";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputValueFiveProps {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  register: UseFormRegister<any>;
  required?: boolean;
  maxValue?: number;
  minValue?: number;
  defaultValue?: string | number;
  placeholder?: string;
}

const InputValueFive: React.FC<InputValueFiveProps> = ({
  name,
  label,
  type,
  disabled = false,
  register,
  required = false,
  maxValue,
  minValue,
  defaultValue = "",
  placeholder = "",
}) => {
  const validationOptions: RegisterOptions = {
    valueAsNumber: true,
    required: required ? `${label} is required!` : false,
    ...(maxValue !== undefined && {
      max: {
        value: maxValue,
        message: `Maximum value ${maxValue}!`,
      },
    }),
    ...(minValue !== undefined && {
      min: {
        value: minValue,
        message: `Minimum value ${minValue}!`,
      },
    }),
    pattern: {
      value: /^[0-9]*$/,
      message: `Invalid ${label}!`,
    },
  };

  return (
    <div className="flex flex-row">
      <Input
        {...register(name, validationOptions)}
        name={name}
        type={type}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mr-2 p-2"
      />
    </div>
  );
};

export default InputValueFive;