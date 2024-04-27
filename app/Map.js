import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";


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
      latitudeDelta: 0.005,
      longitudeDelta: 0.005 * 2.16667,
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

  const markers = [
    {
      latlng: { latitude: 42.05836875154035, longitude: -87.67447675173034 },
      title: "Mudd Library",
      description: "Description 1",
      pinColor: "blue",
    },
    {
      latlng: { latitude: 42.05321151292757, longitude: -87.67412889825846 },
      title: "University Library",
      description: "Description 2",
      pinColor: "green",
    },
    {
      latlng: { latitude: 42.05320830112781, longitude: -87.67553348119738 },
      title: "Deering Library",
      description: "Description 3",
      pinColor: "yellow",
    },
    {
      latlng: { latitude: 42.05965513831689, longitude: -87.67297882367957 },
      title: "Henry Crown Sports Pavillion",
      description: "Description 3",
      pinColor: "blue",
    },
    {
      latlng: { latitude: 42.05430949102578, longitude: -87.67822696077528 },
      title: "Blomquist Recreation Center",
      description: "Description 3",
      pinColor: "yellow",
    },
  ];

  // sendLocationtoBackend();
  // setInterval(sendLocationtoBackend, 1000);
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            pinColor={marker.pinColor}
          />
        ))}
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
