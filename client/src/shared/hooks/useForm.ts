import { useState } from "react";
import {
  InputError,
  InputValidations,
  InputValues,
  ValidationRulesName,
} from "../types/Form";

const useForm = (initialState: InputValues, validations: InputValidations) => {
  const [values, setValues] = useState<InputValues>(initialState);
  const [errors, setErrors] = useState<InputError>({});

  const getErrorMessage = (rule: ValidationRulesName, value: number = 0) => {
    switch (rule) {
      case "required":
        return "Required Field";
      case "minLength":
        return `Must have at least ${value} characters`;
      case "maxLength":
        return `Must have a maximum ${value} characters`;
      case "email":
        return "Invalid E-mail";
      default:
        return "";
    }
  };

  const validateField = (name: keyof InputValues, value: string) => {
    let errorMessage: string;

    const rules = validations[name];
    if (rules) {
      if (rules.required && !value) {
        errorMessage = getErrorMessage("required");
      } else if (rules.minLength && value.length < rules.minLength) {
        errorMessage = getErrorMessage("minLength", rules.minLength);
      } else if (rules.maxLength && value.length > rules.maxLength) {
        errorMessage = getErrorMessage("minLength", rules.maxLength);
      } else if (
        rules.pattern &&
        rules.pattern === "email" &&
        !new RegExp(/^[^s@]+@[^s@]+.[^s@]+$/).test(value)
      ) {
        errorMessage = getErrorMessage("email");
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const isValid = (revalidate: boolean = false) => {
    let valid = true;
    const newErrors: InputError = {};

    Object.keys(values).forEach((key) => {
      const name = key as keyof InputValues;
      const value = values[name];
      const rules = validations[name];

      if (rules) {
        if (rules.required && !value && value === "") {
          valid = false;
          newErrors[name] = getErrorMessage("required");
        } else if (rules.minLength && value.length < rules.minLength) {
          valid = false;
          newErrors[name] = getErrorMessage("minLength", rules.minLength);
        } else if (rules.maxLength && value.length > rules.maxLength) {
          valid = false;
          newErrors[name] = getErrorMessage("maxLength", rules.maxLength);
        } else if (
          rules.pattern &&
          rules.pattern === "email" &&
          !new RegExp(/^[^s@]+@[^s@]+.[^s@]+$/).test(value)
        ) {
          valid = false;
          newErrors[name] = getErrorMessage("email");
        }
      }
    });

    if (revalidate) {
      setErrors(newErrors);
    }
    return valid;
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value, tagName } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (tagName === "SELECT") {
      validateField(name, value);
    }
  };

  const resetForm = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validateField,
    isValid,
    resetForm,
  };
};

export default useForm;
