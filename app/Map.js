import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Button, FlatList, TextInput} from "react-native";
import React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import DrawerComponent from "./MarkerClickDrawer";
import * as Location from "expo-location"; 
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const update_time = 60000;
export default function App() {
  

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
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

 
  // MAPS-------------------------------------------------------
  const [mapRegion, setMapRegion] = useState({
    latitude: 42.055984,
    longitude: -87.675171,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005 * 2.16667,
  });

 const [selectedMarker, setSelectedMarker] = useState(null);

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

  const handleSelectMarker = (marker) => {
    if (selectedMarker !== marker) {
      setSelectedMarker(marker);
    } 
  };

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
    <BottomSheetModalProvider>
    <View style={styles.container}>
 
       <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
        {markers.map((marker, index) => {
          console.log("Marker index:", index);
          console.log("Markers array length:", markers.length);
          return (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              pinColor={marker.pinColor}
              onPress={handleSelectMarker}
            />
          );
        })}
        {/* <Button title="Get Location" onPress={userLocation} />  */}

         
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
         <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
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
                  <Text style={styles.libraryName}>{item.name}</Text> 

                  {/* <View style={styles.libraryStatus}> */}
                    <Text style={[styles.libraryStatus, item.status === 'Empty' ? styles.empty : styles.crowded]}>{item.status}</Text>
                  {/* </View> */}
                </View>
              )}
          />
          </BottomSheetView>
        </BottomSheetModal>
 
      </MapView>          
    </View> 
    </BottomSheetModalProvider>   
 
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

