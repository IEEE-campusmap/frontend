import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-ico-material-design";
import { Svg, Rect, Circle } from 'react-native-svg'

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailPattern = /^[\w-]+(\.[\w-]+)*@u\.northwestern\.edu$/

  const validateSignup = async () => {
    if (!email) {
    Alert.alert('Please enter your email');
    } else if (!emailPattern.test(email)) {
    Alert.alert('Please enter a valid Northwestern email');
    } else if (!name) {
    Alert.alert('Please enter your name');
    } else if (!password) {
    Alert.alert('Please enter your password');
    } else {
    handleSignup();
 }
}
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
  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
    } else {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then(response => response.json())
        .then(data => {
          navigation.navigate('Login');
        })
        .catch(error => {
            console.error('Error during sign up:', error); // Log errors for debugging
            Alert.alert('An error occurred. Please try again.');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Icon name="user-shape" height='100' width='100' color="#3E4958" style={styles.icon}/>
      <View style={styles.circle}>
      <Svg width="160" height="160" viewBox="0 0 160 160" fill="none"> 
        <Circle cx="80" cy="80" r="80" fill="#EEEEEE"/>
      </Svg>
      </View>

      <Text style={styles.label}>Enter your Northwestern email to sign up</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <View style={styles.passwordContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleText}>
            <Text style={styles.hideText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleText}>
            <Text style={styles.hideText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.buttonBox}>
      <TouchableOpacity style={styles.button} onPress={validateSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <Icon name="keyboard-right-arrow-button-1" color='#FFFFFF' style={styles.arrow}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Already have an account? Sign in here</Text>
      </TouchableOpacity>
      <View style={styles.customSVG}>
        <BottomSVG />
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    position:'relative',
  },
  label: {
    fontSize: 13,
    marginVertical: 10,
    color: '#40B59F',
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft: 5,
  },
  textInput: {
      width: '100%',
      height: 53,
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
  buttonBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    right: 25,
    top: 20,
  },
  button: {
    width: "100%",
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#40B59F',
  },
  buttonText: {color: '#ffffff', fontSize: 23, fontWeight: '500'},
  loginText: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  customSVG: {
    position: 'absolute',
    bottom: 20,
  },
  icon: {
    marginTop: 50,
    marginBottom: 60,
    position: 'relative', // Ensures the icon is positioned relative to the container
    zIndex: 1
  },
  circle: {
    position: 'absolute', // Ensures the circle is behind other elements
    top: 23, // Adjust position as needed
  },
});