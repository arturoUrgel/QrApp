import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./src/Redux/store";
import { BottomTab } from "./src/components/NavBar";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer >
        <BottomTab />
      </NavigationContainer>
    </Provider>
  );
}
