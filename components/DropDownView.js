import React, { useState, useEffect } from 'react';
  import { StyleSheet, View, Text, FlatList } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {liveTrains, stations} from './StaticApis';


  const DropdownComponent = () => {
    const [value, setValue] = useState(null); // Tallennetaan valittu dropdown valikon arvo
    const [junaData, setJunaData] = useState([]); // Tallennetaan junatiedot flatlistiin.
    const [asemaDataValikkoon, setAsemaData] = useState([]); // Tallennetaan asematiedot dropdown valikkoa varten

    // Hakee asematiedot dropdown valikkoon.
    useEffect(() => {
      const asemat = async () => {
        try {
          const asemalista = await stations(); // Funktio palauttaa jokaisen aseman nimen ja lyhenteen
          setAsemaData(asemalista); 
        } catch(error){
          console.log(error);
        }
      };
      asemat(); // Aloittaa asemahaun heti kun käyttäjä navigoi oikealle sivulle äpissä. 
    }, []);

    // Hakee junatiedot valitulta asemalta
    useEffect(() => {
      if (value){
        liveTrains(value) // funktio saa parametriksi dropdownista valitun aseman lyhenteen
        .then((data) => {
          setJunaData(data); // Päivittää junatiedot muuttujaan
        })
        .catch((error)=>{
          console.log(error)
        });
      }
    }, [value]);

  // Flatlistin sisältö
  const renderTrainItem = ({ item }) => (
    <View style={styles.trainItem}>
      <Text style={styles.trainText}>{item.trainType} {item.trainNumber}</Text>
      <Text style={styles.trainText}>{item.departureStation}-{item.destinationStation}</Text> 
      {item.timetable.map((time, index) => (
        <View key={index}>
          <Text style={styles.trainText}>{time.type}</Text>
          <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
          <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. {time.status}</Text>
          <Text style={styles.trainText}>-----------------------------</Text>
        </View>
      ))}
    </View>
  );

    return (
      <View style = {styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={asemaDataValikkoon}
        search
        maxHeight={300}
        labelField="label" // Jos muuttaa niin pitää muuttaa myös stations funktioon!
        valueField="value" // Jos muuttaa niin pitää muuttaa myös stations funktioon!
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}

      />
      <FlatList
          data={junaData}
          renderItem={renderTrainItem}
          keyExtractor={(item, index) => `${item.trainNumber}-${index}`}
        />
    </View>
  )};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 16,
      paddingBottom: 80
    },
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
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
    trainText: {
      color: 'white'
    }
  });


  export default DropdownComponent;