import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 42.055984,
    longitude: -87.675171,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * 2.16667,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permisison to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001 * 2.16667,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };
  useEffect(() => {
    userLocation();
  }, []);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      <Button title="Get Location" onPress={userLocation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
