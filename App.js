import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { junienTiedot, liveTrains, trainLocations, stations } from './components/StaticApis';
import MapWithMarkers from './components/Map';
import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownComponent from './components/DropDownView';
import { addStation, init } from './database/db';
import styles from './views/styles'
import HomeScreen1 from './components/HomeScreen';
import NavButtons from './components/NavButtons';

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

init()
.then(()=>{
    console.log('Database creation succeeded!');
}).catch((err)=>{
  console.log('Database IS NOT initialized! '+err);
});

//const route = useRoute();
const _stations = require('./static/stations.json')

const addStationsToDB = async () =>_stations.data.stations.forEach(station => {

  let s = {
    name: station.name, 
    shortCode: station.shortCode,
    location: station.location, 
    favourite: 0

  }
  addStation(s)
  console.log(s)
});

addStationsToDB()

const Stack = createNativeStackNavigator();

const headerStyle = () => {
  
  const options = {
    headerTitleStyle: {
    color: 'white'
  },
  headerStyle: {
    backgroundColor: 'black'
  },
  headerLeft: BackBtn
}
  return options
  
}


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

const BackBtn = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {navigation.goBack()}}>
      <Image style={{height:20, width: 40}} source={require('./assets/back.png')}></Image>
    </TouchableOpacity>
  )
}

const App = () => {

  const [station, setStation] = useState('')



  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={headerStyle}
      >
        <Stack.Screen name="Home" component={HomeScreen1} options={{ 
    headerLeft: (prop) => undefined// hide the header
  }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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