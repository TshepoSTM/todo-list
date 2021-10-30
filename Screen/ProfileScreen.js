import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Image,ScrollView,StatusBar,
    TouchableHighlight,SafeAreaView,FlatList,Alert,RadioButton,TextInput} from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {url_key,myApiKey} from '../config/url_key';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignInScreen from "./SignInScreen";

export default class ProfileScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstname:'',
            lastname:'',
            cellphone:'',
            email:'',
            password:'',
            confpassword:'',
            isLoading:false,
            errorMessage:'',
            errorlastname:'',
            errorSurname:'',
            errorEmail:'',
            errorCellphone:'',
            errorPassword:'',
            errorConfpassword:'',
            check:true,
            id:''
            //email:this.props.route.params.email,
        };

    }
    updateInputsVal = (val,prop) =>
    {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        this.setState({errorfirstname:''});
        this.setState({errorlastname:''});
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
    
    _getProfileData()
    {
        fetch(url_key+"/userprofile/"+this.state.id+"",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.id,
                //email:this.props.route.params.email,
                })
            }).then((response)=> response.json())
            .then((data) =>{
                console.log(data);
                this.setState({firstname:data.firstname,lastname:data.lastname,email:data.email});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    UpdateProfile(){
        if(this.state.firstname =='')
        {
            this.setState({errorfirstname:'Enter first name'});
        }       
        if(this.state.lastname =='')
        {
            this.setState({errorSurname:'Enter lastname'});
        }
        if(this.state.email == '')
        {
            this.setState({errorEmail:'Enter email'})
        }
        if(this.state.password != this.state.confpassword)
        {
            this.setState({errorConfpassword:'Passwords does not match'});
        }

        if(this.state.firstname!='' && this.lastname !=''  && this.state.email !='')
        {
            var id = parseInt(this.state.id);

            fetch("http://192.168.43.59:8000/api/updateuserprofile/"+id+"",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                id:this.state.id,
                firstname:this.state.firstname,
                lastname:this.state.lastname,
                email:this.state.email,
                avatar: "tshepo.png",
                })
            }).then((response)=> response.json())
            .then((data) =>{
                console.log(data);
                if(data.code ==200)
                {
                    alert(data.message);
                }
                /*if(data.response)
                {
                    alert(data.response.message);
                }else
                {

                }*/
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
	
	getToken = async() =>{
		try {
			let userToken = await AsyncStorage.getItem('userToken');
			this.setState({ id: userToken });
			console.log('user token',userToken);
			
		} catch (error) {
			console.log(error)
		 }
	 }


    componentDidMount(){
        this.getToken();
		
        this._getProfileData();
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                this._getProfileData();
            }
        );
    }
    render(){ 
        
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor='#E09509' />
                <View>
                    <View style={styles.bodyHeader}>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={{fontSize:25,fontWeight:'bold',color:'#000'}}>My Profile</Text>
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <TextInput style={styles.textInput} placeholder="First Name"
                                autoCapitalize="none"
                                value={this.state.firstname}
                                onChangeText={(val) => this.updateInputsVal(val, 'firstname')}/>
                            <TextInput style={styles.textInput} placeholder="Last Name"  autoCapitalize="none"
                                value={this.state.lastname}
                                onChangeText={(val) => this.updateInputsVal(val, 'lastname')} />
                                
                        </View>
                        <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorfirstname}</Text>
                        <Text style={[styles.texterror,{color:'#1f9c03',}]}>{this.state.errorlastname}</Text>
                        <TextInput style={styles.textInput2} placeholder="Email" 
                            autoCapitalize="none"
                            value={this.state.email}
                            onChangeText={(email) => this.validateEmail(email)}/>
                        <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorEmail}</Text>
                        <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorPassword}</Text>
                        <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorConfpassword}</Text>
                        <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorCellphone}</Text>
                        <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                            <TouchableOpacity style={styles.loginBtn} onPress={()=> this.UpdateProfile()}>
                                <Text style={styles.loginText}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topBar :{
        flexDirection:'row',
        alignItems:"center",
        marginTop:5,
        marginHorizontal:10,
    },
    bodyHeader:{
        paddingHorizontal:15,
        paddingVertical:5,
        marginTop:5,
    }, 
    bodyContainer:{
      paddingHorizontal:15,
      paddingVertical:5,
      marginTop:5,
  },textInput:{
      fontSize:16,
      marginTop:25,
      borderBottomColor:'#302121',
      marginLeft:2,
      borderBottomWidth:1,
      paddingBottom:0,
      paddingVertical:15,
      width:'50%'
    },
    textInput2:{
        fontSize:16,
        marginTop:25,
        borderBottomColor:'#302121',
        marginLeft:2,
        borderBottomWidth:1,
        paddingBottom:0,
        paddingVertical:15,
      },
    loginBtn:{
        width:100,
        backgroundColor:'#302121',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:20
    },
    loginText:{
        color:'#fff', 
        fontSize:16,
        paddingTop:10,
        paddingBottom:10,
        fontWeight:'bold',
        textAlign:'center'
    },
    texterror:{
        fontSize:12,
    }
})