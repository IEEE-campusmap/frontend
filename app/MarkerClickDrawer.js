import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';


const { height } = Dimensions.get('window');
const DRAWER_HEIGHT = height * 0.7; // Set the height of the drawer
const markers = [
  {
    title: "Mudd Library",
    description: "Crowded",
    pinColor: "blue",
    id: "1",
    scale: "3",
  },
  {
    title: "University Library",
    description: "Super Crowded",
    scale: "5",
    pinColor: "green",
    id: "2",
  },
  {
    title: "Deering Library",
    description: "Empty",
    scale: "0",
    pinColor: "yellow",
    id: "3",
  },
  {
    title: "Henry Crown Sports Pavillion",
    description: "Little Crowded",
    scale: "2",
    pinColor: "blue",
    id: "4",
  },
  {
    title: "Blomquist Recreation Center",
    description: "Not Crowded",
    scale: "1",
    pinColor: "yellow",
    id: "5",
  },
];
const MarkerDrawer = ({ visible, onClose, markerId, bottomSheetModalRef, navigation }) => {
  const marker = markers.find((m) => m.id === markerId)
  const [locationInfo] = useState({
    title: marker?.title || "Unknown Title",
    description: marker?.description || "No Description",
    scale: marker?.scale || "0",
  });
  const [recentUsers] = useState([
    { id: 1, name: 'John', rating: 4, comment: 'Great place!' },
    { id: 2, name: 'Alice', rating: 3, comment: 'Nice ambiance.' },
    { id: 3, name: 'Bob', rating: 5, comment: 'Highly recommended.' },
  ]);

  const handleSliderChange = (value) => {
    setCrowdednessInfo(value);
  };


  useEffect(() => {
    if (visible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [visible, bottomSheetModalRef]);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss(); // Close the bottom sheet
  };
  const handleNavigateToUpdatePage = () => {
    // Navigate to UserUpdateScreen
    navigation.navigate('Update');
  };

  return (
    
    <View style={{ flex: 1 }}>

        <BottomSheetView style={{ backgroundColor: '#fff', padding: 20 }}>
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.arrow} onPress={closeBottomSheet}>
              <AntDesign name="back" size={24} color="#40B59F"/>
            </TouchableOpacity>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
            {locationInfo.title}
          </Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            {locationInfo.description}
          </Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Crowdedness: {locationInfo.scale}</Text>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Recent Users:</Text>
          <FlatList
            data={recentUsers}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 10 }}>
                <Text>User: {item.name}</Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Comment: {item.comment}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity onPress={handleNavigateToUpdatePage} style={styles.updateButton}>
          <Text style={styles.buttonText}>Update Crowdedness</Text>
        </TouchableOpacity>
        </BottomSheetView>
    </View>
  );
};

export default MarkerDrawer;

const styles = StyleSheet.create({
  updateButton: {
    marginTop: 20,
    backgroundColor: '#40B59F',  // Button color from LoginScreen
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  buttonBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
 });