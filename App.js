import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef,ReactDOM,createRef} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,ScrollView,SafeAreaView,TouchableOpacity,Modal } from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage'
import { AppRegistry,Header } from 'react-native';
import Constants from "expo-constants";
import Category from './category';
import Tasks from "./tasks"

function App() {
  const [constructorHasRun,setConstructorHasRun] = useState(false);
  const [userName,setUserName] = useState("Pal");
  const [textUname,setTextUname] = useState("");
  const [showChangeUName,setShowChangeUName] = useState(0);
  const [focused,setFocused] = useState(0);
  const [todos,setTodos] = useState({"Personal":[]});
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");
  const [inputCategory,setCategory] = useState("");
  const [currentCategory,setCurrentCategory] = useState("");
  const [show, setShow] = useState(0);
  const createItemNode = createRef();

  const storeData = async ()=>{
    try{
      let JsonObj = JSON.stringify(todos);
      //console.log("obj",JsonObj);
      await AsyncStorage.setItem("todos",JsonObj);
    }
    catch(error){
      console.log(error);
    }
  }

  const storeUserName = async () =>{
    try{
      await AsyncStorage.setItem("userName",userName);
      console.log("set",userName);
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
        //console.log("recieved obj",obj);
        setCurrentCategory("Personal");
        setTodos(obj);;
        setItems(obj["Personal"]);
      }  
      if(uname!=null){
        setUserName(uname);
        console.log("get",uname);
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

  const addItemToList = ()=>{ 
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
    setShow(0);

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

  const events = (evt)=>{
    evt.persist();
    //const domNode = ReactDOM.findDOMNode(createItemNode.current)
    console.log(createItemNode.current.contains,"\n\nomg")
  }
/*
  useEffect(()=>{
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  },[show]);
*/

  const displayCategory = ()=>{
    return(
      <Text>{currentCategory}</Text>
    )
  }

  useEffect(()=>{
    set_currentCategory(currentCategory);
  },[currentCategory])


  const constructor = ()=>{
    if(constructorHasRun){
        return;
    }
    console.log("act like constructor");
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
        <View style={showChangeUName==1?styles.getItemsCard:{display:"none"}} ref={createItemNode} >
                <View style={{alignSelf:"flex-end",margin:-10}}>
                  <IconButton icon="close" color={Colors.red700} style={{alignSelf:"flex-end",padding:0}} onPress={()=>{setShowChangeUName(0);setText("");}} size={18}></IconButton>
                </View>
                <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Change your Username</Text>
                <TextInput style={focused?styles.addTextFocused:styles.addText}  onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText}  onBlur={()=>setFocused(0)} placeholder="Enter your username .."></TextInput>
                <View style={{alignSelf:"flex-end",padding:0}}>
                  <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{setUserName(inputText);storeUserName();setText("");setShowChangeUName(0)}} >
                    <Text style={(inputText!="")?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Change</Text>
                  </TouchableOpacity>
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
        <View style={show==1?styles.getItemsCard:{display:"none"}} ref={createItemNode} >
                <View style={{alignSelf:"flex-end",margin:-10}}>
                  <IconButton icon="close" color={Colors.red700} style={{alignSelf:"flex-end",padding:0}} onPress={()=>{setShow(0);setText("");}} size={18}></IconButton>
                </View>
                <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Add an item</Text>
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!"></TextInput>
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setCategory(text);}} onFocus={()=>setFocused(1)} value={inputCategory} onBlur={()=>setFocused(0)} placeholder="Enter the category"></TextInput>
                <View style={{alignSelf:"flex-end",padding:0}}>
                  <TouchableOpacity style={{alignSelf:"flex-end",padding:20}} onPress={()=>{(inputText&&inputCategory)?addItemToList():null;}} >
                    <Text style={(inputText&&inputCategory)?{color:"#2196F3",fontWeight:"bold",fontSize:18}:{color:"#2F525F",fontWeight:"bold",fontSize:18}}>Add</Text>
                  </TouchableOpacity>
                </View>
        </View>
        <ScrollView style={styles.cardView} > 
          {
      
          items.map((data,i)=>{
          return( 
          //<Text key={i} style={styles.item}>{data.text}</Text>
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
    //justifyContent: 'center',
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
    //backgroundColor: '#2E2E2E',
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
});

AppRegistry.registerComponent('Todo-list-app', () => 'App');

export default App;