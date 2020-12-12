import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect,useRef} from 'react';
import { render } from 'react-dom';
import { StyleSheet, Text, View,TextInput,Dimensions,Button,ScrollView,SafeAreaView,TouchableOpacity } from 'react-native';
import { DefaultTheme, Provider as PaperProvider ,IconButton, Colors,RadioButton,ProgressBar  } from 'react-native-paper';
import { AppRegistry } from 'react-native';
//import Carousel from 'react-native-snap-carousel';
import Category from './category';

function App() {
  const {height,width} = Dimensions.get('window');
  const [focused,setFocused] = useState(0);
  const [todos,setTodos] = useState({"Personal":[]});
  const [items,setItems] = useState([]);
  const [inputText,setText] = useState("");
  const [inputCategory,setCategory] = useState("");
  const [currentCategory,setCurrentCategory] = useState("");
  const [show, setShow] = React.useState(0);
  const createItemNode = useRef();


  const addItemToList = ()=>{
    //setItems([...items,temp]);
    let listFull = todos;
    for(var key in listFull){
      if(inputCategory.toLowerCase()==key.toLowerCase()){
        listFull[key].unshift({id:listFull.length,text:inputText,isCompleted:0});
        setItems(listFull[key]);
      }
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
        setTodos(listFull);
        setItems(listFull[key]);
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
      }
    }

  }

  const handleClick = (e)=>{
    if(!createItemNode.current.contains(e.target)){
      setShow(0);
      return;
    }

  }

  useEffect(()=>{
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  },[show]);


   return (
     
    <View style={styles.container}> 

        <Text style={{color:"white",fontWeight:"bold",alignSelf:"flex-start"}}>Todo's Category</Text>
        <SafeAreaView style={styles.container1}>
            <View style={{flex:1,padding:20}}>
              <ScrollView horizontal={true} nestedScrollEnabled={true}  showsHorizontalScrollIndicator={false}>
                
                    <TouchableOpacity style={{height:"100%",width:"40%",marginLeft:20,borderRadius:20,backgroundColor:"#2E2E2E",padding:10,}} onPress={()=>console.log("fefiwuehf")}>
                      <Category todosNo="10" category="Business" progress="0.2" />
                    </TouchableOpacity> 
                    <Category todosNo="45" category="Personel" progress="0.6" />
                    <Category todosNo="15" category="Others" progress="0.8" />           
              </ScrollView>
            </View>
          
        </SafeAreaView>
        
        <Text style={{color:"white",fontWeight:"bold",alignSelf:"flex-start"}}>Todo's list</Text>
        
        <IconButton 
          icon="pencil" 
          color={Colors.green500} 
          style={{alignSelf:"flex-end",position:'absolute',zIndex:1,bottom:10,}}  
          onPress={()=>{setShow(1);}}
          size={40}>
          
        </IconButton>
        <ScrollView style={styles.cardView}>
          {  
            <View style={show==1?styles.getItemsCard:{display:"none"}} ref={createItemNode} >
              <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Add an item</Text>
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setText(text);}} onFocus={()=>setFocused(1)} value={inputText} onBlur={()=>setFocused(0)} placeholder="Enter the item!"></TextInput>
                <Text style={{color:"white",fontWeight:"bold",padding:5,}}>Add the Category</Text> 
                <TextInput style={focused?styles.addTextFocused:styles.addText} onChangeText={(text)=>{setCategory(text);}} onFocus={()=>setFocused(1)} value={inputCategory} onBlur={()=>setFocused(0)} placeholder="Personel"></TextInput>
                <View style={{alignSelf:"flex-end"}}>
                  <Button title="Add" style={{alignSelf:"flex-end"}} onPress={()=>addItemToList()}></Button>
                </View>
            </View>
            
          }
          {
      
          items.map((data,i)=>{
          return( 
          //<Text key={i} style={styles.item}>{data.text}</Text>
            <View style={data.isCompleted == 0 ?styles.itemView:styles.itemViewCompleted}>
                <RadioButton
                    value="first"
                    color={Colors.cyan500}
                    uncheckedColor={Colors.purple800}
                    status={ data.isCompleted == 1 ? 'checked' : 'unchecked' }
                    onPress={() => {taskCompleted(i);}}
                    style={{alignItems:"flex-start",color:"red"}}
                    key={1000+i}
                />
                <Text key={data.id} style={data.isCompleted == 0 ?styles.item:styles.itemCompleted}>{data.text}</Text>
                
                <IconButton
                    icon="delete"
                    color={Colors.red500}
                    size={20}
                    onPress={() => {removeItemFromList(i);console.log('Pressed');}}
                    style={{alignItems:"flex-end"}}
                    key={i+2000}
                />
            </View>
          );
        })}
        
      </ScrollView>
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
    
    zIndex:0,
    //justifyContent: 'center',
    color:'#fff',
  },
  container1: {
    
    
  },
  addItem: {
    padding:10,
    flexDirection:"column",
    justifyContent:"space-between",
  },
  addText: {
    color: "white",
    width: "100%",
    borderColor: "#03DAC5",
    borderBottomWidth: 1,
    padding: 10,
    marginRight:10,
    marginBottom:10,
  },
  addTextFocused: {
    color: "white",
    width: "100%",
    borderColor: "purple",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom:10,
  },
  cardView: {
    padding:20,
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
    flexDirection:"Column",
    alignItems:"flex-start",
    alignSelf:"center",
    borderRadius:10,
    width:"100%",
    padding:20,
    marginLeft:30,
    marginBottom:10,
  },
});

AppRegistry.registerComponent('Todo-list-app', () => 'App');

export default App;