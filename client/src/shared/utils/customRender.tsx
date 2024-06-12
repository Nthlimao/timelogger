import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

const CustomWrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={{}}>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: CustomWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
