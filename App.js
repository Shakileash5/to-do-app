import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button } from 'react-native';

export default function App() {
  const {height,width} = Dimensions.get('window');
  const [focused,setFocused] = useState(0);
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");

  const addItemToList = ()=>{
    let temp = {items:inputText,isCompleted:0};
    //setItems([...items,temp]);
    let list = items
    list.push({id:list.length,text:inputText})
    setItems(list);
    setText('');

  }

  return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!"></TextInput>
        <Button title="Add" onPress={()=>addItemToList()}></Button>
      </View> 
      {items.map((data,i)=>{
        console.log("see",data.id,data.text);
        <Text>{data.text}</Text>
      })}
      <Text style={{color:"#2069e0"}}>Open up App.js to start working on your app!{items.text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    flexDirection:"Column",
    backgroundColor: '#121212',
    alignItems: 'center',
    //justifyContent: 'center',
    color:'#fff',
  },
  addItem: {
    padding:10,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  addText: {
    color: "white",
    width: "100%",
    borderColor: "white",
    borderWidth: 1,
    padding: 10,
    marginRight:10,
  },
  addTextFocused: {
    color: "white",
    width: "100%",
    borderColor: "blue",
    borderWidth: 1,
    padding: 10,
    marginRight:10,
  }
});
