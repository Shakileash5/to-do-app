import React,{Component,useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Button,ScrollView,SafeAreaView } from 'react-native';

function SignUp(){

    return(

        <View style={Styles.container}>
            <View style={{alignItems:'center',padding:0,width:"85%"}}>
                <Text style={Styles.logo}>ToDO App</Text>    
                <TextInput style={Styles.inputView} placeholder="Username"></TextInput>
                <TextInput style={Styles.inputView} placeholder="Email Id"></TextInput>
                <TextInput style={Styles.inputView} placeholder="Password"></TextInput>
                <TouchableOpacity style={Styles.signupBtn}>
                    <Text style={{color:"white",fontWeight:"bold"}}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        </View>

    );

}


const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#1E1E1E',
        justifyContent:'center',
        alignItems:'center',
    },
    logo:{
        color:"white",
        fontSize:40,
        fontWeight:"bold",
        marginBottom:30,
    },
    inputView:{
        width:"100%",
        backgroundColor:"#3E3E3E",
        borderRadius:20,
        height:60,
        marginBottom:15,
        color:"white",
        justifyContent:"center",
        padding:20,
        elevation:15,
      },
      signupBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:10,
        elevation:20,
      },
})


export default SignUp;