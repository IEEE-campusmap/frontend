import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import Slider from "@react-native-community/slider";

const { height } = Dimensions.get('window');
const DRAWER_HEIGHT = height * 0.7; // Set the height of the drawer

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
  const handleSliderChange = (value) => {
    setCrowdednessInfo(value);
  };

  const handleUpdatePress = async () => {
    // Handle update press here
    console.log('Update pressed');
  };

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.title}>{locationInfo.title}</Text>
        <Text style={styles.description}>Crowdedness: {crowdednessInfo}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.sliderContainer}>
          <TouchableOpacity
            style={styles.sliderButton}
            onPress={() => handleSliderChange(crowdednessInfo - 1)}
            disabled={crowdednessInfo <= 0}
          >
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.sliderValue}>{crowdednessInfo}</Text>
          <TouchableOpacity
            style={styles.sliderButton}
            //onPress={() => handleSliderChange(crowdednessInfo + 1)}
            disabled={crowdednessInfo >= 10}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={crowdednessInfo}
          onValueChange={handleSliderChange}
        />
        <Text style={styles.subTitle}>Recent Users:</Text>
        <FlatList
          data={locationInfo.recentUsers}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text>User: {item.name}</Text>
              <Text>Rating: {item.rating}</Text>
              <Text>Comment: {item.comment}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdatePress}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  drawerHeader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    marginBottom: 20,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  sliderButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'gray',
  },
  sliderValue: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  slider: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userItem: {
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DrawerComponent;