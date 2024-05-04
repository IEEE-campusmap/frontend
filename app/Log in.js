import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Button,
  Image
} from 'react-native';
import { Svg, Rect, Circle } from 'react-native-svg';
import Icon from "react-native-ico-material-design";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const BottomSVG = () => (
      <Svg width="55" height="10" viewBox="0 0 55 10" fill="none">
        <Circle cx="5" cy="5" r="5" fill="#000000" />
        <Rect x="13" width="25" height="10" rx="5" fill="#40B59F" />
        <Circle cx="45" cy="5" r="5" fill="#000000" />
      </Svg>);
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };
    const validate = async () => {
        if (!email) {
        Alert.alert('Please Enter Your Email id');
        } else if (!password) {
        Alert.alert('Please Enter Your Password');
        } else {
        navigation.navigate('Map')};
  };
  //   const login = async () => {
  //       try {
  //       let res = await fetch('http://localhost:8069/api/login', {
  //           method: 'POST',                                
  //           headers: {
  //           'Content-type': 'application/json',  
  //       },
  //           body: JSON.stringify({                         
  //           params: {
  //               email: email,               
  //               password: password,
  //           },
  //           }),
  //       });
  //     let response = await res.json();
  //     console.log('response', response);
  //     if (response.result.success == true) {
  //       Alert.alert('Login successful!');
  //     } else {
  //       Alert.alert('Invalid email or password');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error); // Log errors for debugging
  //     Alert.alert('An error occurred. Please try again.');
  //   }
  // };
    return (
  <View style={styles.container}>
      <Image
        source={require('../assets/CS.png')} // Adjust path to your image
        style={styles.image} // Styling for the image
      />
      <View style={styles.content}>
        <Text style={styles.heading}>Sign in</Text>
        <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={d => setEmail(d)}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={d => setPassword(d)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleText}>
            <Text style={styles.hideText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => validate()} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign in</Text>
          </TouchableOpacity>
          <Icon name="keyboard-right-arrow-button-1" color='#FFFFFF' style={styles.arrow}/>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text style={styles.loginText}>Don't an account? Sign up here</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.customSVG}>
        <BottomSVG />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', 
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      paddingHorizontal: 20,
      position: 'relative',
      backgroundColor: '#FFFFFF',
    },
    content: {
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%',
      marginHorizontal: 15, 
    },
    heading: {
      fontSize: 18,
      marginBottom: 15,
      color: '#40B59F',
      fontWeight: '600',
      alignSelf: 'flex-start',
      marginLeft: 5,
    },
    textInput: {
      width: '100%',
      height: 60,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#EEEEEE',
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.11,
      shadowRadius: 15, 
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    passwordContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      position: 'relative',
    },
    toggleText: {
      position: 'absolute',
      right: 10,
      top: 20,
    },
    hideText: {
      color: '#40B59F',
      fontSize: 14,
      fontWeight: '500',
    },
    loginButton: {
      width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: '#40B59F',
      marginTop: 10,
    },
    loginButtonText: {color: '#ffffff', fontSize: 23, fontWeight: '500'},
    loginText: {
      marginTop: 35,
      textDecorationLine: 'underline',
    },
    customSVG: {
      position: 'absolute',
      bottom: 20,
    },
    image: {
      width: 337,
      height: 204,
      marginTop: 45,
    },
    buttonBox: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
    },
    arrow: {
      position: 'absolute',
      right: 20,
      top: 30,
    },
  });
  export default LoginScreen;