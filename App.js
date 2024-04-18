import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { Link } from 'expo-router';
import { Pressable } from "react-native"; 
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserUpdateScreen from './app/UserUpdateScreen';

const Stack = createNativeStackNavigator();

const update_time = 60000;
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
    const locationInterval = setInterval(sendLocationtoBackend, update_time);
  }, []);

  function sendLocationtoBackend() {
    userLocation()
      .then((location) => {
        fetch("/api/location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(location),
        })
          .then((reponse) => {
            if (!reponse.ok) {
              console.log(`location is ${location}`);
              // throw new Error("Failed to send location data to backend");
            }
            console.log("Location data send successfully");
          })
          .catch((error) => {
            console.error("Error sending location data:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving user location: ", error);
      });
  }

  // sendLocationtoBackend();
  // setInterval(sendLocationtoBackend, 1000);
  return (
    <View style={styles.container}>
{/*       
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView> 
      <Button title="Get Location" onPress={userLocation} /> */}


      {/* update screen */}  
      <NavigationContainer>
        <Stack.Navigator> 
          <Stack.Screen name="screen" component={UserUpdateScreen} />
        </Stack.Navigator>
      </NavigationContainer>
 
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
  update: {
    flex: 2,
    // flex: 1, 
    // justifyContent: "center",
    // alignItems: "center", 
    // backgroundColor: "#ffc2c2", 
  }
});
