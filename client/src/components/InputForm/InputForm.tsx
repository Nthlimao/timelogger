import { ReactElement } from "react";
import InputFormStyles from "./InputForm.styles";
import Badge from "../Badge";

interface IInputForm {
  id: string;
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  error?: string;
  handleChange?: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const InputForm = ({
  id,
  name,
  label,
  value,
  placeholder,
  type = "text",
  error,
  handleChange,
  handleBlur,
}: IInputForm): ReactElement => {
  return (
    <InputFormStyles error={!!error}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!!error && <Badge appearance="error">{error}</Badge>}
    </InputFormStyles>
  );
};

export default InputForm;
