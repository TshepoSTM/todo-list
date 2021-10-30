import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button ,TouchableHighlight,TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from '../Screen/SignInScreen';
import SignUpScreen from '../Screen/SignUpScreen';


const myStarterStack = createStackNavigator();

const screenOptionStyle = {
    headerShown:false
}

export default function StarterStackScreen(){
    return(
        <myStarterStack.Navigator screenOptions={{ headerMode:'false' }}>
            <myStarterStack.Screen name={"SignIn"} component={SignInScreen}/>
            <myStarterStack.Screen name={"SignUp"} component={SignUpScreen}/>
        </myStarterStack.Navigator>
    );
}