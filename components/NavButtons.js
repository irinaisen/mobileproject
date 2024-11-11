import React, { useRef, useState } from "react";
import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList  } from "react-native";
import styles from '../views/styles'

const NavButtons=({params})=>{
    return(
      <View style={styles.navbuttonstyle}>
        <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Home")}><Text style={styles.textStyle}>Home</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Map")}><Text style={styles.textStyle}>Map</Text></TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={()=>params.navigation.navigate("Weather")}><Text style={styles.textStyle}>Weather</Text></TouchableOpacity>
      </View>
    );
  }

  
export default NavButtons;

