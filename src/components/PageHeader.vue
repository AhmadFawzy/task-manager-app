<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();

const createTask = () => {
  store.commit('toggleDialog')
}
</script>

<template>
  <v-card class="d-flex justify-space-between align-center flex-wrap rounded-lg bg-grey-lighten-3 mt-6 px-2 py-1">
    <h1>Tasks List</h1>
    <v-btn @click="createTask" class="rounded-lg" variant="tonal" prepend-icon="mdi-plus">Add Task</v-btn>
  </v-card>
</template>