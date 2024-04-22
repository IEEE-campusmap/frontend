import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const emailPattern = /^[\w-]+(\.[\w-]+)*@u\.northwestern\.edu$/

  const validateSignup = async () => {
    if (!email) {
    Alert.alert('Please Enter Your Email id');
    } else if (!emailPattern.test(email)) {
    Alert.alert('Please enter a valid Northwestern email');
    } else if (!password) {
    Alert.alert('Please Enter Your Password');
    } else {
    handleSignup();
 }
}
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
      <Text style={styles.heading}>Sign up</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Northwestern email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={validateSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.loginText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    /* backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center', */
    width: 303,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#40B59F',
  },
  buttonText: {color: '#ffffff', fontSize: 16, fontWeight: '500'},
  /* {
    color: 'white',
    fontSize: 16,
  }, */
  loginText: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});