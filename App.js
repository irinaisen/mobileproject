import React, {useState} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {junienTiedot, liveTrains, trainLocations} from './components/StaticApis';


const App=() => {
  const [type, setFish]=useState();
  const [size, setSize] = useState();
  const [fishList, addFish]=useState([]);

  const fishInputHandler=(enteredText)=>{
    setFish(enteredText);
  }
  const sizeInputHandler = enteredText => {
    setSize(enteredText);
  };
  const addFishToList=()=>{
    addFish(fishList=>[...fishList, {type: type, size: size}]);
  }


  return (
    <View style={styles.container}>
      <View style={styles.formView}>
        <TextInput style={styles.inputStyle} placeholder="Fish breed..." value={type}
            onChangeText={fishInputHandler}/>
        <TextInput style={styles.inputStyle} placeholder="Fish weight..." value={size}
            onChangeText={sizeInputHandler}/>
        <Button style={styles.buttonStyle} title='Click!' 
            onPress={addFishToList}/>
      </View>
      <View style={styles.listStyle}>
        <Text>List</Text>
        {fishList.map((item, index)=>{
          return <View style={styles.listItemStyle} key={index}><Text>{index+1}: {item.type} / {item.size} g</Text></View>
        })}
      </View>
      <View>
      <Button style={styles.buttonStyle} title='Junien tiedot' 
            onPress={junienTiedot}/>
                  <Button style={styles.buttonStyle} title='Aktiivisten junien seuranta' 
            onPress={() => liveTrains("HKI")}/>
                  <Button style={styles.buttonStyle} title='Junan sijainti' 
            onPress={trainLocations}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemStyle:{
    borderWidth:1,
    borderColor:"blue",
    padding:5,
    backgroundColor:"#abc",
    width:"80%",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formView:{
      flex:2,
      flexDirection:"column",
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",
      padding: 30,
      width:"100%",
  
  },
  listStyle:{
    flex:8,
    alignItems:"center",
    backgroundColor:"#eac",
    borderColor:"green",
    borderWidth:2,
    width:"100%",
  },
  inputStyle:{
    backgroundColor:"#abc",
    borderColor:"black",
    borderWidth:2,
    margin:2,
    padding:5,
    width:"50%",
  },
  buttonStyle:{
    margin:2,
    padding:5,
    width:"20%",
  }
});

export default App;