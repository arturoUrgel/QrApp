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
import Tabla from "./src/components/Tabla"

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Main />
        <Tabla/>
      </View>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scanner" component={LectorQr} />
        <Stack.Screen name="Listado" component={Listado} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 2.2,
    backgroundColor: "#FFFF00",
    //alignItems: "center",
    //justifyContent: "center",
  },
});
