import { ReactNode } from "react";
import { FormItem, FormProps } from "@/shared/types/Form";
import FormStyles from "./Form.styles";
import InputForm from "../InputForm";
import SelectForm from "../SelectForm";

const Form = ({
  inputs,
  values,
  errors,
  handleChange,
  handleBlur,
}: FormProps) => {
  const toHandleBlur = (id: string, value: string) => {
    if (handleBlur) handleBlur(id, value);
  };

  const renderInput = (item: FormItem): ReactNode => {
    if (item.inputType === "input") {
      return (
        <InputForm
          id={item.id}
          name={item.name}
          type={item.type}
          label={item.label}
          value={values[item.id]}
          error={errors[item.id]}
          handleChange={
            handleChange as React.ChangeEventHandler<HTMLInputElement>
          }
          handleBlur={() => toHandleBlur(item.id, values[item.id])}
        />
      );
    }
    if (item.inputType === "select") {
      return (
        <SelectForm
          id={item.id}
          name={item.name}
          label={item.label}
          value={values[item.id]}
          error={errors[item.id]}
          options={item.options ?? []}
          handleChange={
            handleChange as React.ChangeEventHandler<HTMLSelectElement>
          }
        />
      );
    }

    return <></>;
  };

  return <FormStyles>{inputs.map((input) => renderInput(input))}</FormStyles>;
};

export default Form;
