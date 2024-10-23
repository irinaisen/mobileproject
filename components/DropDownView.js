import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { liveTrains, stations } from './StaticApis';


const DropdownComponent = ({ navigation }) => {
  const [value, setValue] = useState(null); // Tallennetaan valittu dropdown valikon arvo
  const [junaData, setJunaData] = useState([]); // Tallennetaan junatiedot flatlistiin.
  const [asemaDataValikkoon, setAsemaData] = useState([]); // Tallennetaan asematiedot dropdown valikkoa varten

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
          setJunaData(data); // Päivittää junatiedot muuttujaan
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }, [value]);


  const selectStation = (item, navigation) => {

        navigation.navigate('Home', {

          station: item
    })}
// Flatlistin sisältö
const renderTrainItem = ({ item }) => (
  <View style={styles.trainItem}>
    <Text style={styles.trainText}>{item.trainType} {item.trainNumber}</Text>
    {item.timetable.map((time, index) => (
      <View key={index}>
        <Text style={styles.trainText}>{time.type}</Text>
        <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
        <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. {time.status}</Text>
        {/* <Text style={styles.trainText}></Text> */}
        <Text style={styles.trainText}>-----------------------------</Text>
      </View>
    ))}
  </View>
);

return (
  <View style={styles.container}>
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
      labelField="label" // Jos muuttaa niin pitää muuttaa myös stations funktioon!
      valueField="value" // Jos muuttaa niin pitää muuttaa myös stations funktioon!
      placeholder="Select station"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
        // Alempi funktio navigoi heti valinnan jälkeen pääsivulle
        //selectStation(item.label, navigation)
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
    backgroundColor: 'black'
  },
  dropdown: {
     backgroundColor: 'green',
     color: 'white',
    //margin: 16,
    height: 50,
    borderColor: 'white',
    padding: 12,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 5,

    elevation: 2,

  },
  icon: {
    marginRight: 5,
    tintColor:'white'
  },
  dropDownItem: {
    //padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'black', 
    color:'white'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'black',
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,

    //backgroundColor: 'black',
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'bold',
    backgroundColor:'green'
  },
  iconStyle: {
    width: 20,
    height: 20,
    color:'white',
    tintColor: 'white'

  },
  inputSearchStyle: {
    //height: 60,
    fontSize: 16,
    //borderColor: 'white',
    //borderRadius: 2,
    backgroundColor: 'black',
    color: 'white',
    margin:0,
    marginBottom:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black', 
    color:'white',
    backgroundColor: '#222',
  },
  trainText: {
    color: 'white'
  }
});


export default DropdownComponent;