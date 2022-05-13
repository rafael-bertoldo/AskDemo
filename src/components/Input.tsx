import { FieldError, UseFormRegister } from "react-hook-form";
import { SignInData } from "../types";

interface InputProps {
  name: string;
  error?: FieldError | null;
  label?: string;
  register: UseFormRegister<SignInData>;
}

export const Input = ({ name, error = null, label, ...rest }: InputProps) => {
  return (
    <div className="  h-auto flex flex-col items-center w-96 p-8">
      <div className="flex items-center mb-4">
        <label className="mr-4 ">{label}: </label>
        <input type="text" className="w-full bg-lightGray p-1 rounded" />
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
