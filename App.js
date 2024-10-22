import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { junienTiedot, liveTrains, trainLocations, stations } from './components/StaticApis';
import MapWithMarkers from './components/Map';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownComponent from './components/DropDownView';
import { init } from './database/db';
import styles from './views/styles'
import HomeScreen from './components/HomeScreen';
import NavButtons from './components/NavButtons';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

//const route = useRoute();

const Stack = createNativeStackNavigator();


init()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

const selectStation = (shortCode) => {
  console.log(shortCode)
  //Miten saadaan stateen tieto että on valittu asema

}

const App = () => {

  const [station, setStation] = useState('')



  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen1} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const HomeScreen1 = (props) => {


  // Sets the station based on navigation input (from map or from list (TODO))
  const [selectedStation, setSelectedStation] = useState('Asema');
  console.log(selectedStation)

  if (props.route.params) {
    let { station } = props.route.params;
    console.log(station)
    if (station !== selectedStation) {
      setSelectedStation(station)
    }
  }

  else {
    console.log(props.route.params)
    console.log('no params')
  }

  return (

    <View style={styles.container}>
      <Text style={{ color: '#fff', fontSize: 20 }}>{selectedStation}</Text>
      <HomeScreen />
      <NavButtons params={props}></NavButtons>
    </View>

  )
}

const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <MapWithMarkers onMarkerSelect={(id, title) => {

        props.navigation.navigate('Home', {
          station: title,
          shortCode: id
        })
      }} />
      <NavButtons params={props}></NavButtons>
    </View>

  )
}

const ListScreen = (props) => {
  return (
    <View style={styles.container}><DropdownComponent navigation={props.navigation} />
      <NavButtons params={props}></NavButtons>
    </View>
  )
}

/*const NavButtons=({params})=>{
  return(
    <View style={styles.navbuttonstyle}>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Home")}><Text style={styles.textStyle}>Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Map")}><Text style={styles.textStyle}>Map</Text></TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("List")}><Text style={styles.textStyle}>Stations</Text></TouchableOpacity>
    </View>
  );
}


*/



export default App;