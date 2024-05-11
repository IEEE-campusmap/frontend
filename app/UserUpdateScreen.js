import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Slider from "@react-native-community/slider"; 
import SelectDropdown from 'react-native-select-dropdown'

const UserUpdateScreen = ({ navigation }) => {
  const [crowdedness, setCrowdedness] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [selectedplace, setSelectedPlace] = useState('');
  const emojis = ['😊', '😐', '😫'];

  const handleSliderChange = (value) => {
    setCrowdedness(value);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handlePlaceSelect = (selectedItem) => { 
    // this.selectedplace = selectedItem.title; 
    setSelectedPlace(selectedItem.title);
    console.log(this.selectedplace)
  };

  const handleSubmit = () => {
    if (this.selectedPlace === '') {
      // If no place is selected, show an error alert.
      Alert.alert('Error', 'Please select a location before submitting.');
      return; // Exit the function early to prevent further processing.
    }

    const requestBody = {
      crowdedness,
      inputValue,
      place: this.selectedPlace
    };

    // Send the POST request with the requestBody
    // You can use libraries like axios or fetch to make the request
    // Example:
    // axios.post('https://example.com/api/update', requestBody)
    //   .then(response => {
    //     // Handle the response
    //   })
    //   .catch(error => {
    //     // Handle the error
    //   });

    // For this example, we'll just display an alert with the request body
    Alert.alert('Thank You for the Input!', "Reponse submitted for " + JSON.stringify(requestBody));
    // Alert.alert('Updated!', , JSON.stringify(requestBody));
  };

  const places = [
    {title: "Mudd Library", id: "1",},
    {title: "University Library", id: "2",},
    {title: "Deering Library", id: "3",},
    {title:"Henry Crown Sports Pavillion", id: "4",},
    {title: "Blomquist Recreation Center", id: "5",},
  ];

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>How Crowded is</Text> 
      
      <SelectDropdown
        data={places}
        onSelect={(selectedItem, index) => handlePlaceSelect(selectedItem)}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {selectedItem ? selectedItem.title : 'Select a location'}
            </Text>
          </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}> 
              <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
      /> 

      <Text style={{ marginTop: 20, fontSize: 20}}>Crowdedness: {crowdedness}</Text>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>User Update Page</Text>

      <Text style={{ marginTop: 20 }}>Crowdedness: {crowdedness}</Text>
      <Slider
        style={{ width: '80%', marginTop: 10 }}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={crowdedness}
        onValueChange={handleSliderChange}
      />

      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', marginTop: 20, padding: 10 }}
        placeholder="Enter your input"
        value={inputValue}
        onChangeText={handleInputChange}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => setInputValue(emoji)}>
            <Text style={{ fontSize: 30 }}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20 }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButtonStyle: {
    width: 175,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default UserUpdateScreen;