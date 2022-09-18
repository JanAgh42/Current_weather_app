import { reactive } from 'vue';
import { defineStore } from 'pinia'
import axios from 'axios';

import type { Coordinates, WeatherForecast } from '@/assets/customTypes';
import { coordinatesAPI, weatherAPI } from '@/assets/constants';

import API_KEY from '../API_KEYS.txt?raw';

export const useWeatherStore = defineStore('weather', () => {

  const weatherData: WeatherForecast = reactive({
    temperature: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0
    },
    weather: {
      main: '',
      description: ''
    },
    wind: {
      speed: 0,
      deg: 0
    }
  });

  const getCoords = async (location: string): Promise<void> => {
    try {
      const response = await axios.get(coordinatesAPI, {
      params: {
        q: location,
        appid: API_KEY
      }
    });

    getWeather({latitude: response.data[0].lat, longitude: response.data[0].lon});
    } catch(error) {
      console.log(error);
    }
  }

  const getWeather = async (coordinates: Coordinates): Promise<void> => {
    const response = await axios.get(weatherAPI, {
      params: {
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        appid: API_KEY,
        units: 'metric'
      }
    });

    weatherData.temperature = response.data.main;
    weatherData.weather = response.data.weather[0];
    weatherData.wind = response.data.wind;
  }
  
  return { weatherData, getCoords };
});
