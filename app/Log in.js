import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Button
} from 'react-native';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const validate = async () => {
        if (!email) {
        Alert.alert('Please Enter Your Email id');
        } else if (!password) {
        Alert.alert('Please Enter Your Password');
        } else {
        login();
     }
  };
    const login = async () => {
        try {
        let res = await fetch('http://localhost:8069/api/login', {
            method: 'POST',                                
            headers: {
            'Content-type': 'application/json',  
        },
            body: JSON.stringify({                         
            params: {
                email: email,               
                password: password,
            },
            }),
        });
      let response = await res.json();
      console.log('response', response);
      if (response.result.success == true) {
        Alert.alert('Login successful!');
      } else {
        Alert.alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error); // Log errors for debugging
      Alert.alert('An error occurred. Please try again.');
    }
  };
    return (
  <View style={styles.container}>
      <Text style={styles.heading}>Sign in</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={d => setEmail(d)}
      />
      <TextInput
        style={[styles.textInput, {marginVertical: 30}]}
        placeholder="Password"
        value={password}
        onChangeText={d => setPassword(d)}
      />
      <TouchableOpacity onPress={() => validate()} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={styles.loginText}>Don't an account? Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    marginBottom: 20,
  },
    container: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,},
    textInput: {
      //from login
      // width: 350,
      // height: 50,
      // padding: 5,
      // borderRadius: 10,
      // borderWidth: 1,
      // borderColor: 'grey',
      width: '100%',
      height: 60,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    loginButton: {
      width: 303,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#40B59F',
    },
    loginButtonText: {color: '#ffffff', fontSize: 16, fontWeight: '500'},
    loginText: {
      marginTop: 20,
      textDecorationLine: 'underline',
    }
  });
  export default Login;