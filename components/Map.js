import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, TouchableOpacity, Text, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Geojson, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Dropdown } from 'react-native-element-dropdown';
//import geojson from '../static/station'

const stations = require('../static/stations.json')
let temp = 0;

const MapWithMarkers = (props) => {
  const [markers, setMarkers] = useState([
    { id: "code1", title: 'Marker 1', description: 'Current Station', latitude: 37.78825, longitude: -122.4324, active: false, color: 'red' },
    { id: "code2", title: 'Marker 2', description: 'Other Station', latitude: 37.75825, longitude: -122.4624, active: true, color: 'green' },
  ]);
  const [coords, setCoords] = useState({ lat: 37.78825, lon: -122.4324 })

  temp++
  console.log(temp)

  useEffect(() => {

    const loadData = () => {

      const markerdata = stations.data.stations.map((station) => {
        return {
          id: station.shortCode,
          title: station.name,
          description: 'Station',
          latitude: station.location[1],
          longitude: station.location[0],
          active: false,
          color: 'red'
        }
      })
      setMarkers(markerdata)
    }
    loadData()

  }, [])

  const setActiveStation = (_id) => {
    let marker_
    const newMarkers = markers.map((marker) => {
      let a;
      let col;
      
      if (marker.id === _id) {
        a = true;
        col = 'green'
        marker_ = marker
        
      }
      else {
        a = false
        col = 'red'
      }
      return { ...marker, active: a, color: col }
    }
    );
    
    setMarkers(newMarkers)
    console.log(marker_)
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show your position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission denied');
        return;
      }
    }
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };


  return (
    <View  style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 60.17045989432245,
          longitude: 24.947824675734193,
          latitudeDelta: 11.83708,
          longitudeDelta: 7.66028,
        }}
        showsUserLocation={true}
      >
      
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            pinColor={marker.color}
            tracksViewChanges={true}
            onCalloutPress={() => {
              // This selects the station and takes user back to home screen
              props.onMarkerSelect(marker.id, marker.title)}}
          >
            <Callout>
              <CustomCalloutView stationName={marker.title}/>
          </Callout>
          </Marker>
        ))}

      </MapView>
      <TouchableOpacity onPress={requestLocationPermission} style={styles.locBtn}><Text style={styles.btnText}>Use Location</Text></TouchableOpacity>
    </View>
  );
};


const CustomCalloutView = (props) => {
  return (
    <View>
      <Text>Select {props.stationName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
    /*justifyContent: 'flex-start',
    alignItems: 'center'*/
  },
  map: {
    height: 700,
    flex: 1

  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,


  },
  locBtn: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  btnText:
  {
    color: 'white'
  }

});

export default MapWithMarkers;