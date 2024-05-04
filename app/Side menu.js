import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialIcons, FontAwesome5, Entypo, FontAwesome, Ionicons, Fontisto} from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';


// Custom Drawer Component
const CustomDrawerContentComponent = (props) => {
    const { navigation } = props
    const state = useNavigationState((state) => state);
    const activeRouteName = state?.routeNames[state?.index];
    return (
      <View style={styles.drawerContent}>
        <DrawerContentScrollView {...props}>
        <View style={styles.topContent}>
          <Text style={styles.userName}>@username</Text>
          {/* <DrawerItemList {...props} /> */}
          <DrawerItem
          label="Map"
          labelStyle={styles.customLabel}
          icon={() => <FontAwesome5 name="map-marked-alt" size={24} color="#40B59F" />}
          style={activeRouteName === "Map" ? styles.activeItem : styles.inactiveItem}
          onPress={() => navigation.navigate("Map")}
        />
          <DrawerItem
          label="Send update"
          labelStyle={styles.customLabel}
          icon={() => <FontAwesome name="send-o" size={24} color="#40B59F" />}
          style={activeRouteName === "Update" ? styles.activeItem : styles.inactiveItem}
          onPress={() => navigation.navigate("Update")}
        />
          <DrawerItem
          label="History"
          labelStyle={styles.customLabel}
          icon={() => <FontAwesome5 name="history" size={24} color="#40B59F" />}
          onPress={() => navigation.navigate("Map")}
        />
          <DrawerItem
          label="Settings"
          labelStyle={styles.customLabel}
          icon={() => <Fontisto name="player-settings" size={26} color="#40B59F" />}
          onPress={() => navigation.navigate("Map")}
        />
        </View>
        <View style={styles.logoutContainer}>
          <DrawerItem
            label="Log out"
            labelStyle={styles.logoutLabel}
            icon={() => <Entypo name="log-out" size={24} color="#40B59F" />}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        </DrawerContentScrollView>
      </View>
    );
  };
  const styles = StyleSheet.create({
    userName: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingHorizontal: 20,
      paddingBottom: 20,
      color: '#352555',
    },
    customLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#352555',
    },
    logoutContainer: {
        marginTop: 430,
    },
    logoutLabel: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#352555',
    },
    drawer: {
      backgroundColor: 'white',
      
    },
    drawerContent: {
      paddingVertical: 20,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
    },
    activeItem: {
        backgroundColor: '#DFF6FD', // Blue background for active item
      },
    inactiveItem: {
        backgroundColor: 'transparent', // Default background for inactive items
      },
  });
    

export default CustomDrawerContentComponent;