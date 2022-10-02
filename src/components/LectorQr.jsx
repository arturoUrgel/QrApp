import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Listado from "./Listado";
import base64 from "react-native-base64";
import { useDispatch } from "react-redux";
import { addQr } from "../Redux/actions";
import { useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";

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
    if (data.includes("https://www.afip.gob.ar/fe/qr/")) {
      let obj = JSON.parse(base64.decode(data.slice(33)));
      fetch(
        "https://afip.tangofactura.com/Rest/GetContribuyenteFull?cuit=" +
          obj.nroDocRec
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.Contribuyente) {
            obj.nombre = data.Contribuyente.nombre;
          } else {
            obj.nombre = "Error";
          }
          dispatch(addQr(obj));
        })
        .catch(()=> {obj.nombre = "Error Sin Red"
      dispatch(addQr(obj))})
    } else {
      Alert.alert("Lector QR", `${data}`, [
        {
          text: `Copy`,
          onPress: async () => {
            await Clipboard.setStringAsync(`${data}`);
          },
        },
      ]);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {scanned ? (
        <View>
          <TouchableOpacity
            style={{
              height: 60,
              margin: 10,
              backgroundColor: "#33B2FF",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setScanned(false)}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Scan QR</Text>
          </TouchableOpacity>
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
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default LectorQr;
