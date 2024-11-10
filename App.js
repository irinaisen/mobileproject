import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { junienTiedot, liveTrains, trainLocations, stations } from './components/StaticApis';
import MapWithMarkers from './components/Map';
import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownComponent from './components/DropDownView';
import { addStation, init, updateStation } from './database/db';
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
        <Stack.Screen name="Home" component={ListScreen} options={{ 
    headerLeft: (prop) => undefined// hide the header
  }} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const HomeScreen2 = () => {
  // Sets the station based on navigation input (from map or from list (TODO))
  const [selectedStation, setSelectedStation] = useState({name:'Asema', shortCode:'', favourite:false});

  console.log(selectedStation)

  if (props.route.params) {


    let p = props.route.params;

    if (p !== selectedStation) {
      setSelectedStation(p)
    }
  }

  else {
    console.log(props.route.params)
    console.log('no params')
  }

  return (

    <View style={[styles.container, styles.main]}>
      <Text style={styles.heading}>{selectedStation.name}</Text>
      <Button title={selectedStation.favourite ? 'Remove from favourites':'Add to favourites'} onPress={() => {
        updateStation(selectedStation.shortCode, !selectedStation.favourite)
        setSelectedStation({...selectedStation, favourite: !selectedStation.favourite})
      }}></Button>
      <HomeScreen1 />
      <NavButtons params={props}></NavButtons>
    </View>

  )
}



const MapScreen = (props) => {
  return (
    <View style={styles.container}>
      <MapWithMarkers onMarkerSelect={(id, title, fav) => {

        props.navigation.navigate('Home', {
          name: title,
          shortCode: id,
          favourite: fav
        })
      }} />
      <NavButtons params={props}></NavButtons>
    </View>

  )
}

const ListScreen = (props) => {
  return (
    <View style={styles.container}><DropdownComponent navigation={props.navigation} route={props.route} />
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
