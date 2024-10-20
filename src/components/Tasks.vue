<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex';
import StatusColumn from '@/components/StatusColumn.vue';

const store = useStore();

const todoTasks = computed(() => store.getters.todoTasks);
const inProgressTasks = computed(() => store.getters.inProgressTasks);
const doneTasks = computed(() => store.getters.doneTasks);
</script>

<template>
  <v-row class="flex-lg-nowrap ga-4 my-6">
    <!-- Todo Tasks -->
    <StatusColumn header="To Do" bgColor="bg-todo" :tasks="todoTasks" />
    <!-- In Progress Tasks -->
    <StatusColumn header="In Progress" bgColor="bg-inProgress" :tasks="inProgressTasks" />
    <!-- Done Tasks -->
    <StatusColumn header="Done" bgColor="bg-done" :tasks="doneTasks" />
  </v-row>
</template>