import React,{Component} from 'react';
import { StyleSheet,Dimensions ,Text,TextInput, View,Button,TouchableHighlight,
        TouchableOpacity,Image,ScrollView,StatusBar,ActivityIndicator,Alert,SafeAreaView } from 'react-native';
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Context';
import {url_key,myApiKey} from "../config/url_key";

export default function SignInScreen({navigation}) {
    /*const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');*/
    const [errorMessage, setErrorMessage] = React.useState('');

    const[data,setData] = React.useState({
        email:'',
        password:'',
        check_textInputChange:false,
    });

    const handleEmailChange = (val) =>{
        setData({
            ...data,
            email:val,
            errorMessage:'',
        })
        setErrorMessage('');
    }
    
    const handlePasswordChange = (val) =>{
        setData({
            ...data,
            password:val,
            errorMessage:'',
        })
        setErrorMessage('');
    }
  
    const { signIn } = React.useContext(AuthContext);

    const userLogin =(email,password) =>{

        if(data.email =='')
        {
            //this.setState({errorEmail:'Enter email'});
            setErrorMessage('Enter email')
            
        }
        if(data.password =='')
        {
            //this.setState({errorPassword:'Enter password'})
            setErrorMessage('Enter password')
        }
        if(data.email !='' && data.password!='')
        {
            signIn(data.email,data.password);
        }
    }
  
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#E09509'/>
            <View style={styles.header}>
                <Text style={styles.text_header}></Text>
                <Image style={styles.tinyLogo} source={require('../assets/icon.png')} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <TextInput placeholder={"Your Email"} 
                        autoCapitalize="none"
                        value={data.email}
                        onChangeText={(val) => handleEmailChange(val)}
                        style={styles.text_input}
                    />
                    
                    <Text></Text>
                </View>
                <Text style={[styles.text_footer,{marginTop:25}]}>Password</Text>
                <View style={styles.action}>
                    <TextInput placeholder={"Your Password"}
                        value={data.password}
                        onChangeText={(val) => handlePasswordChange(val)}
                        secureTextEntry={true}  
                        style={styles.text_input}
                    />
                    
                </View>
                <Text style={[styles.texterror,{color:'#302121'}]}>{errorMessage}</Text>
                <View style={styles.textSignIn}>
                <TouchableOpacity onPress={() => {userLogin(data.email,data.password)}} style={[styles.signIn,{borderColor:'',borderWidth:1,
                                            marginTop:25,backgroundColor:'#302121'}]}>
                        <Text style={[styles.textSign,{color:'#fff'}]}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=> navigation.navigate('SignUp')} style={[styles.signIn,{borderColor:'#E09509',
                                                borderWidth:1,marginTop:25}]}>
                        <Text style={[styles.textSign,{color:'#302121'}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textSignIn}>
                    <TouchableOpacity style={styles.signIn} onPress={()=> alert('')}>
                        <Text style={[styles.textForgotPass,{color:'#302121'}]}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#302121',
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#302121',
        paddingHorizontal:5,
        paddingBottom:10,
    },
    footer:{
        flex:2,
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:20,
        paddingVertical:30,
        paddingHorizontal:20,
        paddingBottom:-20
    },
    text_header:{
        color:'#E09509',
        fontWeight:'bold',
        fontSize:30,
    },
    text_footer:{
        fontSize:18,
        color:'black',
    },
    action:{
        flexDirection:'row',
        marginTop:0,
        borderBottomWidth:1,
        borderBottomColor:'#d9d4d9',
        paddingBottom:0,
    },
    text_input:{
        flex:1,
        paddingLeft:10,
        color:'#000',
        fontSize:18
    },
    title:{
        color:'#561b6e',
        fontWeight:'bold',
        fontSize:25,
    },
    text:{
        color:'black',
        marginTop:5,
    },
    button:{
        alignItems:'center',
        marginTop:20,
    },
    signIn:{
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold'
    },
    textForgotPass:{
        fontSize:12,
    },
    texterror:{
        fontSize:12,
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },
  });