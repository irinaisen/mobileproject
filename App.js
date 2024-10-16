import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {junienTiedot, liveTrains, trainLocations} from './components/StaticApis';
import MapWithMarkers from './components/Map';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownComponent from './components/DropDownView';
import styles from './views/styles'

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

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
      <View style={styles.container}><Text style={styles.textStyle}>This is home</Text>
        <View >
      <   Button style={styles.buttonStyle} title='Junien tiedot' 
            onPress={junienTiedot}/>
          <Button style={styles.buttonStyle} title='Aktiivisten junien seuranta' 
            onPress={() => liveTrains("HKI")}/>
          <Button style={styles.buttonStyle} title='Junan sijainti' 
            onPress={trainLocations}/>
        </View>
        <View style={styles.container}>
          <Text style={styles.textStyle}>Saapuvat junat</Text>
         
          <Text style={styles.textStyle}> Aika</Text>
          <Text style={styles.textStyle}> Juna</Text>
          <Text style={styles.textStyle}> Raide</Text>
      
        </View>
       
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

  // //  return (
  //   <View style={styles.container}>
  //     {/* <View style={styles.formView}>
  //       <TextInput style={styles.inputStyle} placeholder="Fish breed..." value={type}
  //           onChangeText={fishInputHandler}/>
  //       <TextInput style={styles.inputStyle} placeholder="Fish weight..." value={size}
  //           onChangeText={sizeInputHandler}/>
  //       <Button style={styles.buttonStyle} title='Click!' 
  //           onPress={addFishToList}/>
  //     </View>
  //     <View style={styles.listStyle}>
  //       <Text>List</Text>
  //       {fishList.map((item, index)=>{
  //         return <View style={styles.listItemStyle} key={index}><Text>{index+1}: {item.type} / {item.size} g</Text></View>
  //       })}
  //     </View> */}

  //   </View>
  // // );
 


export default App;