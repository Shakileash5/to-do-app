import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef,ReactDOM,createRef} from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,ScrollView,SafeAreaView,TouchableOpacity,Modal } from 'react-native';
import {Provider as PaperProvider ,IconButton, Colors,RadioButton } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Constants from "expo-constants";
import Category from './category';

function App() {
  const {height,width} = Dimensions.get('window');
  const [focused,setFocused] = useState(0);
  const [todos,setTodos] = useState({"Personal":[]});
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");
  const [inputCategory,setCategory] = useState("");
  const [currentCategory,setCurrentCategory] = useState("");
  const [show, setShow] = useState(0);
  const [dummy,setDummy] = useState({modalVisible: false,})
  const createItemNode = createRef();


  const set_currentCategory = (Category)=>{
    for(var key in todos){   
      if(Category.toLowerCase()==key.toLowerCase()){
          setItems(todos[key]);
          setCurrentCategory(key);
          console.log("set")
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
      console.log(text,"dd")
      listFull[text] = [{id:0,text:inputText,isCompleted:0}]
    }
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
      }
    }
  }

  const taskCompleted = (id)=>{

    let listFull = todos
    for(var key in listFull){
      if(currentCategory.toLowerCase()==key.toLowerCase()){
        console.log(currentCategory,"category")
        let list = [...listFull[key]];
        let holdElement = {};
        list[id].isCompleted = 1;
        holdElement = list[id];
        list.splice(id,1);
        list.push(holdElement);
        listFull[key] = [...list];
        setTodos(listFull);
        setItems(listFull[key]);
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
  useEffect(()=>{
    set_currentCategory(currentCategory);
  },[currentCategory])

   return (
     
    <View style={styles.container}  onStartShouldSetResponder={evt=>{events(evt);}}  > 
        <Text style={{color:"white",fontWeight:"bold",fontSize:25,paddingBottom:30,paddingTop:30}}>What's up, Shaki</Text>
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
          onPress={()=>{setShow(1);}}
          size={40}>
          
        </IconButton>
        <View >
        </View> 
        <View style={show==1?styles.getItemsCard:{display:"none"}} ref={createItemNode} >
                <View style={{alignSelf:"flex-end",margin:-10}}>
                  <IconButton icon="close" color={Colors.red700} style={{alignSelf:"flex-end",padding:0}} onPress={()=>{setShow(0);}} size={18}></IconButton>
                </View>
                <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Add an item</Text>
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!"></TextInput>
                <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Add the Category</Text> 
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setCategory(text);}} onFocus={()=>setFocused(1)} value={inputCategory} onBlur={()=>setFocused(0)} placeholder="Personal"></TextInput>
                <View style={{alignSelf:"flex-end",padding:10}}>
                
                  <Button title="Add" style={{alignSelf:"flex-end",padding:20}} onPress={()=>addItemToList()}></Button>
                  
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
    backgroundColor: '#1E1E1E',
    
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
    borderColor: "#03DAC5",
    borderBottomWidth: 1,
    padding: 0,
    marginRight:10,
    marginLeft:5,
    marginBottom:10,
  },
  addTextFocused: {
    color: "white",
    width: "90%",
    borderColor: "purple",
    borderBottomWidth: 1,
    padding: 0,
    marginLeft:5,
    marginBottom:10,
  },
  cardView: {
    padding:20,
    width:'90%',
    flexDirection:"column",
    //backgroundColor: '#2E2E2E',
    borderColor:"grey",
    borderRadius:5,
    marginBottom:5,
  },
  item: {
    flex:1,
    color:"white",
    padding:10,
    width:'100%',
    borderRadius:10,
    marginBottom:5,
  },
  itemView: {
    padding:10,
    width:'100%',
    flexDirection:"row",
    backgroundColor: '#2E2E2E',
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
    backgroundColor: '#2E2E2E',
    borderBottomWidth:2,
    borderBottomColor:"green",
    borderColor:"grey",
    borderRadius:15,
    marginBottom:5,
  },
  getItemsCard: {

    backgroundColor:"#3F3F3F",
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