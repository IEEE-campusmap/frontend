import React, {useState} from 'react';
import { View, Text, Modal, Button } from 'react-native';
import UserUpdateScreen from './UserUpdateScreen';


const PopUp = ({ isVisible, onClose, onNavigate}) => {
    const handleNavigate = () => {
        onClose();
        onNavigate(); 
    }
    return (
        <Modal
            animationType = "slide"
            transparent = {true}
            visible = {isVisible}
            onRequestClose = {onClose}
            >
                <View style = {{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <View style = {{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                        <Text>Can you update crowdedness?</Text>
                        <Button title = "No" onPress = {onClose} />
                        <Button title = "Yes" onPress = {handleNavigate}/>
                    </View>
                </View>
            </Modal>
    );
};

export default PopUp;