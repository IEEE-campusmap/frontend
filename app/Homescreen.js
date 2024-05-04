import { StyleSheet, Text, View, Dimensions, Button, Pressable, Image } from "react-native"; 
import Icon from "react-native-ico-material-design";
import { StatusBar } from "expo-status-bar";
import Maps from './Map';  
import PopUp from "./PopUp";
import React, { useState, useEffect} from 'react';

const HomeScreen = ({navigation}) => {
    var iconHeight = 26;
    var iconWidth = 26;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
    useEffect(() => {
        setIsPopupVisible(true);
    }, []);

    const handleOpenPopUp = () => {
        setIsPopupVisible(true);
    };
    const handleClosePopUp = () => {
        setIsPopupVisible(false);
    };
    return (
        <>             
            {/* <Button
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
            /> */}
            
            <View style = {styles.container}> 
                <View>
                    {/* <Text style={{fontSize:30, color: 'white'}}>smt</Text>
                    <StatusBar style="light" /> */}  
                    {/* <Stack.Screen name="map" component={Maps} />  */}
                    <Image style={{width: screenWidth, height: screenHeight}} source={require('../assets/CS.png')} resizeMode="contain"/>
                </View>

                <View style = {styles.NavContainer}>
                    <View style ={styles.NavBar}>
                        <Pressable onPress={() => navigation.navigate('map')} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}}>
                            <Icon name="favorite-heart-button" height={iconHeight} width={iconWidth} color='#fbf5f3'/>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('screen')} style={styles.IconBehave} android_ripple={{borderless:true, radius:50}}>
                            <Icon name="chat-bubble" height={iconHeight} width={iconWidth} color='#fbf5f3'/>
                        </Pressable> 
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
                <PopUp isVisible={isPopupVisible} onClose={handleClosePopUp} onNavigate={() => navigation.navigate('screen')} />
            </View>
        </>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbf5f3' , 
        alignItems: 'center', 
        justifyContent: "center", 
    },
    NavContainer: {
        position: 'absolute', 
        alignItems: 'center', 
        bottom: 20,
    },
    NavBar: {
        flexDirection: 'row', 
        backgroundColor: '#000022', 
        width: '90%', 
        justifyContent: 'space-evenly', 
        borderRadius: 40
    },
    IconBehave: {
        padding: 14
    },
})
export default HomeScreen;