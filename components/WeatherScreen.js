import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const WeatherScreen = ({navigation}) => {
  const [weather, setWeather] = useState('Tuntematon');


  // Fetch weather data 
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://mobilistit.lm.r.appspot.com/getallweather')
        if(response){
            setWeather(response.data);
        }
        else {
            setWeather('Unknown weather. Api calls to be implemented soon!')
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchWeather();
  }, []);



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Säätiedot</Text>
      <Text>{weather}</Text>
    </View>
  );
}

export default WeatherScreen;