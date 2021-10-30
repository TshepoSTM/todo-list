import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { StyleSheet, Text, View,Button ,TouchableHighlight,TouchableOpacity,TouchableNativeFeedback,ActivityIndicator} from 'react-native';
import {createStackNavigator,withNavigation} from "@react-navigation/stack";
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from "../Screen/HomeScreen";
import EditItemScreen from "../Screen/EditItemScreen";

const myRootStack = createStackNavigator();

export default function RootStackScreen(){

    return(
        <myRootStack.Navigator screenOptions={{ headerMode:'false' }}>
            <myRootStack.Screen name={"Home"} component={HomeScreen}/>
            <myRootStack.Screen name="EditItem" component={EditItemScreen}/>

        </myRootStack.Navigator>
    )
}