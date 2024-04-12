import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  const[mapRegion,setMapRegion] =useState({
    latitude: 42.055984,
    longitude: -87.675171,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005* 2.16667
  });
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        region = {mapRegion}>
        <Marker coordinate = {mapRegion} title='Marker'/>
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
