<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const toggleTheme = () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
const themeValue = computed(() => theme.global.name.value);
</script>

<template>
  <v-app-bar title="Task Manager App">
    <v-spacer />
    <v-btn
      :prepend-icon="themeValue === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      text="Toggle Theme"
      slim
      class="rounded-lg"
      variant="tonal"
      @click="toggleTheme"
    />
  </v-app-bar>
</template>