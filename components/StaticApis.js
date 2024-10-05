import React, { useRef, useState } from "react";
import {Text, Animated, PanResponder, StyleSheet, View } from "react-native";

    // Junien tiedot (/trains)

const junienTiedot=async()=>{
    try{
        let response=await fetch("https://rata.digitraffic.fi/api/v1/trains/");
        let json=await response.json();
        console.log(json)
    }
    catch(error){
        console.log(error);
    }
    }

    // Aktiivisten junien seuranta (/live-trains)

    const liveTrains=async(asema)=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/"+ asema);
            let json=await response.json();
            console.log(json);
        }
        catch(error){
            console.log(error)
        }
    }

    // Junan GPS-sijainnit (/train-locations). Tiedot saa GeoJSON muodossa lisäämällä urlin train-locations perään .geojson
    const trainLocations=async()=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/train-locations/latest/");
            let json=await response.json();
            console.log(json);
        }
        catch(error){
            console.log(error)
        }
    }

export {junienTiedot, liveTrains, trainLocations}; 