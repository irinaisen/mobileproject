import React, { useRef, useState } from "react";
import {Text, Animated, PanResponder, StyleSheet, View } from "react-native";

    // Asemien tiedot dropdown menuun
    const stations=async()=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/metadata/stations");
            let json=await response.json();
            const parsitutAsemat = json.map(station => ({
                label: station.stationName,
                value: station.stationShortCode
            }))
            console.log(parsitutAsemat)
            return parsitutAsemat
        }
        catch(error){
            console.log(error);
        }
        }

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

            // Filtteröi pois "turhat" junat. Esimerkiksi rahtijunat ym. jotka ei liity matkustamiseen
            const suodataJunat = json.filter(train =>
                train.trainCategory === "Long-distance" || train.trainCategory === "Commuter" || train.trainCategory === "Shunting"
            );

            // Suodatetuista junista luodaan haluttu data ja palautetaan flatlistiin
            const junadata = suodataJunat.map(train => ({
                    key: train.trainNumber.toString(),
                    trainNumber: train.trainNumber,
                    trainType: train.trainType,
                    timetable: train.timeTableRows
                        .filter(row => row.stationShortCode === asema)  // Filter based on asema
                        .map(row => {
                            let status = "";

                            if (typeof row.differenceInMinutes === "number"){
                                if (row.differenceInMinutes > 0){
                                    status = `Juna on myöhässä ${row.differenceInMinutes} minuuttia`
                                } else if (row.differenceInMinutes === 0){
                                    status = `Juna on aikataulussa`
                                } else {
                                    status = `Juna on etuajassa ${Math.abs(row.differenceInMinutes)} minuuttia`
                                }
                            } else {
                                status = null;
                            }
                            return{
                            type: row.type === "ARRIVAL" ? "Saapuva" : "Lähtevä",
                            commercialTrack: row.commercialTrack,
                            scheduledTime: formatTime(row.scheduledTime),
                            status: status
                            };
                        })
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

    const formatTime = (aika) => {
        const date = new Date(aika);
    
        // const day = String(date.getDate()).padStart(2, '0');
        // const month = String(date.getMonth() + 1).padStart(2, '0');
        // const year = date.getFullYear();

        date.setHours(date.getHours() + 3);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0')
    
        return `${hours}:${minutes}`;
      };



export {junienTiedot, liveTrains, trainLocations, stations}; 