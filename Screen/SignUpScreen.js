import 'react-native-gesture-handler';
import React,{Component} from 'react';
import {StyleSheet,Dimensions ,Text,TextInput, View,Button,TouchableHighlight,
        TouchableOpacity,Image,ScrollView,StatusBar ,ActivityIndicator,Alert} from 'react-native';

import SignInScreen from './SignInScreen';

import {url_key,myApiKey} from '../config/url_key';
        
export default class SignUpScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstname:'',
            surname:'',
            cellphone:'',
            email:'',
            password:'',
            confpassword:'',
            isLoading:false,
            errorMessage:'',
            errorfirstname:'',
            errorSurname:'',
            errorEmail:'',
            errorCellphone:'',
            errorPassword:'',
            errorConfpassword:'',
            expoPushToken:'',
        }
    }
    updateInputsVal = (val,prop) =>
    {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        this.setState({errorfirstname:''});
        this.setState({errorSurname:''});
        this.setState({errorEmail:''});
        this.setState({errorPassword:''});
    }
    validateEmail = (email) =>
    {
        //console.log(email);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
        if (reg.test(email) === false) {
          //console.log("Email is Not Correct");
          this.setState({errorEmail:'Your email is Invalid '});
          this.setState({ email: email });
          return false;
        }
        else {
          this.setState({ email: email })
          console.log("Email is Correct");
          this.setState({errorEmail:'Email is correct'});
          
        }
        
    }

    registerUser()
    {
        if(this.state.firstname =='')
        {
            this.setState({errorfirstname:'Enter first name'});
        }       
        if(this.state.surname =='')
        {
            this.setState({errorSurname:'Enter surname'});
        }
        
        if(this.state.email == '')
        {
            this.setState({errorEmail:'Enter email'})
        }
        if(this.state.password =='')
        {
            this.setState({errorPassword:'Enter password'});
        }
        if(this.state.password != this.state.confpassword)
        {
            this.setState({errorConfpassword:'Passwords does not match'});
            return;
        }

        if(this.state.firstname!='' && this.surname !='' && this.state.email !='' && this.state.password)
        {

            fetch(url_key+"/adduserprofile",{
                method:'post',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
                },
                body:JSON.stringify({
                    firstname:this.state.firstname,
                    lastname:this.state.surname,
                    email:this.state.email,
                    password:this.state.password,
                    avatar:'tshepo.png',
                    })
                }).then((response)=> response.json())
                .then((data) =>{
                    console.log(data);
                    if(data.code ==200)
                    {
                        alert(data.message);

                        this.setState({
                            firstname:'',
                            surname:'',
                            email:'',
                            password:'',
                            confpassword:'',
                        })
                        
                        this.props.navigation.navigate('SignIn');
                    }
                   

                })
                .catch((error) => {
                    console.log(error);
                })
            
        }
    }

    componentDidMount(){

        //this.registerForPushNotificationsAsync();
    }
    render(){

        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#E09509' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Sign Up</Text>
                </View>
                <View style={styles.footer}>
                <Text style={[styles.text_footer,{marginTop:0}]}>First Name</Text>
                    <View style={styles.action}>
                        <TextInput placeholder={""} 
                             autoCapitalize="none"
                             value={this.state.firstname}
                             onChangeText={(val) => this.updateInputsVal(val, 'firstname')}
                             style={styles.text_input}
                        />
                        <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorfirstname}</Text>
                    </View>
                    <Text style={[styles.text_footer,{marginTop:15}]}>Surname</Text>
                    <View style={styles.action}>
                        <TextInput placeholder={""} 
                            autoCapitalize="none"
                            value={this.state.surname}
                            onChangeText={(val) => this.updateInputsVal(val, 'surname')}
                            style={styles.text_input}
                        />
                        <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorSurname}</Text>
                    </View>
                    <Text style={[styles.text_footer,{marginTop:15}]}>Email</Text>
                    <View style={styles.action}>
                        <TextInput placeholder={""}
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(email) => this.validateEmail(email)}
                            style={styles.text_input}
                        />
                        <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorEmail}</Text>
                    </View>
                    <Text style={[styles.text_footer,{marginTop:15}]}>Password</Text>
                    <View style={styles.action}>
                        <TextInput placeholder={""}
                            secureTextEntry={true}  
                            autoCapitalize="none"
                            value={this.state.password}
                            onChangeText={(val) => this.updateInputsVal(val, 'password')}
                            style={styles.text_input}
                        />
                        <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorPassword}</Text>
                    </View>
                    <Text style={[styles.text_footer,{marginTop:25}]}>Corfirm Password</Text>
                    <View style={styles.action}>
                        <TextInput placeholder={""}
                         secureTextEntry={true}
                         autoCapitalize="none"
                         value={this.state.confpassword}
                         onChangeText={(val) => this.updateInputsVal(val, 'confpassword')}   
                         style={styles.text_input}
                        />
                        <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorConfpassword}</Text>
                    </View>     
                    <Text style={[styles.texterror,{color:'#302121'}]}>{this.state.errorMessage}</Text>              
                    <View style={styles.textSignIn}>
                        <TouchableOpacity onPress={() => this.registerUser()} style={[styles.signIn,{borderColor:'#E09509',borderWidth:1,
                                                    marginTop:20,backgroundColor:'#E09509'}]}>
                                <Text style={[styles.textSign,{color:'#fff'}]}>Sign Up</Text>
                        </TouchableOpacity>
                    <View style={styles.textSignIn}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignIn')} style={styles.signIn}>
                            <Text style={[styles.textForgotPass,{color:'#302121'},{marginTop:20}]}> Already Registered? Click here to login</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#302121',
    },
    header:{
        flex:1,
        justifyContent:'flex-end',
        backgroundColor:'#302121',
        paddingHorizontal:20,
        paddingBottom:30,
    },
    footer:{
        flex:8,
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:20,
        paddingHorizontal:30,
        paddingVertical:20,
    },
    text_header:{
        color:'#fff',
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
        fontSize:18,
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
        fontSize:10,
    }
  });