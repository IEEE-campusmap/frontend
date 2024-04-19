import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
const HomeScreen = ({navigation}) => {
    return (
    <> 
      <Button
        title="Map"
        onPress={() =>
          navigation.navigate('map')
        }
      />

      <Button
        title="UpdateScreen"
        onPress={() =>
          navigation.navigate('screen')
        }
      />
    </>
    );
  };
const ProfileScreen = ({navigation, route}) => {
return <Text>This is {route.params.name}'s profile</Text>;
};

export default HomeScreen;