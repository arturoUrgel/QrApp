import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteQR } from "../Redux/actions";


const Listado = () => {
  const state = useSelector((state) => state.facturas);
  const dispatch = useDispatch();
  const Footer_Component = () => {
    return (
      <View
        style={{
          height: 60,
          width: "100%",
          backgroundColor: "#00BFA5",
          justifyContent: "center",
          alignItems: "center",
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

  const Item = ({ title }) => (
    <View style={styles.item}>
      <View style={{ flex: 0.7 }}>
        <Text style={styles.title}>Importe: ${title.importe.toFixed(2)}</Text>
        <Text style={styles.title}>Factura N:{title.nroDocRec}</Text>
        <Text style={styles.title}>Nombre: {title.nombre}</Text>
      </View>
      <View style={{ flex: 0.3 }}>
        <Button
            title={"Eliminar"}
            onPress={() => dispatch(deleteQR(title.nroDocRec))}
          />
      </View>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item} />;
  let id = 0;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state}
        renderItem={renderItem}
        keyExtractor={() => id++}
        ListFooterComponent={Footer_Component}
        ListFooterComponentStyle={StyleSheet.footerStyle}
      />
    </SafeAreaView>
  );
};

export default Listado;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  footerStyle: {
    borderTopColor: "red",
    borderTopWidth: 2,
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
});
