<template>
  <div class="home">
    <h1>Current weather app</h1>
    <label for="city">Enter city: </label>
    <input type="text" name="city" v-model.lazy="location" />
    <button @click="getCoords">get data</button>
  </div>
  <template v-if="weatherInfo">
    <p>{{weatherInfo.main.temp}} C</p>
    <p>{{weatherInfo.weather[0].main}} - {{weatherInfo.weather[0].description}}</p>
  </template>
</template>

<script>
import API_KEY from '@/API_KEYS.txt';

export default {
  name: 'HomeView',
  data() {
    return {
      location: "",
      key: API_KEY,
      coords: {
        latitude: "",
        longitude: ""
      },
      weatherInfo: null
    }
  },
  methods: {
    async getCoords() {
      try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${this.location}&appid=${this.key}`);
        const data = await response.json();
         
        this.coords.latitude = data[0].lat;
        this.coords.longitude = data[0].lon;

        if(data.length != 0) this.getWeather();
      } catch(error){
        console.log(error);
      }
    },
    async getWeather() {
      try {
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.coords.latitude}&lon=${this.coords.longitude}&appid=${this.key}&units=metric`);
        const data = await weather.json();

        this.weatherInfo = data;
      } catch(error) {
        console.log(error);
      }
    }
  }
}
</script>
