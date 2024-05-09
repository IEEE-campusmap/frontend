import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import { BottomSheetModalProvider, BottomSheetView} from '@gorhom/bottom-sheet';

const { height } = Dimensions.get('window');
const DRAWER_HEIGHT = height * 0.7; // Set the height of the drawer

// previous version: 
// const MarkerDrawer = ({ visible, onClose, markerId, bottomSheetModalRef }) => {
//   const [locationInfo] = useState({
//     title: 'Dummy Location',
//   });
//   const [crowdednessInfo, setCrowdednessInfo] = useState(5);
//   const [recentUsers] = useState([
//     { id: 1, name: 'John', rating: 4, comment: 'Great place!' },
//     { id: 2, name: 'Alice', rating: 3, comment: 'Nice ambiance.' },
//     { id: 3, name: 'Bob', rating: 5, comment: 'Highly recommended.' },
//   ]);

const DrawerComponent = ({ markerId }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  const [crowdednessInfo, setCrowdednessInfo] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch location data from the backend
        const response = await fetch(`http://crowd-scope-web-service-env.eba-xjchfirq.us-east-1.elasticbeanstalk.com/building/${markerId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        setLocationInfo(data);
        setCrowdednessInfo(data.crowdedness);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [markerId]);
}
  
  /*useEffect(() => {
    fetchData(); // Commented out fetching for now
    // Slide up the drawer when component mounts
    Animated.timing(drawerAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

 const fetchData = async () => {
    try {
      const response = await fetch('./locationData.json');
      const data = await response.json();
      const location = data.find((location) => location.id === markerId);
      setLocationInfo(location);
      setCrowdednessInfo(location ? location.crowdedness : 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 
*/
  // Use dummy data instead of fetching
 /* setLocationInfo({
    title: 'Dummy Location',
    crowdedness: 5,
    recentUsers: [
      { id: 1, name: 'John', rating: 4, comment: 'Great place!' },
      { id: 2, name: 'Alice', rating: 3, comment: 'Nice ambiance.' },
      { id: 3, name: 'Bob', rating: 5, comment: 'Highly recommended.' },
    ],
  });
  setCrowdednessInfo(5);
*/
const MarkerDrawer = ({ visible, onClose, markerId, bottomSheetModalRef }) => {
  const [locationInfo] = useState({
    title: 'Dummy Location',
  });
  const [crowdednessInfo, setCrowdednessInfo] = useState(5);
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

  return (
    
    <View style={{ flex: 1 }}>

        <BottomSheetView style={{ backgroundColor: '#fff', padding: 20 }}>
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', padding: 10 }}>
            <Text style={{ fontSize: 18, color: 'blue' }}>Close</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
            {locationInfo.title}
          </Text>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Crowdedness: {crowdednessInfo}</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={crowdednessInfo}
              onValueChange={handleSliderChange}
            />
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
        </BottomSheetView>
    </View>
  );
};

export default MarkerDrawer;
