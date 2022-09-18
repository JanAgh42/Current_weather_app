<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <button @click="con">get coords</button>
        <p>{{ weather.temperature.temp_max }}</p>
        <p>{{ weather.weather }}</p>
        <p>{{ weather.wind }}</p>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useWeatherStore } from '@/stores/weatherStore';

  const weatherStore = useWeatherStore();

  const weather = computed(() => weatherStore.weatherData);

  const con = (): void => {
    weatherStore.getCoords('Bratislov');
  }
</script>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}
</style>
