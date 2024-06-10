import { ThemeProvider } from "styled-components";
import { AuthProvider } from "@/shared/contexts/auth";

const App = () => {
  return (
    <ThemeProvider theme={{}}>
      <AuthProvider>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero laborum
        culpa quia non voluptates maxime necessitatibus quod quasi cumque
        tenetur! Commodi voluptate quis totam molestiae aperiam neque similique
        minima debitis.
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
