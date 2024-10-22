import React, { useRef, useState } from "react";
import {Text, Animated, PanResponder, StyleSheet, View } from "react-native";

    // Asemien tiedot dropdown menuun
    const stations=async()=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/metadata/stations");
            let json=await response.json();
            // Mappaa aseman nimen ja asemakoodin
            const parsitutAsemat = json.map(station => ({
                label: station.stationName,
                value: station.stationShortCode
            }))
            //console.log(parsitutAsemat)
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

    // Aktiivisten junien seuranta (/live-trains). Ottaa parametriksi dropdownista valitun aseman lyhenteen
    const liveTrains=async(asema)=>{
        try{
            let response=await fetch("https://rata.digitraffic.fi/api/v1/live-trains/station/"+ asema);
            let json=await response.json();

            // Filtteröi pois "turhat" junat. Esimerkiksi rahtijunat ym. jotka ei liity matkustamiseen
            const suodataJunat = json.filter(train =>
                train.trainCategory === "Long-distance" || train.trainCategory === "Commuter" 
            );

            // Suodatetuista junista luodaan haluttu data ja palautetaan flatlistiin
            const junadata = suodataJunat.map((train) => {
                const timeTableRows = train.timeTableRows;
          
                // Hakee lähtö ja pääteasemat junille
                const departureStation = timeTableRows.find((row) => row.type === "DEPARTURE")?.stationShortCode;
                const destinationStation = timeTableRows
                  .slice() // Luo kopion timeTableRoweista
                  .reverse() // Päätepysäkkiä varten timeTableRowien järjestys käännetään, koska päätepysäkki tulee viimeisenä objektina.
                  .find((row) => row.type === "ARRIVAL")?.stationShortCode; // Palauttaa ensimmäisen Arrival aseman lyhenteen 
          
                // Palauttaa järjestyksen alkuperäiseen muotoon
                timeTableRows.reverse();
          
                return {
                  key: train.trainNumber.toString(),
                  trainNumber: train.trainNumber,
                  trainType: train.trainType,
                  departureStation: departureStation, 
                  destinationStation: destinationStation, 
                  timetable: timeTableRows
                    .filter((row) => row.stationShortCode === asema) // Filtteröi rivit asematunnuksen mukaan 
                    .map((row) => {
                      let status = ""; 
          
                      // Check the differenceInMinutes and set status accordingly
                      if (typeof row.differenceInMinutes === "number") {
                        if (row.differenceInMinutes > 0) {
                          status = `Juna on myöhässä ${row.differenceInMinutes} minuuttia`;
                        } else if (row.differenceInMinutes === 0) {
                          status = `Juna on aikataulussa`;
                        } else {
                          status = `Juna on etuajassa ${Math.abs(row.differenceInMinutes)} minuuttia`;
                        }
                      } else {
                        status = "";
                      }
          
                      return {
                        type: row.type === "ARRIVAL" ? "Saapuva" : "Lähtevä", // Suomennos
                        commercialTrack: row.commercialTrack, 
                        scheduledTime: formatTime(row.scheduledTime), 
                        status: status, 
                      };
                    }),
                };
              });
              console.log("Generated junadata:", JSON.stringify(junadata, null, 2));
              // Poistaa ylimääräiset timetablerowit, ettei väliasemilta tule kahta tietoa. 
              junadata.forEach((train) => {
                if (train.timetable.length > 1) {
                    train.timetable = [train.timetable[0]]; 
                }
            });
            return junadata;
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