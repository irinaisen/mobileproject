import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {junienTiedot, liveTrains, trainLocations} from './components/StaticApis';
import MapWithMarkers from './components/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownComponent from './components/DropDownView';

const Stack = createNativeStackNavigator();





const App=() => {
  const [type, setFish]=useState();
  const [size, setSize] = useState();
  const [fishList, addFish]=useState([]);

  const fishInputHandler=(enteredText)=>{
    setFish(enteredText);
  }
  const sizeInputHandler = enteredText => {
    setSize(enteredText);
  };
  const addFishToList=()=>{
    addFish(fishList=>[...fishList, {type: type, size: size}]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>)
}
const HomeScreen = (props) => {
    return (
      <View style={styles.container}><Text>This is home</Text>
      <NavButtons params={props}></NavButtons></View>
    )
}

const MapScreen = (props) => {
  return (
    <View style={styles.container}><MapWithMarkers/>
    <NavButtons params={props}></NavButtons>
    </View>
    
  )
}

const ListScreen = (props) => {
  return (
    <View style={styles.container}><DropdownComponent/>
    <NavButtons params={props}></NavButtons>
    </View>
  )
}

const NavButtons=({params})=>{
  return(
    <View style={styles.navbuttonstyle}>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Home")}><Text style={styles.textStyle}>Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Map")}><Text style={styles.textStyle}>Map</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("List")}><Text style={styles.textStyle}>Stations</Text></TouchableOpacity>
    </View>
  );
}

  /* return (
    <View style={styparamsles.container}>
      <View style={styles.formView}>
        <TextInput style={styles.inputStyle} placeholder="Fish breed..." value={type}
            onChangeText={fishInputHandler}/>
        <TextInput style={styles.inputStyle} placeholder="Fish weight..." value={size}
            onChangeText={sizeInputHandler}/>
        <Button style={styles.buttonStyle} title='Click!' 
            onPress={addFishToList}/>
      </View>
      <View style={styles.listStyle}>
        <Text>List</Text>
        {fishList.map((item, index)=>{
          return <View style={styles.listItemStyle} key={index}><Text>{index+1}: {item.type} / {item.size} g</Text></View>
        })}
      </View>
      <View>
      <Button style={styles.buttonStyle} title='Junien tiedot' 
            onPress={junienTiedot}/>
                  <Button style={styles.buttonStyle} title='Aktiivisten junien seuranta' 
            onPress={() => liveTrains("HKI")}/>
                  <Button style={styles.buttonStyle} title='Junan sijainti' 
            onPress={trainLocations}/>
      </View>
    </View>
  );
 */

const styles = StyleSheet.create({
  listItemStyle:{
    borderWidth:1,
    borderColor:"blue",
    padding:5,
    backgroundColor:"#abc",
    width:"80%",
  },
  container: {
    flex: 1,
  },
  formView:{
      flex:2,
      flexDirection:"column",
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",
      padding: 30,
      width:"100%",
  
  },
  textStyle: {
    color: 'white'
  },
  flexGrow: {
    flex:1,
    flexGrow: 1
  },
  listStyle:{
    flex:8,
    alignItems:"center",
    backgroundColor:"#eac",
    borderColor:"green",
    borderWidth:2,
    width:"100%",
  },
  inputStyle:{
    backgroundColor:"#abc",
    borderColor:"black",
    borderWidth:2,
    margin:2,
    padding:5,
    width:"50%",
  },

  navbuttonstyle:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#def",
    alignItems:"center",
    justifyContent:"space-around",  
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0  
  },
  navBtn: {
    height: 80,
    flex:1,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;