import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';



export default function Home() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <Button style={styles.boton} title='Scan' onPress={() => navigation.navigate("Scanner")}/>
        <Button color="#841584" title='Lista' onPress={() => navigation.navigate("Listado")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },
  boton:{
    padding: 200,
    borderBottomColor: '#737373',
  },
});
