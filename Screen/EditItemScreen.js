import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { StyleSheet,Dimensions ,Text,TextInput, View,Button,TouchableHighlight,Modal,
        TouchableOpacity,Image,ScrollView,StatusBar,ActivityIndicator,Alert,SafeAreaView, TouchableOpacityBase } from 'react-native';
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import {url_key,myApiKey} from '../config/url_key';

import ToDoListScreen from './ToDoListScreen';

import { AuthContext } from './Context';

export default class EditItemScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            o_status:'',
            isLoading:true,
            modalVisible: false,
            search_store:'',
            title:'',
            description:'',
            date:'',
            id:this.props.route.params.id,
            title:this.props.route.params.title,
            description:this.props.route.params.description,
            date:this.props.route.params.date,
            uid:this.props.route.params.uid,
            status:this.props.route.status,
            errorTitle:'',
            errorDescription:'',
            errorDate:'',
            isDatePickerVisible:false,
            setDatePickerVisibility:false,
            //email:this.props.route.params.email,
        };

    }

    updateInputsVal = (val,prop) =>
    {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
        this.setState({errorTitle:''});
        this.setState({errorDescription:''});
        this.setState({errorDate:''});
    }
    showDatePicker = () => {
        this.setState({isDatePickerVisible:true})
    };
    
    hideDatePicker = () => {
        this.setState({isDatePickerVisible:false})

    };
    
    handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        this.setState({date:date})
        console.log(this.state.date)
        this.hideDatePicker();
    };

    updateTask()
    {
        if(this.state.title =='')
        {
            this.setState({errorTitle:'Enter title'});
        }       
        if(this.state.description =='')
        {
            this.setState({errorDescription:'Enter description'});
        }
        if(this.state.date == '' || this.state.date ==undefined)
        {
            this.setState({errorDate:'Enter date'})
        }
        if(this.state.title!='' && this.description !=''  && this.state.date !='')
        {
            var id = parseInt(this.state.id);
 
            fetch(url_key+"/updateTask/"+id+"",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                title:this.state.title,
                description:this.state.description,
                status:0,
                date:this.state.date,
                uid:this.state.uid
                })
            }).then((response)=> response.json())
            .then((data) =>{
                console.log(data);

                if(data.code ==200)
                {
                    alert(data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
    }

    componentDidMount()
    {
        this.handleConfirm()
    }

    render(){
        console.log(this.props.route.params)
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={{width:"15%"}} onPress={()=> this.props.navigation.goBack()}>
                        <Icon name={Platform.OS === "ios" ? "ios-arrow-back-circle" : "md-arrow-back-circle" } color={"#fff"} size={40} />
                    </TouchableOpacity>
                    <View style={styles.searchInputView}>
                        <TextInput placeholderTextColor={'#fff'} value={this.state.address} style={styles.search_input} editable={false} keyboardAppearance='light'/>
                    </View>
                    <TouchableOpacity style={{width:"12%"}} onPress={()=> this.props.navigation.navigate('To Do List')}>
                        <Icon  name={Platform.OS === "ios" ? "md-search" : "md-search" } color={"#fff"} size={35} />
                    </TouchableOpacity>
                </View>
                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.topBar}>
                                        <View style={styles.searchInputView2}>
                                            <Text style={{fontSize:20}}>Edit To Do Item</Text>
                                        </View>
                                        <TouchableOpacity style={{backgroundColor:'#b58a16',borderRadius:20}}>
                                            
                                        </TouchableOpacity>
                                    </View>

                                    <SafeAreaView >
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Title" 
                                                autoCapitalize="none"
                                                value={this.state.title}
                                                onChangeText={(val) => this.updateInputsVal(val, 'title')}/>
                                            <Text style={[styles.texterror,{color:'#000'}]}>{this.state.errorTitle}</Text>
                                                    
                                        </View>
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Description" 
                                                autoCapitalize="none"
                                                value={this.state.description}
                                                multiline={true}
                                                onChangeText={(val) => this.updateInputsVal(val, 'description')}/>
                                            <Text style={[styles.texterror,{color:'#000'}]}>{this.state.errorDescription}</Text>
                                                    
                                        </View>
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Date" 
                                                autoCapitalize="none"
                                                value={this.state.date}
                                                onChangeText={(val) => this.updateInputsVal(val, 'date')}/>
                                            <Text style={[styles.texterror,{color:'#000'}]}>{this.state.errorDate}</Text>
                                                    
                                        </View>
                                        <View style={styles.productContent}>
                                            <Button title="Show Date Picker" onPress={this.showDatePicker} />
                                            <DateTimePickerModal
                                                isVisible={this.state.isDatePickerVisible}
                                                mode="date"
                                                onConfirm={this.handleConfirm}
                                                onCancel={this.hideDatePicker}
                                            />
                                            
                                        </View>
                                        
                                        
                                        <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                                            <TouchableOpacity style={styles.todoBtn} onPress={()=> this.updateTask()}>
                                                <Text style={styles.todoText}>Update</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </SafeAreaView>
                                </View>
                             </View>
            </SafeAreaView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#302121',
    },
    topBar :{
        flexDirection:'row',
        alignItems:"center",
        marginTop:10,
        marginHorizontal:5,
    },
    bodyHeader:{
        paddingHorizontal:15,
        paddingVertical:5,
        marginTop:10,
    },
    searchInputView:{
        flexDirection:"row",
        width:"75%",
        alignItems:'center',
        borderColor:'#ebebeb',
        height:40,
        paddingRight:10,
        borderRadius:25,
    },
    searchInputView2:{
        flexDirection:"row",
        width:"90%",
        alignItems:'center',
        height:40,
        paddingRight:10,
    },
    productsContainer:{
        flexDirection:"row",
        marginHorizontal:10,
        marginTop:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#ebebeb',
    },
    productView:{
        width:"100%",
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#ebebeb',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
    },
    productContent:{
        marginTop:10,
        marginBottom:10,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        margin: 0
        },
        centeredView: {
        flex: 1,
        marginTop: 10
        },
        modalView: {
            margin: 0,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
                },
                 shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
      }, 
      textInput2:{
        fontSize:16,
        marginTop:20,
        borderBottomColor:'#302121',
        marginLeft:2,
        borderBottomWidth:1,
        paddingBottom:0,
        paddingVertical:15,
      },
      texterror:{
          fontSize:12,
      },
      todoBtn:{
        width:100,
        backgroundColor:'#302121',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
        marginTop:20
    },
    todoText:{
        color:'#fff', 
        fontSize:16,
        paddingTop:10,
        paddingBottom:10,
        fontWeight:'bold',
        textAlign:'center'
    },

})