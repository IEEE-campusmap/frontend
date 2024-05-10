import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  FlatList,
  TextInput,
} from "react-native";
import React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import MarkerDrawer from "./MarkerClickDrawer";
import * as Location from "expo-location";
import PopUp from "./PopUp";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const update_time = 60000;
export default function App({ navigation }) {

  const [searchQuery, setSearchQuery] = useState("");
  // ref
  const dashboardSheetRef = useRef(null);
  const markerSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "75%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleDashboardOpen = useCallback(() => {
    dashboardSheetRef.current?.present();
  }, []);

  const handleMarkerSelect = useCallback((marker) => {
    setSelectedMarker(marker);
    markerSheetRef.current?.present();
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // useEffect(() => {
  // if(isUserInLocation(location)){
  //   setIsPopupVisible(true);
  // }
  // }, []);

  const isUserInLocation = (location) => {
    const main = markers.find((marker) => marker.title === "Deering Library");
    const mainlat = main.latlng.latitude;
    const mainlong = main.latlng.longitude;
    const threshold = 0.09009;
    const latDiff = Math.abs(location.coords.latitude - mainlat);
    const longDiff = Math.abs(location.coords.longitude - mainlong);
    if (latDiff <= threshold && longDiff <= threshold) {
      console.log("at deering!");
      return true;
    }
    return false;
  };
  const handleClosePopUp = () => {
    setIsPopupVisible(false);
  };

  const handleSelectMarker = useCallback(
    (marker) => {
      if (selectedMarker !== marker) {
        setSelectedMarker(marker); // Set the new marker
        if (drawerVisible) {
          bottomSheetModalRef.current?.close(); // Close current bottom sheet
        }
        // Delay the presentation to allow the previous modal to close smoothly
        setTimeout(() => {
          bottomSheetModalRef.current?.present();
          setDrawerVisible(true);
        }, 300);
      }
    },
    [selectedMarker, drawerVisible]
  ); // Dependencies are correctly set here

  // MAPS-------------------------------------------------------
  const [mapRegion, setMapRegion] = useState({
    latitude: 42.055984,
    longitude: -87.675171,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * 2.16667,
  });

  useEffect(() => {
    const userLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      console.log(
        "location: ",
        location.coords.latitude,
        " ",
        location.coords.longitude
      );
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005 * 2.16667,
      });
      if (isUserInLocation(location)) {
        setIsPopupVisible(true);
      }
    };
    // userLocation();
    setInterval(userLocation, update_time);
    // const locationInterval = setInterval(sendLocationtoBackend, update_time);
    // return () => clearInterval(locationInterval);
  }, []);

  // function sendLocationtoBackend() {
  //   userLocation()
  //     .then((location) => {
  //       fetch("/api/location", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(location),
  //       })
  //         .then((reponse) => {
  //           if (!reponse.ok) {
  //             console.log(`location is ${location}`);
  //             // throw new Error("Failed to send location data to backend");
  //           }
  //           console.log("Location data send successfully");
  //         })
  //         .catch((error) => {
  //           console.error("Error sending location data:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving user location: ", error);
  //     });
  // }

  const markers = [
    {
      latlng: { latitude: 42.05836875154035, longitude: -87.67447675173034 },
      title: "Mudd Library",
      description: "Crowded",
      pinColor: "blue",
      id: "1",
    },
    {
      latlng: { latitude: 42.05321151292757, longitude: -87.67412889825846 },
      title: "University Library",
      description: "Super Crowded",
      pinColor: "green",
      id: "2",
    },
    {
      latlng: { latitude: 42.05320830112781, longitude: -87.67553348119738 },
      title: "Deering Library",
      description: "Empty",
      pinColor: "yellow",
      id: "3",
    },
    {
      latlng: { latitude: 42.05965513831689, longitude: -87.67297882367957 },
      title: "Henry Crown Sports Pavillion",
      description: "Somewhat Crowded",
      pinColor: "blue",
      id: "4",
    },
    {
      latlng: { latitude: 42.05430949102578, longitude: -87.67822696077528 },
      title: "Blomquist Recreation Center",
      description: "Not Crowded",
      pinColor: "yellow",
      id: "5",
    },
  ];
  const filteredMarkers = markers.filter((marker) => marker.title.toLowerCase().includes(searchQuery.toLowerCase()))
  // sendLocationtoBackend();
  // setInterval(sendLocationtoBackend, 1000);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <MapView style={styles.map} region={mapRegion}>
          <Marker coordinate={mapRegion} title="My Location" />
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              pinColor={marker.pinColor}
              onPress={() => handleMarkerSelect(marker)}
            />
          ))}
        </MapView>
        <TouchableOpacity
          onPress={handleDashboardOpen}
          style={{
            backgroundColor: "#40B59F", // Green color from LoginScreen
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
          }}
        >
          <Text style={styles.buttonText}>Pull Up Dashboard</Text>
        </TouchableOpacity>

        <BottomSheetModal
          ref={dashboardSheetRef}
          index={1}
          snapPoints={snapPoints}
          stackBehavior="replace"
        >
          <BottomSheetView style={styles.contentContainer2}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search Locations"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              autoCapitalize="none"
            />
            <FlatList
              data={filteredMarkers}
              keyExtractor={(marker) => marker.id} // Using marker ID as the key
              contentContainerStyle={styles.flatListContainer}
              renderItem={({ item }) => (
             <View style={styles.listItem}>
                <TouchableOpacity onPress={() => handleMarkerSelect(item)}>
                  <Text style={styles.listItemText}>{item.title}</Text> 
                  <Text style={styles.listItemDescription}>{item.description}</Text>
                </TouchableOpacity>
            </View>
      )}
    />
          </BottomSheetView>
        </BottomSheetModal>
        <BottomSheetModal
          ref={markerSheetRef}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.contentContainer}>
            {selectedMarker && (
              <MarkerDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                markerId={selectedMarker.id}
                bottomSheetModalRef={markerSheetRef}
                navigation={navigation}
              />
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </View>
      <View
        style={{ flex: 0.1, justifyContent: "center", alignItems: "center" }}
      >
        <PopUp
          isVisible={isPopupVisible}
          onClose={handleClosePopUp}
          onNavigate={() => navigation.navigate("screen")}
        />
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  contentContainer2: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  flatListContainer: {
    width: 500,
    backgroundColor: "#FFFFFF", // Padding at the bottom for spacing
  },
  searchBar: {
    fontSize: 16,
    width: '95%',
    marginVertical: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  listItem: {
    alignSelf: "stretch",
    paddingVertical: 10,
    paddingHorizontal: 20, // Adjusted padding for better alignment
    width: '90%',
    marginBottom: 10,
    // borderRadius: 12,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    backgroundColor: '#FFFFFF',
    // shadowColor: '#000', // Box shadow color
    // shadowOffset: { width: 0, height: 4 }, // Offset for shadow (4px downwards)
    // shadowOpacity: 0.14, // Opacity of shadow
    // shadowRadius: 15, // Shadow blur radius
    borderRadius: 15,
    alignItems: 'flex-left'
  },
  listItemText: {
    fontSize: 18, // Increased font size
    fontWeight: "bold",
    marginBottom: 7 // Bold text
  },
  listItemDescription: {
    fontSize: 16, // Font size for description
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
    float: "right",
  },
  crowded: {
    color: "red",
  },
  empty: {
    color: "green",
  },
  libraryName: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  libraryStatus: {
    fontSize: 14,
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: "grey",
    width: 100,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 6,
  },
  buttonText: {color: '#ffffff', fontSize: 18, fontWeight: '400'},
});
