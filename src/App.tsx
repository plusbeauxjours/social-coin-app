import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./Root";
import { QueryClient, QueryClientProvider } from "react-query";

interface IProps {}

const queryClient = new QueryClient();

const App: React.FC<IProps> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
