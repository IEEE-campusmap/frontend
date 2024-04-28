import React from 'react';
import { useState, useEffect, useRef} from 'react'; 
import {Text, View, Button, Platform} from 'react-native'; 
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'; 
import Constants from 'expo-constants'; 

export interface PushNotificationState{
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken; 
}

export const usePushNotifications = (): PushNotificationState => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true, 
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    }); 

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined
    >(); 

    const [notification, setNotification] = useState<
        Notifications.Notification | undefined
    >(); 

    const notificationListerner = useRef<Notifications.Subscription>(); 
    const responselistener = useRef<Notifications.Subscription>(); 

    async function registerForPushNotificationsAsync() {
        let token; 

        if(Device.isDevice){
            const {status: existingStatus} = await Notifications.getPermissionsAsync()

            let finalStatus = existingStatus; 

            if(existingStatus !== "granted"){
                const {status} = await Notifications.requestPermissionsAsync()
                finalStatus = status;
            }
            if(finalStatus !== "granted"){
                alert("Failed to get push token");
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            if(Platform.OS == 'android'){
                Notifications.setNotificationChannelAsync("default", {
                    name: "default", 
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0,250,250,250],
                    lightColor: "#FF231F7C",

                });
            }
            return token; 
        }
        else{
            console.log("ERROR: please use a physical device")
        }
    }

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token); 
        });

        notificationListerner.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

            responselistener.current =
            Notifications.addNotificationResponseReceivedListener((response) =>{
                console.log(response); 
            });

            return() => {
                Notifications.removeNotificationSubscription(
                    notificationListerner.current!
                );

                Notifications.removeNotificationSubscription(
                    responselistener.current!
                );
            };
    }, []);

    return{
        expoPushToken,
        notification,
    };
};



