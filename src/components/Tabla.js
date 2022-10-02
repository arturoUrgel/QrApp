
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
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
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#37C2D0",
          borderBottomEndRadius: 10,
          borderBottomStartRadius: 10,
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>
          Cant: {state?.length}
        </Text>
        <Text style={{ fontSize: 24, color: "white" }}>
          Total: $
          {state
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0)
            .toFixed(2)}
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
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => {
          return (
            <View>
              <TouchableOpacity
                style={{
                  ...styles.tableRow,
                  backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white",
                }}
                onLongPress={() => dispatch(deleteQR(item.nroDocRec))}
              >
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
      {/*       <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AED6F1",
    alignItems: "center",
    justifyContent: "center",
    /* marginTop: StatusBar.currentHeight || 0, */
    paddingTop: StatusBar.currentHeight + 8,
    paddingBottom: 8,
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
