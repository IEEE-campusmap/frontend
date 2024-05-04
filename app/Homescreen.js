import { StyleSheet, Text, View, Dimensions, Pressable, Image, TouchableOpacity } from "react-native"; 
import { Svg, Rect, Circle } from 'react-native-svg';
import {FontAwesome6} from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const BottomSVG = () => (
        <Svg width="55" height="10" viewBox="0 0 55 10" fill="none">
          <Circle cx="5" cy="5" r="5" fill="#000000" />
          <Rect x="13" width="25" height="10" rx="5" fill="#40B59F" />
          <Circle cx="45" cy="5" r="5" fill="#000000" />
        </Svg>);
    return (           
        <View style = {styles.container}>
            <View style = {styles.welcome}>
                <Text style={styles.heading}>Welcome to</Text>
                <Image 
                    source={require('../assets/logo_cropped.png')}
                    style={styles.image} />
            </View>
            <View style = {styles.NavContainer}>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableOpacity>
                    <FontAwesome6 name="angle-right" size={24} color="#40B59F" style={styles.arrow}/>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('signup')}>
                        <Text style={styles.buttonText}>Sign up</Text>
                    </TouchableOpacity>
                    <FontAwesome6 name="angle-right" size={24} color="#40B59F" style={styles.arrow}/>
                </View>
            </View>
            <TouchableOpacity style={styles.customSVG} onPress={() => navigation.navigate('Map')}>
                <BottomSVG/>
            </TouchableOpacity>

            </View>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff' , 
        alignItems: 'center', 
        justifyContent: "space-around",
        flexDirection: 'column', 
        position: 'relative',
    },
    welcome: {
        alignItems: "center",
        justifyContent: 'center',
    },
    heading:{
        fontSize: 39,
        fontWeight: '700',
        marginTop: 40,
        marginLeft: 20,
    },
    NavContainer: {
        position: 'relative', 
        alignItems: 'center', 
        flexDirection: 'column',
        justifyContent: "flex-start",
    },
    button: {
        width: 303,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#40B59F',
        borderStyle: 'solid',
        borderRadius: 15,
        marginBottom: 20,
      },
    buttonText: {color: '#40B59F', fontSize: 23, fontWeight: '700'},
    buttonBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
      },
      arrow: {
        position: 'absolute',
        right: 20,
        top: 18,
      },
    image: {
        width: 390,
        height: 160,
      },
      customSVG: {
        position: 'absolute',
        bottom: 20,
      },
})
export default HomeScreen;