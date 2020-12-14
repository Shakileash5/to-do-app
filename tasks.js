import { StatusBar } from 'expo-status-bar';
import React,{useState,Component} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,TouchableOpacity } from 'react-native';
import { DefaultTheme,IconButton, Colors,RadioButton  } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';

class Tasks extends Component{
    constructor(props){
        super(props)
        this.state = {
            modalVisible: false,
        }
    }
    
    setDummy = (val)=>{
        this.setState( { modalVisible:val})
    }

    onClose1 = () => {this.setDummy(false);}
    render(){return (
        <View style={styles.itemView}>
            
            
            
        <Overlay visible={this.state.modalVisible} onClose={this.onClose1()}  closeOnTouchOutside>
         <TouchableOpacity onPress={console.log("oi")}>
          <Text>Some Modal Content</Text>
          </TouchableOpacity> 
        </Overlay>
        <Button title="th" onPress={()=>{this.setDummy(true)}}>ok</Button>
        </View>
  );}
}

const styles = StyleSheet.create({
    item: {
        
        color:"white",
        padding:10,
        width:'100%',
        borderRadius:5,
        
      },
      itemView: {
        flex:1,
        padding:0,
        width:'100%',
        flexDirection:"row",
        backgroundColor: '#2E2E2E',
        borderBottomWidth:2,
        borderBottomColor:"purple",
        borderColor:"grey",
        borderRadius:10,
        marginBottom:5,
      }
});

export default Tasks;