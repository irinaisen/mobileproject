import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Platform, PermissionsAndroid, TouchableOpacity, Text, Button, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Geojson, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { fetchAllStations } from '../database/db';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import styles from '../views/styles'
import { useIsFocused } from "@react-navigation/native";

//import geojson from '../static/station'

const stations = fetchAllStations()

const MapWithMarkers = (props) => {
  
  const mapRef = useRef(null)
  const focused = useIsFocused()
  const [markers, setMarkers] = useState([
    { id: "code1", title: 'Marker 1', description: 'Current Station', latitude: 37.78825, longitude: -122.4324, active: false, favourite: 0, color: 'red' },
    { id: "code2", title: 'Marker 2', description: 'Other Station', latitude: 37.75825, longitude: -122.4624, active: true, favourite: 0, color: 'green' },
  ]);
  const [coords, setCoords] = useState({ lat: 60.17045989432245, lon: 24.947824675734193 })
  const [zoomLevel, setZoomLevel] = useState(10)

  

  useEffect(() => {

    // Load stationmarkers
    const loadData = () => {
      const markerdata = stations._j.map((station) => {
        return {
          id: station.shortCode,
          title: station.name,
          description: 'Station',
          latitude: station.lat,
          longitude: station.lon,
          active: false,
          favourite: station.favourite,
          color: station.favourite === 0 ? 'green' : '#c0b729',
        }
      })
      setMarkers(markerdata)
    }
    loadData()

    // TODO; make the useEffect so that favourite stations update
  }, [focused])

  useEffect(() => {
    const getZoom = async() => {
      const { zoom } = await mapRef.current.getCamera();
      setZoomLevel(zoom)
  }
  getZoom()

},[])
/* 
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
  } */

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

  const getMarkerSize = () => {
    if (zoomLevel > 15) return { flex:1,overflow:'visible',width: 38, height: 50 };
    if (zoomLevel > 10) return { flex:1,overflow:'visible',width: 30, height: 40 };
    if (zoomLevel > 8) return { flex:1,overflow:'visible',width: 23, height: 30};
    return { flex:1,overflow:'visible',width: 23, height: 30};
  };

  return (
    <View style={styles.container}>

      <MapView
      ref={mapRef}
      onRegionChangeComplete={async()=>{
        const { zoom } = await mapRef.current.getCamera();
        setZoomLevel(zoom)
      }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: coords.lat,
          longitude: coords.lon,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
        
      >

        {markers.map(marker =>
          <Marker
            anchor={{ x: 0.5, y: 0.5 }}
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => {
              // This selects the station and takes user back to home screen
              props.onMarkerSelect(marker.id, marker.title, marker.favourite)
            }}

          >
          <Image
          
          source={require('../assets/marker.png')}
            height={zoomLevel*3}
            width={zoomLevel*3}
            style={{width:zoomLevel*3, height:zoomLevel*3}}
          tintColor={marker.color}
          resizeMethod='auto'
          resizeMode='contain'
           // Adjust the width and height as needed
        />
            <Callout>
              <CustomCalloutView stationName={marker.title} />
            </Callout>
          </Marker>
        )}

      </MapView>
      <TouchableOpacity onPress={requestLocationPermission} style={styles.locBtn}><Text style={styles.btnText}>Use Location</Text></TouchableOpacity>
    </View>
  );
};

// Custom view to be opened when a user clicks marker
const CustomCalloutView = (props) => {
  return (
    <View style={{minWidth: 100, backgroundColor:'green', borderRadius: 10, padding:10, margin:10}}>
      <Text style={styles.btnText}>Select</Text><Text style={[styles.btnText, styles.selectedTextStyle]}>{props.stationName}</Text>
    </View>
  )
}

export default MapWithMarkers;