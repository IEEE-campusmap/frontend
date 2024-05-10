import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, TextInput} from "react-native";
import React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import MarkerDrawer from "./MarkerClickDrawer";
import * as Location from "expo-location"; 
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const update_time = 60000;
export default function App({navigation}) {
  

  // search bar + inital dashboard
  // Sample data for libraries 

  const [searchQuery, setSearchQuery] = useState('');

  const [libraries, setLibraries] = useState([
    { id: '1', name: 'Mudd Library', status: 'Super Crowded' },
    { id: '2', name: 'Main Library', status: 'Empty' },
    { id: '3', name: 'Blom', status: 'Empty' }
  ]);

  const filteredLibraries = libraries.filter(library =>
    library.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ref
  const dashboardSheetRef = useRef(null);
  const markerSheetRef = useRef(null);;

  // variables
  const snapPoints = useMemo(() => ['25%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
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


  const handleSelectMarker = useCallback((marker) => {
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
  }, [selectedMarker, drawerVisible]); // Dependencies are correctly set here
  
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
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005 * 2.16667,
    });
  };
  userLocation();
  const locationInterval = setInterval(sendLocationtoBackend, update_time);
  return () => clearInterval(locationInterval);
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
    { latlng: { latitude: 42.05836875154035, longitude: -87.67447675173034 }, title: 'Mudd Library', description: 'Description 1', pinColor: 'blue', id: '1' },
    { latlng: { latitude: 42.05321151292757, longitude: -87.67412889825846 }, title: 'University Library', description: 'Description 2', pinColor: 'green', id: '2' },
    { latlng: { latitude: 42.05320830112781, longitude: -87.67553348119738 }, title: 'Deering Library', description: 'Description 3', pinColor: 'yellow', id: '3' },
    { latlng: { latitude: 42.05965513831689, longitude: -87.67297882367957 }, title: 'Henry Crown Sports Pavillion', description: 'Description 3', pinColor: 'blue', id: '4' },
    { latlng: { latitude: 42.05430949102578, longitude: -87.67822696077528 }, title: 'Blomquist Recreation Center', description: 'Description 3', pinColor: 'yellow', id: '5' },
  ];


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
        <TouchableOpacity onPress={handleDashboardOpen} style={{ backgroundColor: '#40B59F', // Green color from LoginScreen
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20}}>
          <Text style={styles.buttonText}>Pull Up Dashboard</Text>
        </TouchableOpacity>
        
        <BottomSheetModal
          ref={dashboardSheetRef}
          index={1}
          snapPoints={snapPoints}
          stackBehavior="replace"
        >
          <BottomSheetView style={styles.contentContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search Libraries"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              autoCapitalize="none"
            />
            <FlatList
              data={filteredLibraries}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <Text>{item.name}</Text>
                  <Text>{item.status}</Text>
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
                navigation = {navigation}
              />
            )}
            
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  icon:{ 
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
  searchBar: {
    fontSize: 16,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listItem: {
    // flexBasis: 'auto',
    alignSelf: "stretch",
    paddingVertical: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 128,
    borderRadius: 12,
    backgroundColor: "grey", 
    borderBottomWidth: 1,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
    float: "right",
  },
  crowded: {
    color: 'red',
  },
  empty: {
    color: 'green',
  },
  libraryName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,     
  },
  libraryStatus: {
    fontSize: 14,
    flex: 1,
  },
  handleIndicator: {
    backgroundColor: 'grey',
    width: 100,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 6,
  },
});
