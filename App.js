import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button } from 'react-native';
import Tasks from './tasks';

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
      
      <View style={styles.cardView}>
        <Tasks />
      {items.map((data,i)=>{
        //console.log("see",data.id,data.text);
        
        return( 
        <Text key={i} style={styles.item}>{data.text}</Text>
        );
      })}
      </View>
      <Text style={{color:"#2069e0"}}>Complete the tasks!{items.text}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    flexDirection:"Column",
    backgroundColor: '#1E1E1E',
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
  },
  cardView: {
    padding:10,
    width:'90%',
    flexDirection:"Column",
    //backgroundColor: '#2E2E2E',
    borderColor:"grey",
    borderRadius:5,
    marginBottom:5,
  },
  item: {
    color:"white",
    padding:10,
    borderRadius:10,
    backgroundColor: '#2E2E2E',
    borderBottomWidth:2,
    borderBottomColor:"purple",
    marginBottom:5,
  }
});
