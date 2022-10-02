import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Listado = () => {
  const state = useSelector((state) => state.facturas);
  const [number, onChangeNumber] = useState("0");
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 32, color: "black" }}>
          Facturas: $
          {state
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0).toFixed(2)}
        </Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Restar"
        keyboardType="numeric"
      />
      <Text Text style={{ fontSize: 32, color: "black" }}>Total: $ {state
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0).toFixed(2) - parseFloat(number).toFixed(2)}</Text>
    </SafeAreaView>
  );
};

export default Listado;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /* marginTop: StatusBar.currentHeight || 0, */
    paddingTop: StatusBar.currentHeight + 8,
    backgroundColor: "#AED6F1",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  footerStyle: {
    borderTopColor: "red",
    borderTopWidth: 2,
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
  input: {
    fontSize: 32,
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
