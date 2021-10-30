import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { StyleSheet,Dimensions ,Text,TextInput, View,Button,TouchableHighlight,
        TouchableOpacity,Image,ScrollView,StatusBar,ActivityIndicator,Alert,SafeAreaView } from 'react-native';
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';


import ToDoScreen from './ToDoScreen';
import ToDoScreenList from './ToDoListScreen';
import ProfileScreen from './ProfileScreen';

import { AuthContext } from './Context';

const Drawer = createDrawerNavigator();


const myDrawer = createDrawerNavigator();


export default function HomeScreen() {
    const { signOut } = React.useContext(AuthContext);
	const [userToken,setUserToken] = React.useState(null);
	
	 const getToken = async() =>{
		try {
			let userToken = await AsyncStorage.getItem('userToken');
			setUserToken(userToken);
			console.log('user token',userToken);
			
		} catch (error) {
			console.log(error)
		 }
	 }
	
	React.useEffect(()=> {
		getToken();
		/*setTimeout(async()=>{
		  
		  //userId = null
		 //console.log('user token',userId);
		  try {
			let userToken = await AsyncStorage.getItem('userToken');
			setUserToken(userToken);
			console.log('user token',userToken);
		  } catch (error) {
			console.log(error)
		  }
		  
		},0)*/
		
	},[]);
    
    return (
        <myDrawer.Navigator drawerPosition='left' drawerStyle={{width: 250,backgroundColor: '#302121'}} drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout"onPress={()=>{signOut()}} />
              </DrawerContentScrollView>
            )
          }} screenOptions={{
            activeTintColor: '#1f9903',
            itemStyle: { marginVertical: 0 },
            headerShown: false
        
          }} >
            <myDrawer.Screen name='Logo' component={ToDoScreen}  options={{drawerLabel:'',drawerIcon:()=>{return  <Image source={require('../assets/icon.png')} style={{height:180,alignSelf:"center",width:220,margin:0,}} />}}}/>
            <myDrawer.Screen name='To Do List' component={ToDoScreenList} options={{drawerIcon:()=>{return <Icon name={Platform.OS === "ios" ? "ios-reader-sharp" : "md-reader-sharp" } color="#302121" size={30}/>}}} />
            <myDrawer.Screen name='Profile' component={ProfileScreen} options={{drawerIcon:()=>{return <Icon name={Platform.OS === "ios" ? "ios-person-sharp" : "md-person-sharp" } color="#302121" size={30}/>}}} />
          </myDrawer.Navigator>
      );
    }
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
    