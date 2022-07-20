import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Listado from "./Listado";
import base64 from "react-native-base64";
import { useDispatch } from "react-redux";
import { addQr } from "../Redux/actions";
import { useSelector } from "react-redux";

const LectorQr = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  //const [datos, setDatos] = useState([]);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.facturas);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let obj = JSON.parse(base64.decode(data.slice(33)));

    fetch(
      "https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=" + obj.nroDocRec
    )
      .then((response) => response.json())
      .then((data) => {
        obj.nombre = data.Contribuyente.nombre
        dispatch(addQr(obj));
      });
   
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Listado /* data={datos} */ />
      {scanned ? (
        <View>
          <Button
            title={"Scannear Otra QR"}
            onPress={() => setScanned(false)}
          />
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default LectorQr;

