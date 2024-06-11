import { ReactElement } from "react";

import InputForm from "../../components/InputForm";
import Button from "../../components/Button";

import useAuth from "../../shared/hooks/useAuth";
import useForm, { InputValidations } from "../../shared/hooks/useForm";
import { AuthPayload } from "@/shared/types/Auth";

import LoginStyles, { LoginBox, LoginTitle, UserIcon } from "./Login.styles";

const LoginPage = (): ReactElement => {
  const { login } = useAuth();
  const initialForm = {
    email: "",
    password: "",
  };

  const validationsForm: InputValidations = {
    email: { required: true, pattern: "email" },
    password: { required: true },
  };

  const { values, errors, isValid, handleChange, validateField, resetForm } =
    useForm(initialForm, validationsForm);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isValid(true)) {
      console.log("Formulário submetido:", values as AuthPayload);
      login(values as AuthPayload);
    } else {
      alert("Formulário inválido");
    }
  };

  return (
    <LoginStyles>
      <LoginBox>
        <UserIcon />
        <LoginTitle>Sign in to your account</LoginTitle>
        <form onSubmit={handleSubmit}>
          <InputForm
            id="email"
            name="email"
            type="email"
            label="E-mail"
            value={values.email}
            error={errors.email}
            handleChange={handleChange}
            handleBlur={() => validateField("email", values.email)}
          />

          <InputForm
            id="password"
            name="password"
            type="password"
            label="Password"
            value={values.password}
            error={errors.password}
            handleChange={handleChange}
            handleBlur={() => validateField("password", values.password)}
          />
          <br />
          <Button type="submit" isDisabled={!isValid()} size="large">
            Sign in
          </Button>
        </form>
      </LoginBox>
    </LoginStyles>
  );
};

export default LoginPage;
