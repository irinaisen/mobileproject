import React, { useState, useEffect } from 'react';
  import { StyleSheet, View, Text, FlatList } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import {liveTrains} from './StaticApis';



  const data = [
    { label: 'Helsinki', value: 'HKI' },
    { label: 'Pori', value: 'PRI' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [junaData, setJunaData] = useState([]);

    useEffect(() => {
      if (value){
        liveTrains(value)
        .then((data) => {
          setJunaData(data);
        })
        .catch((error)=>{
          console.log(error)
        });
      }
    }, [value]);

  // Render item for FlatList
  const renderTrainItem = ({ item }) => (
    <View style={styles.trainItem}>
      <Text style={styles.trainText}>{item.trainType}{item.trainNumber}</Text>
      {/* <Text style={styles.trainText}>Train Number: {item.trainNumber}</Text>
      <Text style={styles.trainText}>Train Type: {item.trainType}</Text> */}
      {item.timetable.map((time, index) => (
        <View key={index}>
          <Text>Track: {time.commercialTrack}</Text>
          {/* <Text>Time: {time.actualTime}</Text> */}
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
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}

        // renderItem={renderItem}
      />
      <FlatList
          data={junaData}
          renderItem={renderTrainItem}
          keyExtractor={(item) => item.key}
        />
    </View>
  )};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingHorizontal: 16,
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
  });


  export default DropdownComponent;