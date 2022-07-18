import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from "react-native";

const Listado = (props) => {
  const Footer_Component = () => {
    return (
      <View
        style={{
          height: 44,
          width: "100%",
          backgroundColor: "#00BFA5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, color: "white" }}>
          Total a Depositar: ${props.data
            ?.map((item) => item.importe)
            .reduce((prev, curr) => prev + curr, 0)}
        </Text>
      </View>
    );
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Importe: ${title.importe}</Text>
      <Text style={styles.title}>Factura N:{title.nroDocRec}</Text>
      <Text style={styles.title}>Fecha: {title.fecha}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item} />;
  let id = 0;
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
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
    backgroundColor: "#f9c2ff",
    padding: 20,
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
