import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/components/Main";
import Constants from "expo-constants";
import LectorQr from "./src/components/LectorQr";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Home from "./src/components/Home";
import Listado from "./src/components/Listado";
import Tabla from "./src/components/Tabla";
import { Provider } from "react-redux";
import store from "./src/Redux/store"

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Main />
        </View>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Scanner" component={LectorQr} />
          <Stack.Screen name="Listado" component={Listado} />
          <Stack.Screen name="Tabla" component={Tabla} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: .07,
    backgroundColor: "#FFFF00",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
