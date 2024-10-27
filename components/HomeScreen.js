
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';
import { init, addStation, updateStation, fetchAllStations } from '../database/db';
import styles from '../views/styles'
import MapWithMarkers from '../components/Map';
import { junienTiedot, liveTrains, trainLocations, stations } from '../components/StaticApis';
import NavButtons from '../components/NavButtons';


init()
  .then(() => {
    console.log('Database creation succeeded!');
  }).catch((err) => {
    console.log('Database IS NOT initialized! ' + err);
  });

const HomeScreen = (props) => {

  const [isInserted, setIsInserted] = useState(false);
  const [stationList, setStationList] = useState([]);
  const [selectedStation, setSelectedStation] = useState('Asema');
  const [leavingTrains, setLeavingTrains] = useState([]); // Tallennetaan junatiedot flatlistiä varten.
  const [comingTrains, setComingTrains] = useState([]); // Tallennetaan junatiedot flatlistiä varten.


  /*   async function deleteStationFromDb(){
      try{
        const dbResult = await deleteStation(2);
      }
      catch(err){
        console.log(err);
      }
      finally{
        //No need to do anything
      }
    } */
  async function updateStationInDb() {
    try {
      const dbResult = await updateStation("HKI", true);
      console.log(dbResult)
    }
    catch (err) {
      console.log(err);
    }
    finally {
      console.log('updated station')
      //No need to do anything
    }
  }
  async function readAllStation() {
    // await fetchAllStation()
    // .then((res)=>{//The parametr res has the value which is returned from the fetchAllStation function in db.js
    //   console.log(res);//For debugging purposes to see the data in the console screen
    //   setStationsList(res);
    // })
    // .catch((err)=>{console.log(err)})
    // .finally(()=>{console.log("All stations are read")});//For debugging purposes to see the routine has ended

    //The above commented can be used as well as the code below

    try {
      const dbResult = await fetchAllStations();
      console.log("dbResult readAllStation in App.js");
      console.log(dbResult);
      //setStationList(dbResult);
    }
    catch (err) {
      console.log("Error: " + err);
    }
    finally {
      console.log("All stations are red - really?");
    }
  }

  useEffect(() => {

    if (props.route.params) {
      const { station, trainData } = props.route.params; // Tallentaa parametrina saadut arvot(Asema ja leavingTrains) muuttujiin. 
      if (station !== selectedStation) { // Tarkistaa onko saatu station-arvo eri kuin nykyinen asema.
        setSelectedStation(station); // päivitetään selectedStation arvo
      }
      
      setLeavingTrains(trainData.filter((train) => train.timetable.type === "Lähtevä")); // Päivittää uudet leavingTrainst muuttujaan
      setComingTrains(trainData.filter((train) => train.timetable.type === "Saapuva")); // Päivittää uudet leavingTrainst muuttujaan
    }
  }, [props.route.params]); // Käynnistää useEffectin aina kun props.route.params muuttuu. 


  return (

    <View style={[styles.container, styles.main]}>

      <Text style={styles.heading}>{selectedStation}</Text>

      <FlatList
        data={leavingTrains}
        keyExtractor={(item) => item.trainNumber.toString()+'l'}
        renderItem={({item}) => {return (
          <View style={styles.trainItem}>
              <Text style={styles.trainText}>{item.trainType} {item.trainNumber}</Text>
              {item.timetable.map((time, index) => (
                  <View key={index} style={styles.trainDataRow}>
                      <Text style={styles.trainText}>{time.type}</Text>
                      <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
                      <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. {time.status}</Text>
      
                  </View>
              ))}
          </View>
          )}}
      />

      <FlatList
        data={comingTrains}
        keyExtractor={(item) => item.trainNumber.toString() +'c'}
        renderItem={({item}) => {return (
          <View style={styles.trainItem}>
              <Text style={styles.trainText}>{item.trainType} {item.trainNumber}</Text>
              {item.timetable.map((time, index) => (
                  <View key={index} style={styles.trainDataRow}>
                      <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
                      <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. {time.status}</Text>
      
                  </View>
              ))}
          </View>
          )}}
      />
      



      <View style={styles.container}>



        <Text style={styles.textStyle}>Aikaisemmat haut</Text>
        <Button title="Save" onPress={() => saveStation()} />
        <Button title="Read" onPress={() => readAllStation()} />
        <Button title="Delete" onPress={() => deleteStationFromDb()} />
        <Button title="Update" onPress={() => updateStationInDb()} />
        <FlatList
          data={stationList}
          renderItem={(item) => <View><Text style={styles.textStyle}>{item.item.id} {item.item.station}</Text>
          </View>}
        />
      </View>
      

    <NavButtons params={props}></NavButtons>
    </View>
  )
}

export default HomeScreen;