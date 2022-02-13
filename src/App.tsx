import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./Root";

interface IProps {}

const App: React.FC<IProps> = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default App;
