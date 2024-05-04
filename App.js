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
      // drawerStyle={styles.drawer}
      // drawerContentStyle={styles.drawerContent} 
      >
      <Drawer.Screen name="Map" component={Maps} options={{ swipeEnabled: true}}/>
      <Drawer.Screen name="Update" component={UserUpdateScreen} options={{ swipeEnabled: true}}/>
      <Drawer.Screen name="Home" component={AuthStackNavigator} 
        options={{ swipeEnabled: false, headerShown: false}}/>
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
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#352555',
  },
  logoutContainer: {
    marginTop: 200,
  },
  logoutLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#352555',
  },
});
