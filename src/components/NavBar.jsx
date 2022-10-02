import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Listado from "./Listado";
import Tabla from "./Tabla";
import LectorQr from "./LectorQr";
import Icon from "react-native-vector-icons/Ionicons";


const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "List":
              iconName = focused ? "list" : "list-sharp";
              break;
            case "Scan Qr":
              iconName = focused ? "qr-code" : "qr-code-outline";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Tabla} />
      <Tab.Screen name="List" component={Listado} />
      <Tab.Screen name="Scan Qr" component={LectorQr} />
    </Tab.Navigator>
  );
};


