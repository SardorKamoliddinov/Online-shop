import { QueryClientProvider } from "react-query";
import MainCard from "./components/MainCard/MainCard";
import queryClient from "./Query/queryClient";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainCard />
      </QueryClientProvider>
    </>
  );
}

export default App;
