import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { StyleSheet,Dimensions ,Text,TextInput, View,Button,TouchableHighlight,FlatList,
        TouchableOpacity,Image,ScrollView,StatusBar,ActivityIndicator,Alert,SafeAreaView,Modal } from 'react-native';
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {url_key,myApiKey} from '../config/url_key';

import { AuthContext } from './Context';

export default class ToDoListScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            myOrder_data:[],
            o_status:'',
            isLoading:true,
            cust_id_fk:'',
            modalVisible: false,
            search_store:'',
            //email:this.props.route.params.email,
        };

    }
    setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
        this.setState({searchStores:[]})
        this.setState({search_store:''})
	}

    getTasks()
    {
        var uid = parseInt(this.state.id);
        
        fetch(url_key+"/getTaskByUser",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                uid:uid,
            
                })
            }).then((response)=> response.json())
            .then((data) =>{
                console.log(data.data);
                this.setState({data:data.data});
                
            })
            .catch((error) => {
                console.log(error);
            })
    }

    isDelete(id)
    {
        alert(id)
        fetch(url_key+"/deleteTask/"+id+"",{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                id:id,
            
                })
            }).then((response)=> response.json())
            .then((data) =>{
                console.log(data);
                //this.setState({data:data.data});
                this.getTasks();
                
            })
            .catch((error) => {
                console.log(error);
        })
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

    renderTaskComponent = (data) =>
    <View style={styles.productsContainer}>
        <TouchableOpacity style={styles.productView} onPress={()=> this.props.navigation.push('EditItem',{id:data.item.id,
            title:data.item.title, description:data.item.description,status:data.item.status,date:data.item.date,uid:data.item.uid})}>
            <View style={styles.productContent}>
                <Text style={{fontSize:14,fontWeight:"bold",paddingHorizontal:10}}>{data.item.title}</Text>
                <Text style={{fontSize:13,fontWeight:"bold",paddingHorizontal:10,color:"#848385"}}>{data.item.description}</Text>
                <Text style={{fontSize:12,fontWeight:"bold",paddingHorizontal:10,color:"#848385"}}>{data.item.date}</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.tickButton}>
            <Icon onPress={() => this.isComplete(data.item.id)} style={styles.tickIcon} name={Platform.OS === "ios" ? "checkmark" : "checkmark"} color="#000" size={30}/>
        </View>
        <View style={styles.deleteButton}>
            <Icon onPress={() => this.isDelete(data.item.id)} style={styles.deleteIcon} name={Platform.OS === "ios" ? "md-trash" : "md-trash"} color="#000" size={30}/>
        </View>
    </View>

    componentDidMount(){
        this.getToken();
        this.getTasks();
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            () => {
                this.getTasks();
            }
        );
    }

    render(){
        const { modalVisible } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#E09509'/>
                <View style={styles.topBar}>
                    <TouchableOpacity style={{width:"15%"}} onPress={()=> this.props.navigation.openDrawer()}>
                        <Icon name={Platform.OS === "ios" ? "md-menu" : "md-menu" } color={"#fff"} size={40} />
                    </TouchableOpacity>
                    <View style={styles.searchInputView}>
                        <TextInput placeholderTextColor={'#fff'} value={this.state.address} style={styles.search_input} keyboardAppearance='light'/>
                    </View>
                    <TouchableOpacity style={{width:"12%"}} onPress={()=> this.props.navigation.navigate('Home')}>
                        <Icon  name={Platform.OS === "ios" ? "md-close" : "md-close" } color={"#fff"} size={40} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <FlatList
						data={this.state.data}
						renderItem={item => this.renderTaskComponent(item)}
						keyExtractor={item => item.id.toString()}
						nestedScrollEnabled={true}
					/> 
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                 this.setModalVisible(!modalVisible);
                            }}
                            >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.topBar}>
                                        <View style={styles.searchInputView2}>
                                            <Text style={{fontSize:20}}>Add To Do</Text>
                                        </View>
                                        <TouchableOpacity style={{backgroundColor:'#b58a16',borderRadius:20}} onPress={() => this.setModalVisible(!modalVisible)}>
                                            <Icon name={Platform.OS === "ios" ? "md-close" : "md-close" } color={'#fff'} size={30} />
                                        </TouchableOpacity>
                                    </View>

                                    <SafeAreaView >
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Title" 
                                                autoCapitalize="none"
                                                value={this.state.title}
                                                onChangeText={(val) => this.updateInputsVal(val, 'title')}/>
                                            <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorTitle}</Text>
                                                    
                                        </View>
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Description" 
                                                autoCapitalize="none"
                                                value={this.state.description}
                                                multiline={true}
                                                onChangeText={(val) => this.updateInputsVal(val, 'description')}/>
                                            <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorDescription}</Text>
                                                    
                                        </View>
                                        <View style={styles.productContent}>
                                            <TextInput style={styles.textInput2} placeholder="Date" 
                                                autoCapitalize="none"
                                                value={this.state.date}
                                                onChangeText={(val) => this.updateInputsVal(val, 'date')}/>
                                            <Text style={[styles.texterror,{color:'#1f9c03'}]}>{this.state.errorDate}</Text>
                                                    
                                        </View>
                                        
                                        <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                                            <TouchableOpacity style={styles.todoBtn} onPress={()=> alert('add')}>
                                                <Text style={styles.todoText}>Add Item</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </SafeAreaView>
                                </View>
                             </View>
                        </Modal>
                        
                </ScrollView>
                <View style={{ marginStart:300, paddingHorizontal:0}}>
                    <TouchableOpacity style={styles.floatingCart} onPress={()=> this.setModalVisible(true)}>
                        <Icon style={styles.CartIcon} name={Platform.OS === "ios" ? "md-add" : "md-add"} color="#fff" size={35}/>
                    </TouchableOpacity>
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
        borderWidth:1,
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
    search_input:{
        color:'#fff',
        fontSize:12,
        paddingLeft:5,
        flex:1,
        fontFamily:'normal',
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
        width:"70%",
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
    deleteButton:{
        width:"15%",
        backgroundColor:'#fff',
        borderColor:'#ebebeb',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
    },
    tickButton:{
        width:"15%",
        backgroundColor:'#fff',
        borderColor:'#ebebeb',
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
    floatingCart:{
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#b58a16',                                    
        position: 'absolute',                                          
        bottom: 5,                                                    
        right:10,
    },    
    CartIcon:{
        paddingHorizontal:10,
        paddingVertical:10,
    },
    deleteIcon:{
        paddingHorizontal:10,
        paddingVertical:10,
    },
    tickIcon:{
        paddingHorizontal:10,
        paddingVertical:10,
    },
    modalHeader:{
        
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
        justifyContent: "center",
        alignItems: "center",
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
      }
});
    