import { ThemeProvider } from "styled-components";
import { AuthProvider } from "@/shared/contexts/auth";
import Routes from "./router/Routes";

import "./style.css";

const App = () => {
  return (
    <ThemeProvider theme={{}}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
