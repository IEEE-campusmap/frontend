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
import Maps from './app/Map';
import HomeScreen from './app/Homescreen';

const Stack = createNativeStackNavigator();
 
export default function App() {
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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Welcome'}}
          />
          
          <Stack.Screen name="screen" component={UserUpdateScreen} />

          <Stack.Screen name="map" component={Maps} />
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
