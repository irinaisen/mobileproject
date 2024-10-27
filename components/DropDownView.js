import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Button, Image } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { liveTrains, stations } from './StaticApis';
import { init, addStation, updateStation, fetchAllStations, fetchStation } from '../database/db';
import styles from '../views/styles'


const DropdownComponent = ({ navigation, route }) => {
  const [value, setValue] = useState(null); // Tallennetaan valittu dropdown valikon arvo
  const [junaData, setJunaData] = useState([]); // Tallennetaan junatiedot flatlistiä varten.
  const [asemaDataValikkoon, setAsemaData] = useState([]); // Tallennetaan asematiedot dropdown valikkoa varten
  const [favourite, setFavourite] = useState(false)
  const [selectedStation, setSelectedStation] = useState('Asema');
  const [leavingTrains, setLeavingTrains] = useState([]); // Tallennetaan junatiedot flatlistiä varten.
  const [comingTrains, setComingTrains] = useState([]);
  // Hakee asematiedot dropdown valikkoon.
  useEffect(() => {
    const asemat = async () => {
      try {
        const asemalista = await stations(); // Funktio palauttaa jokaisen aseman nimen ja lyhenteen
        setAsemaData(asemalista);
      } catch (error) {
        console.log(error);
      }
    };
    asemat(); // Aloittaa asemahaun heti kun käyttäjä navigoi oikealle sivulle äpissä. 
  }, []);

  // Hakee junatiedot valitulta asemalta
  useEffect(() => {
    if (value) {
      liveTrains(value) // funktio saa parametriksi dropdownista valitun aseman lyhenteen
        .then((data) => {
          console.log(junaData)
          setJunaData(data); // Päivittää junatiedot muuttujaan
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [value]);

 // useEffect suoritetaan aina kun jokin muuttujista muuttuu
 const handleStationChange = async (value) => {
    setValue(value);
    const { favourite } = await fetchStation(value)
    setFavourite(favourite) // Set the station value
  };
  
  if (route.params) {
    console.log('asdasdf')
    const { name, shortCode } = route.params; // Tallentaa parametrina saadut arvot(Asema ja leavingTrains) muuttujiin. 
    if (shortCode !== value) { // Tarkistaa onko saatu station-arvo eri kuin nykyinen asema.
      setSelectedStation(name);
      console.log('asdasdf')
      handleStationChange(shortCode)// päivitetään selectedStation arvo
    }
    // Päivittää uudet leavingTrainst muuttujaan
  }

 

  // const selectStation = (item, junadata, navigation) => {
  //   console.log(junadata)
  //       navigation.navigate('Home', {
  //         station: item,
  //         junadata: junadata
  //   });
  // }



  // Flatlistin sisältö
  return (
    <View style={[styles.container, styles.main]}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemContainerStyle={styles.textItem}
        searchPlaceholderTextColor='white'
        itemTextStyle={styles.dropDownItem}
        iconStyle={styles.iconStyle}
        data={asemaDataValikkoon}
        activeColor='green'
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={value !== null ? selectedStation : "Select station"}
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          handleStationChange(item.value);
        }}

      />
      <TouchableOpacity onPress={async () => {
        const currentStatus = await fetchStation(value)
        updateStation(value, !currentStatus.favourite)
        setFavourite(!currentStatus.favourite)
        //updateStation(value, )
      }}><Text style={[styles.link, favourite ? { color: 'red' } : { color: '#c0b729' }]} >{favourite ? 'Remove from favourites' : 'Set as favourite'}</Text></TouchableOpacity>
      <FlatList
        data={junaData}
        renderItem={({ item }) => {
          return (
            <View style={styles.trainItem}>
              <Text style={[styles.trainText, styles.h3]}>{item.trainType} {item.trainNumber} {item.departureStation} - {item.destinationStation}</Text>
              {item.timetable.map((time, index) => (
                <View key={index} style={styles.trainDataRow}>
                  <Text style={styles.trainText}>{time.type}</Text>
                  <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
                  <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. <Text style={[time.status.includes("myöhässä") ? { color: 'red' } : { color: 'green' }, { fontWeight: 'bold' }]}>{time.status}</Text></Text>

                </View>
              ))}
            </View>
          )

        }}
        keyExtractor={(item, index) => `${item.trainNumber}-${index}`}
      />

    </View>
  )
};





export default DropdownComponent;