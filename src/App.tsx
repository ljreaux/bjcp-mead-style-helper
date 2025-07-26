import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";
import { MeadStyleProvider } from "./components/MeadStyleProvider";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MeadStyleProvider>
          <Main />
        </MeadStyleProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
