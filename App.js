import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Maps from "./app/Map";
import LoginScreen from "./app/Log in";
import SignupScreen from "./app/Sign up";
import HomeScreen from "./app/Homescreen";
import UserUpdateScreen from "./app/UserUpdateScreen";
import CustomDrawerContentComponent from './app/Side menu';



const AuthStack = createNativeStackNavigator();
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="welcome">
      <AuthStack.Screen name="welcome" component={HomeScreen} />
      <AuthStack.Screen name="login" component={LoginScreen} />
      <AuthStack.Screen name="signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      drawerContent={CustomDrawerContentComponent}
      drawerActiveBackgroundColor="#3498db"
      >
      {/* <Drawer.Screen name="Home" component={AuthStackNavigator} 
        options={{ swipeEnabled: false, headerShown: false}}/> */}
      {/* <Drawer.Screen name="Map" component={Maps} options={{ swipeEnabled: true}}/> */}
      <Drawer.Screen name="Update" component={UserUpdateScreen} options={{ swipeEnabled: true}}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <DrawerNavigator />

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
