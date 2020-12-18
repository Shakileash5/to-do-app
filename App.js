import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,TextInput,ScrollView,TouchableOpacity} from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
import Category from './category';

export default function App() {
  const [constructorHasRun,setConstructorHasRun] = useState(false);
  const [userName,setUserName] = useState("Pal");
  const [showChangeUName,setShowChangeUName] = useState(0);
  const [focused,setFocused] = useState(0);
  const [todos,setTodos] = useState({"Personal":[]});
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");
  const [inputCategory,setCategory] = useState("");
  const [currentCategory,setCurrentCategory] = useState("Personal");
  const [show, setShow] = useState(0);

  var got = false;
  const setGot = (bool)=>{
    got = bool;
  }

  const storeData = async ()=>{
    try{
      let JsonObj = JSON.stringify(todos);
      await AsyncStorage.setItem("todos",JsonObj);
    }
    catch(error){
      console.log(error);
    }
  }

  const storeUserName = async () =>{
    try{
      setUserName(inputText);
      await AsyncStorage.setItem("userName",inputText);
      setText("");
    }
    catch(error){
      console.log(error);
    }
  }

  const retrieveData = async ()=>{
    try{

      let obj = await AsyncStorage.getItem("todos");
      let uname = await AsyncStorage.getItem("userName"); 

      if(obj!=null){
        obj = JSON.parse(obj);
        setCurrentCategory("Personal");
        setTodos(obj);;
        setItems(obj["Personal"]);
      }
      else{
        console.log("No data");
      } 

      if(uname!=null){
        setUserName(uname);
      }  
      else{
        setShowChangeUName(1);
      }

    }
    catch(error){
      console.log(error);
    }
  }

  const set_currentCategory = (Category)=>{
    for(var key in todos){   
      if(Category.toLowerCase()==key.toLowerCase()){
          setItems(todos[key]);
          setCurrentCategory(key);
      }
    }
  } 

  const getCompletedPercent = (Category)=>{
    var count = 0;
    var len = 0;
    for(var key in todos){
      
      if(Category.toLowerCase()==key.toLowerCase()){
          len = todos[key].length;
          todos[key].map((data)=>{
            
            if(data.isCompleted == 1){
              count+=1;
            }

          });
      }
    }
    return count/len;
  }

  const addItemToList = (state)=>{ 
    let listFull = todos;
    let flag = 0;
    for(var key in listFull){
      if(inputCategory.toLowerCase()==key.toLowerCase()){
        listFull[key].unshift({id:listFull[key].length,text:inputText,isCompleted:0});
        setItems(listFull[key]);
        flag=1;
      }
    }

    if(flag==0){
      let text = inputCategory[0].toUpperCase()  + inputCategory.slice(1).toLowerCase();
      listFull[text] = [{id:0,text:inputText,isCompleted:0}]
    }
    storeData();
    setTodos(listFull);  
    setCurrentCategory(inputCategory);
    setText('');
    if(state==0){
      setShow(0);
    }

  }

  const removeItemFromList = (id)=>{
    let listFull = todos;
    for(var key in listFull){
      if(currentCategory.toLowerCase()==key.toLowerCase()){
        let list = [...listFull[key]];
        list.splice(id,1);
        listFull[key] = [...list];
        if(list.length==0){
          if(key.toLowerCase()!="personal"){
            delete listFull[key];
           
          }
          setCurrentCategory("Personal");
          setItems([]);
        }
        else{
          setItems(listFull[key]);
        }
        setTodos(listFull);
        storeData();
      }
    }
  }

  const taskCompleted = (id)=>{

    let listFull = todos
    for(var key in listFull){
      if(currentCategory.toLowerCase()==key.toLowerCase()){
        let list = [...listFull[key]];
        let holdElement = {};
        list[id].isCompleted = 1;
        holdElement = list[id];
        list.splice(id,1);
        list.push(holdElement);
        listFull[key] = [...list];
        setTodos(listFull);
        setItems(listFull[key]);
        storeData();
      }
    }

  }

  useEffect(()=>{
    set_currentCategory(currentCategory);
  },[currentCategory])

  const checkIsInside = (state)=>{
    if(got==true){
      setGot(false);
    }
    else{
      setGot(false);
      if(state==0){
      setShowChangeUName(0)
      }
      else{
        setShow(0);
      }
    }
  }

  const setUname = ()=>{
    setUserName(inputText);
    storeUserName();
    setShowChangeUName(0);
  }

  const constructor = ()=>{
    if(constructorHasRun){
        return;
    }
    retrieveData();
    setConstructorHasRun(true);
  }
  constructor();


   return (
     
    <View style={styles.container} > 
        <View style={{top:0,marginTop:0,margin:-10,backgroundColor:"#161B22",height:45,flexDirection:"row",}}>
          <Text style={{alignSelf:"flex-start",color:"#6E7681",fontWeight:"bold",fontSize:15,padding:10}}>{currentCategory}</Text>
          <IconButton
          icon="account"
          color={Colors.blue300}
          style={{alignSelf:"flex-end",right:0,position:"absolute",top:0}}
          onPress={()=>{setShowChangeUName(1);setShow(0);}}
          >
          </IconButton>
        </View>
        <View style={showChangeUName==1?styles.getItemsCardView:{display:"none"}} onStartShouldSetResponder={() =>{checkIsInside(0)}}>
          <View style={showChangeUName==1?styles.getItemsCard:{display:"none"}} onStartShouldSetResponder={() =>{setGot(true);}} >
                  <Text style={{color:"white",fontWeight:"bold",padding:10,}}>Change your Username</Text>
                  <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText}  onBlur={()=>setFocused(0)} placeholder="Enter your username .." placeholderTextColor="grey"></TextInput>
                  <View style={{alignSelf:"flex-end",padding:0}} >
                    <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText=="")?null:setUname()}} >
                      <Text style={(inputText!="")?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Change</Text>
                    </TouchableOpacity>
                  </View>
          </View>
        </View>
        <Text style={{color:"white",fontWeight:"bold",fontSize:25,paddingBottom:30,paddingTop:30}}>What's up,{userName}</Text>
        <Text style={{color:"white",fontWeight:"bold",alignSelf:"flex-start"}}>Todo's Category </Text>
        <View style={{padding:5,height:125}}>
              <ScrollView horizontal={true} contentContainerStyle={{flexGrow:1}} style={{padding:5,}} showsHorizontalScrollIndicator={false}>
               {
                  Object.keys(todos).map(function(key,i){
                  return (
                    <TouchableOpacity style={{marginRight:0,flexGrow: 1}} key={i} onPress={()=>set_currentCategory(key)}>
                      <Category todosNo={todos[key].length} category={key} progress={getCompletedPercent(key)} />
                    </TouchableOpacity>
                    ); 
                  })
                }
              </ScrollView>
        </View>  
        
        <Text style={{color:"white",fontWeight:"bold",alignSelf:"flex-start"}}>Todo's list</Text>
        
        <IconButton 
          icon="pencil" 
          color={Colors.green500} 
          style={{alignSelf:"flex-end",position:'absolute',zIndex:1,bottom:10,}}  
          onPress={()=>{setShow(1);setShowChangeUName(0);}}
          size={40}>
          
        </IconButton>
        <View style={show==1?styles.getItemsCardView:{display:"none"}} onStartShouldSetResponder={() =>{checkIsInside(1);}}>
          <View style={show==1?styles.getItemsCard:{display:"none"}} onStartShouldSetResponder={()=>{setGot(true);}} >    
                  <Text style={{color:"white",fontWeight:"bold",padding:10,}}>Add an item</Text>
                  <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setCategory(text);}} onFocus={()=>setFocused(1)} value={inputCategory} onBlur={()=>setFocused(0)} placeholder="Enter the category" placeholderTextColor="grey"></TextInput>
                  <View style={{flexDirection:"row",width:"100%"}}>
                    <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} width="90%" onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!" placeholderTextColor="grey" ></TextInput>
                    <IconButton
                      icon="plus"
                      color={Colors.blue300}
                      style={{alignSelf:"flex-end",right:"5%",bottom:"5%",position:"absolute"}}
                      onPress={()=>{(inputText&&inputCategory)?addItemToList(1):null;}}
                    >
                    </IconButton>
                  </View>
                  <View style={{alignSelf:"flex-end",padding:0}}>
                    
                    <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText&&inputCategory)?addItemToList(0):null;}} >
                    
                      <Text style={(inputText&&inputCategory)?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Add</Text>
                    </TouchableOpacity>
                  </View>
          </View>
        </View>
        <ScrollView style={styles.cardView} > 
          {
            items.map((data,i)=>{
            return( 
              <View key ={i} style={data.isCompleted == 0 ?styles.itemView:styles.itemViewCompleted}>
                  <RadioButton
                      value="first"
                      color={Colors.cyan500}
                      uncheckedColor={Colors.purple800}
                      status={ data.isCompleted == 1 ? 'checked' : 'unchecked' }
                      onPress={() => {taskCompleted(i);}}
                      style={{alignItems:"flex-start",color:"red"}}
                      key={1000+i}
                  />
                  <Text key={data.id} numberOfLines={1} style={data.isCompleted == 0 ?styles.item:styles.itemCompleted}>{data.text}</Text>
                  <IconButton
                      icon="delete"
                      color={Colors.red500}
                      size={20}
                      onPress={() => {removeItemFromList(i);}}
                      style={{alignItems:"flex-end"}}
                      key={i+2000}
                  />
              </View>
            );
        })}    
      </ScrollView>
      <StatusBar style="inverted" hidden={false} />
      
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    paddingTop: Constants.statusBarHeight,
    flexDirection:"column",
    backgroundColor: '#0D1117', 
    zIndex:0,
    color:'#fff',
  },
  addItem: {
    padding:10,
    flexDirection:"column",
    justifyContent:"space-between",
  },
  addText: {
    color: "white",
    width: "90%",
    borderColor: "#fb5b5a",
    borderBottomWidth: 3,
    padding:10,
    marginRight:10,
    marginLeft:5,
    marginBottom:10,
  },
  addTextFocused: {
    color: "white",
    width: "90%",
    borderColor: "#2196F3",
    borderBottomWidth: 3,
    padding: 10,
    marginLeft:5,
    marginBottom:10,
  },
  cardView: {
    padding:20,
    width:'100%',
    flexDirection:"column",
    borderColor:"grey",
    borderRadius:5,
    marginBottom:5,
  },
  item: {
    flex:1,
    color:"#1F6FEB",
    fontWeight:"bold",
    padding:10,
    width:'100%',
    borderRadius:10,
    marginBottom:5,
  },
  itemView: {
    padding:10,
    width:'100%',
    flexDirection:"row",
    backgroundColor: '#161B22',
    borderBottomWidth:0,
    borderBottomColor:"purple",
    borderColor:"grey",
    borderRadius:15,
    marginBottom:10,
  },
  itemCompleted: {
    flex:1,
    color:"grey",
    textDecorationLine: 'line-through',
    padding:10,
    width:'100%',
    borderRadius:10,
    marginBottom:5,
  },
  itemViewCompleted: {
    padding:10,
    width:'100%',
    flexDirection:"row",
    backgroundColor: '#161B22',
    borderBottomWidth:2,
    borderBottomColor:"green",
    borderColor:"grey",
    borderRadius:15,
    marginBottom:5,
  },
  getItemsCard: {

    backgroundColor:"#21262D",
    position:"absolute",
    zIndex:1,
    flexDirection:"column",
    alignItems:"flex-start",
    alignSelf:"center",
    borderRadius:15,
    width:"90%",
    padding:10,
    top:150,
    marginLeft:0,
    marginBottom:10,
    justifyContent:"center",
  },
  getItemsCardView:{
    flex:1,
    height:"100%",
    backgroundColor:"rgba(52, 52, 52, 0)",
    position:"absolute",
    zIndex:1,
    alignSelf:"center",
    width:"100%",
  }
});
