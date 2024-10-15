import React, { useRef, useState } from "react";
import {Text, Animated, PanResponder, StyleSheet, View } from "react-native";

    // Junien tiedot (/trains)

const junienTiedot=async()=>{
    try{
        let response=await fetch("https://rata.digitraffic.fi/api/v1/trains/");
        let json=await response.json();
        json.forEach(train => {
            console.log(train.timeTableRows)
        });
        //console.log(json)
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

            const junadata = json.map(train => ({
                    key: train.trainNumber.toString(),
                    trainNumber: train.trainNumber,
                    trainType: train.trainType,
                    timetable: train.timeTableRows.map(row => ({
                        commercialTrack: row.commercialTrack
                    }))                
            }));

            return junadata;

            // json.forEach(train => {
            //     const trainNumber = train.trainNumber;
            //     const trainType = train.trainType;

            //     train.timeTableRows.forEach(row => {
            //         const commercialTrack = row.commercialTrack;
            //         const actualTime = row.actualTime;

            //         console.log(`train number: ${trainNumber}`);
            //         console.log(`Train type: ${trainType}`);
            //         console.log(`Commercial Track: ${commercialTrack}`);
            //         console.log(`Actual Time: ${actualTime}`);
            //     })
            // })
            //console.log(json);
        }
        catch(error){
            console.log(error)
            throw error;
        }
    }

    // Junan GPS-sijainnit (/train-locations). Tiedot saa GeoJSON muodossa lisäämällä urlin train-locations perään .geojson
    const trainLocations=async()=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/train-locations/latest/");
            let json=await response.json();
            json.forEach(train => {
                console.log(train.location.coordinates)
            });
            console.log(json);
        }
        catch(error){
            console.log(error)
        }
    }



export {junienTiedot, liveTrains, trainLocations}; 