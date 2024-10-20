<script setup lang="ts">
import type { Task } from '@/types';
import { useStore } from 'vuex';

defineProps({
  header: {
    type: String,
    default: 'To Do'
  },
  bgColor: {
    type: String,
    default: 'bg-todo'
  },
  tasks: {
    type: Array<Task>,
    default: []
  }
})

const store = useStore();
const updateSelectedTask = (task:Task) => {
  store.dispatch('updateSelectedTask', task)
  store.commit('toggleDialog')
}
const deleteTask = (id:string) => {
  store.dispatch('deleteTask', id)
}

const descriptionTextLimit = (taskDescription:String, limit:number) => taskDescription.length > limit? taskDescription.slice(0, limit)+'...' : taskDescription
</script>

<template>
  <v-col :class="`${bgColor} w-66 w-sm-50 w-md-33 flex-sm-grow-0 flex-md-grow-1 rounded-lg pa-4`">
    <template v-if="tasks.length">
      <h3>{{ header }}</h3>
      <v-card v-for="task in tasks" :key="task.id" min-width="230" class="rounded-lg mt-6" elevation="4" variant="tonal">
        <v-card-item>
          <v-card-title>{{ task.title }}</v-card-title>
        </v-card-item>
        <v-card-text>{{ descriptionTextLimit(task.description, 150) }}</v-card-text>
        <v-card-actions>
          <v-btn prepend-icon="mdi-square-edit-outline" @click="updateSelectedTask(task)">Edit</v-btn>
          <v-btn prepend-icon="mdi-trash-can-outline" @click="deleteTask(task.id)">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </template>
    <template v-else>
      <v-card class="pa-2" min-width="230" variant="plain">
        <h3>{{ header }} Empty!</h3>
      </v-card>
    </template>
  </v-col>
</template>
