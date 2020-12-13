import React,{Component,useState,useEffect,useRef} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,ScrollView,SafeAreaView } from 'react-native';
import { Colors,ProgressBar  } from 'react-native-paper';


class Category extends Component {

    render() 
    { 
     return(
        <View  style={{flex:2,height:"100%",width:150,marginLeft:20,borderRadius:20,backgroundColor:"#2E2E2E",padding:15}}>
            <View style={{flex:4}}>
                <Text style={{flex:1,color:"grey",paddingTop:0,paddingLeft:10}}>{this.props.todosNo} Tasks</Text>
                <Text style={{flex:1,color:"white",paddingLeft:10,fontWeight:"bold",fontSize:15}}>{this.props.category}</Text>
            </View>
            <View style={{flexGrow:1,paddingLeft:10,paddingTop:15,paddingBottom:10}}>
                <ProgressBar 
                progress={this.props.progress} 
                color={this.props.progress>0.5?(this.props.progress>0.7?Colors.green500:Colors.purple800):(this.props.progress<0.3?Colors.red800:Colors.purple400)} 
                style={{width:100}}></ProgressBar>
            </View>
        </View>
        );
    }
}

export default Category;