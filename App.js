import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from './Screen/Context';
import RootStackScreen from './StackScreen/RootStackScreen';
import StarterStackScreen from './StackScreen/StarterStackScreen';

import {url_key,myApiKey} from "./config/url_key";

export default function App() {
  /*const [isLoading,setIsloading] = React.useState(true);
  const [userToken,setUserToken] = React.useState(null);
  const [email, setEmail] = React.useState('');*/

  const initialLoginState = {
    isLoading:null,
    email:null,
    userToken:null,
    userId:null
  }

  const loginReducer = (prevState, action) =>{
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          isLoading: false,
          email:action.id,
          userToken: action.token,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          email:action.id,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          isLoading: false,
          email:action.id,
          userToken: action.token,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer,initialLoginState);


  const authContext = React.useMemo(()=> ({
    signIn: async(email,password) => {

      let userToken;
      userToken =null;

      await fetch(url_key+"/login",{
        method:'post',
        headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            email:email,
            password:password,
            })
      }).then((response)=> response.json())
        .then((data) =>{
            console.log(data);
            //alert(data)

            if(data.code == 501)
            {
              alert(data.message)
              userToken =null;
            }else
            {
              userToken =data.data;
              AsyncStorage.setItem('userToken',JSON.stringify(userToken))
              console.log('user Token',userToken);
              dispatch({type:'LOGIN',id:email,token:userToken});
            }
      })
      .catch((error) => {
          console.log(error);
      })

      
      /*let userToken;
      userToken =null;
      if(email == 'user' && password =='pass')
      {
        //setUserToken('1');
        try{
          userToken ='1'
          await AsyncStorage.setItem('userToken',userToken)
        }catch (error) {
          console.log(error)
        }
      }*/
      //console.log('user token',userToken);
      //dispatch({type:'LOGIN',id:email,token:userToken});
    },
    signOut: async() => {
      /*setUserToken(null);
      setIsloading(false);*/
      try {
        userToken = await AsyncStorage.removeItem('userToken')
      } catch (error) {
        console.log(error)
      }
      dispatch({type:'LOGOUT'});
    },
    SignUp: () => {
      /*setUserToken('1');
      setIsloading(false);*/
    },
  }),[]);

  React.useEffect(()=> {
    setTimeout(async()=>{
      let userToken;
      let userId;
      userToken = null;
      //userId = null
     //console.log('user token',userToken);
      try {
        userToken = await AsyncStorage.getItem('userToken');
        
      } catch (error) {
        console.log(error)
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken});
      //dispatch({type:'REGISTER',id:email,token:userToken});
    },1000)
  },[]);

  if(loginState.isLoading){
    <View>
      <ActivityIndicator size="Large" style={{flex: 1, alignItems: 'center',justifyContent: 'center',}}/>
    </View>
  }

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {
        loginState.userToken  !== null ? (
          <RootStackScreen/>
        ):(
          <StarterStackScreen/>
        )
      }
        
    </NavigationContainer>
    </AuthContext.Provider>
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
