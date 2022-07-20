import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sortList } from "../Redux/actions";
import { deleteQR } from "../Redux/actions";

export default function App() {
  const [columns, setColumns] = useState([
    "fecha",
    "nombre",
    "nroDocRec",
    /* "cuit", */
    "importe",
  ]);
  const [direction, setDirection] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  /* const [ pets, setPets ] = useState([
    {
      Name: "Charlie",
      Gender: "Male",
      Breed: "Dog",
      Weight: 12,
      Age: 3
    },
    {
      Name: "Max",
      Gender: "Male",
      Breed: "Dog",
      Weight: 23,
      Age: 7
    },
    {
      Name: "Lucy",
      Gender: "Female",
      Breed: "Cat",
      Weight: 5,
      Age: 4
    },
    {
      Name: "Oscar",
      Gender: "Male",
      Breed: "Turtle",
      Weight: 13,
      Age: 23
    },
    {
      Name: "Daisy",
      Gender: "Female",
      Breed: "Bird",
      Weight: 1.7,
      Age: 3
    },
    {
      Name: "Ruby",
      Gender: "Female",
      Breed: "Dog",
      Weight: 6,
      Age: 3
    },
    {
      Name: "Milo",
      Gender: "Male",
      Breed: "Dog",
      Weight: 11,
      Age: 7
    },
    {
      Name: "Toby",
      Gender: "Male",
      Breed: "Dog",
      Weight: 34,
      Age: 19
    },
    {
      Name: "Lola",
      Gender: "Female",
      Breed: "Cat",
      Weight: 4,
      Age: 3
    },
    {
      Name: "Jack daniels",
      Gender: "Male",
      Breed: "Turtle",
      Weight: 13,
      Age: 23
    },
    {
      Name: "Bailey",
      Gender: "Female",
      Breed: "Bird",
      Weight: 2,
      Age: 4
    },
    {
        Name: "Bella",
        Gender: "Female",
        Breed: "Dog",
        Weight: 6,
        Age: 10
    }
]) */
  const state = useSelector((state) => state.facturas);
  const dispatch = useDispatch();

  const sortTable = (column) => {
    const newDirection = direction === "desc" ? "asc" : "desc";
    const sortedData = _.orderBy(state, [column], [newDirection]);
    setSelectedColumn(column);
    setDirection(newDirection);
    dispatch(sortList(sortedData));
  };
  const tableHeader = () => (
    <View style={styles.tableHeader}>
      {columns.map((column, index) => {
        {
          return (
            <TouchableOpacity
              key={index}
              style={styles.columnHeader}
              onPress={() => sortTable(column)}
            >
              <Text style={styles.columnHeaderTxt}>
                {column + " "}
                {selectedColumn === column && (
                  <MaterialCommunityIcons
                    name={
                      direction === "desc"
                        ? "arrow-down-drop-circle"
                        : "arrow-up-drop-circle"
                    }
                  />
                )}
              </Text>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );

  const Footer_Component = () => {
    return (
      <View
        style={{
          height: 60,
          width: "100%",
          backgroundColor: "#00BFA5",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#37C2D0",
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>
          Total: $
          {state
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0)}
        </Text>
        <Text style={{ fontSize: 24, color: "white" }}>
          Total: $
          {state
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0).toFixed(2)}
        </Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        style={{ width: "95%" }}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={tableHeader}
        ListFooterComponent={Footer_Component}
        /* ListFooterComponentStyle={StyleSheet.footerStyle} */
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View
              /* style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
              }} */
            >
              <TouchableOpacity style={{
                ...styles.tableRow,
                backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
              }} onLongPress={() => dispatch(deleteQR(item.nroDocRec))}>
                <Text style={styles.columnRowTxt}>{item.fecha}</Text>
                <Text style={styles.columnRowTxt}>{item.nombre}</Text>
                <Text style={styles.columnRowTxt}>{item.nroDocRec}</Text>
               {/*  <Text style={styles.columnRowTxt}>{item.cuit}</Text> */}
                <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>
                  {item.importe}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50,
  },
  tableRow: {
    flexDirection: "row",
    height: "auto",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
  },
  columnHeader: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: "white",
    fontWeight: "bold",
  },
  columnRowTxt: {
    width: "20%",
    textAlign: "center",
  },
  footerStyle: {
    borderTopColor: "red",
    borderTopWidth: 2,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    backgroundColor: "#37C2D0",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});
