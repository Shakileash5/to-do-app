import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View,TextInput,Dimensions,Button } from 'react-native';
import { DefaultTheme,IconButton, Colors,RadioButton  } from 'react-native-paper';
import Tasks from './tasks';

export default function App() {
  const {height,width} = Dimensions.get('window');
  const [focused,setFocused] = useState(0);
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");
  const [checked, setChecked] = React.useState('second');
  
  const addItemToList = ()=>{
    //setItems([...items,temp]);
    let list = items
    list.push({id:list.length,text:inputText,isCompleted:0})
    setItems(list);
    setText('');

  }

  const removeItemFromList = (id)=>{
    let list = [...items];
    console.log(list,id);
    if(list.length == 1 ){
      list = [];
    }
    else{
      list.splice(id,1);
    }
    setItems(list);
  }

  const taskCompleted = (id)=>{

    let list = [...items];
    let holdElement = {};
  
    list[id].isCompleted = 1;
    holdElement = list[id];
    if(list.length == 1 ){
      list = [];
    }
    else{
      list.splice(id,1);
    }
    list.push(holdElement)
    setItems(list);

  }



   return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!"></TextInput>
        <Button title="Add" onPress={()=>addItemToList()}></Button>
      </View> 
      
      <View style={styles.cardView}>
      {items.map((data,i)=>{
        //console.log("see",data.id,data.text);
        
        return( 
        //<Text key={i} style={styles.item}>{data.text}</Text>
          <View style={data.isCompleted == 0 ?styles.itemView:styles.itemViewCompleted}>
              <RadioButton
                  value="first"
                  color={Colors.cyan500}
                  status={ data.isCompleted == 1 ? 'checked' : 'unchecked' }
                  onPress={() => {taskCompleted(data.id);setChecked('first');}}
                  style={{alignItems:"flex-start",color:"red"}}
                  key={1000+i}
              />
              <Text key={data.id} style={data.isCompleted == 0 ?styles.item:styles.itemCompleted}>{data.text}</Text>
              
              <IconButton
                  icon="delete"
                  color={Colors.red500}
                  size={20}
                  onPress={() => {removeItemFromList(data.id);console.log('Pressed');}}
                  style={{alignItems:"flex-end"}}
                  key={i+2000}
              />
          </View>
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
    width:'100%',
    borderRadius:10,
    marginBottom:5,
  },
  itemView: {
    padding:0,
    width:'100%',
    flexDirection:"row",
    backgroundColor: '#2E2E2E',
    borderBottomWidth:2,
    borderBottomColor:"purple",
    borderColor:"grey",
    borderRadius:10,
    marginBottom:5,
  },
  itemCompleted: {
    color:"grey",
    textDecorationLine: 'line-through',
    padding:10,
    width:'100%',
    borderRadius:10,
    marginBottom:5,
  },
  itemViewCompleted: {
    padding:0,
    width:'100%',
    flexDirection:"row",
    backgroundColor: '#2E2E2E',
    borderBottomWidth:2,
    borderBottomColor:"green",
    borderColor:"grey",
    borderRadius:10,
    marginBottom:5,
  },
});
