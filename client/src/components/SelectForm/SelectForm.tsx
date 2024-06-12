import React, { ReactElement } from "react";
import Badge from "../Badge";
import { SelectOptions } from "@/shared/types/Form";
import SelectFormStyles from "./SelectForm.styles";

interface ISelectForm {
  id: string;
  name: string;
  label?: string;
  value: string;
  placeholder?: string;
  options: SelectOptions[];
  error?: string;
  handleChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const SelectForm = ({
  id,
  name,
  label,
  value,
  placeholder,
  options,
  error,
  handleChange,
}: ISelectForm): ReactElement => {
  return (
    <SelectFormStyles error={!!error}>
      {label && <label htmlFor={id}>{label}</label>}
      <select value={value} name={name} id={id} onChange={handleChange}>
        <option value={undefined}>{placeholder}</option>
        {options.map((opt: SelectOptions) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {!!error && <Badge appearance="error">{error}</Badge>}
    </SelectFormStyles>
  );
};

export default SelectForm;
