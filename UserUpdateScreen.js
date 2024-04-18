import React, { useState } from 'react';
import { View, Text, Slider, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const UserUpdateScreen = ({ navigation }) => {
  const [crowdedness, setCrowdedness] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const emojis = ['😊', '😐', '😫'];

  const handleSliderChange = (value) => {
    setCrowdedness(value);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handleSubmit = () => {
    const requestBody = {
      crowdedness,
      inputValue
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
    Alert.alert('Post Request', JSON.stringify(requestBody));
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>User Update Page</Text>

      <Text style={{ marginTop: 20 }}>Crowdedness: {crowdedness}</Text>
      <Slider
        style={{ width: '80%', marginTop: 10 }}
        minimumValue={0}
        maximumValue={100}
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
});

export default UserUpdateScreen;