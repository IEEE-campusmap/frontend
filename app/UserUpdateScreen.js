import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Slider from "@react-native-community/slider";
import { SelectList } from 'react-native-dropdown-select-list';
import AntDesign from '@expo/vector-icons/AntDesign';


const UserUpdateScreen = ({ navigation }) => {
  const [crowdedness, setCrowdedness] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [comment, setComment] = useState(''); 

  const emojis = ['😊', '😐', '😫'];

  const handleSliderChange = (value) => {
    setCrowdedness(value);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [selected, setSelected] = useState("");
  
  const handleselected = (place) => { 
    this.selected = place;    
  };

  const data = [
    {key:'1', value:'Mudd Library'},
    {key:'2', value:'University Library'},
    {key:'3', value:'Deering Library'},
    {key:'4', value:'Henry Crown Sports Pavillion'},
    {key:'5', value:'Blomquist Recreation Center'},
  ]
 
  const handleSubmit = () => {   
    if (!this.selected || crowdedness === 0) {
      // If no place is selected, show an error alert.
      Alert.alert('Error', 'Please select a location and rate crowdedness (1-9) before submitting.');
      return; // Exit the function early to prevent further processing.
    }

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
    Alert.alert('Thank You for the Input!', "Reponse submitted for " + this.selected);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold'}}>User Update</Text>
      <View style={{paddingVertical: 10, marginVertical:10 }}>
      <SelectList 
        setSelected={(val) => handleselected(val)} 
        data={data} 
        save="value"
        placeholder="Select location"
        searchPlaceholder="    Search locations"
        searchicon={<AntDesign name="search1" size={20} color="#D6D6D6" />}
        closeicon={<AntDesign name="close" size={15} color="#D6D6D6" />}
        dropdownStyles={{borderColor:"#D6D6D6", width:"100%", alignSelf: "center"}}
        boxStyles={{borderColor:"#D6D6D6", width:"85%", alignSelf: "center"}}
        dropdownTextStyles ={{ fontSize: 16}}
    />
    </View>
      <Text style={{ marginTop: 5, fontSize: 17}}>Crowdedness: {crowdedness}</Text>
      <Slider
        style={{ width: '70%', marginTop: 10 }}
        minimumValue={0}
        maximumValue={5}
        step={1}
        value={crowdedness}
        onValueChange={handleSliderChange}
        minimumTrackTintColor='#40B59F'
      />
      <TextInput
            style={{ borderWidth: 1, borderColor: '#D6D6D6', marginTop: 20, padding: 10, borderRadius:10, width:"70%", height:50}}
            placeholder="Your comment (optional)"
            value={comment}
            onChangeText={d => setComment(d)}
          />
      <TextInput
        style={{ borderWidth: 1, borderColor: '#D6D6D6', marginTop: 20, padding: 10, borderRadius:10, width:"70%", height:50}}
        placeholder="Choose your reaction below"
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
        style={{ backgroundColor: '#40B59F', padding: 10, paddingHorizontal: 50, borderRadius: 10, marginTop: 20, height:50, justifyContent: 'center'}}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontSize: 18, textAlign: 'center',fontWeight: '500' }}>Submit</Text>
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