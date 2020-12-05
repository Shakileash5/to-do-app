import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button } from 'react-native';
import { DefaultTheme,IconButton, Colors,RadioButton  } from 'react-native-paper';

function Tasks(){
    const [checked, setChecked] = React.useState('second');
    return (
        <View style={styles.cardView}>
            <RadioButton
                value="first"
                color={Colors.cyan500}
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
                style={{alignItems:"flex-start",color:"red"}}
            />
            <Text key={0} style={styles.item}>thrdvcehjuc</Text>
            
            <IconButton
                icon="delete"
                color={Colors.red500}
                size={20}
                onPress={() => console.log('Pressed')}
                style={{alignItems:"flex-end"}}
            />
        </View>
  );
}

const styles = StyleSheet.create({
    item: {
        color:"white",
        padding:10,
        width:'100%',
        borderRadius:5,
        
      },
      cardView: {
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