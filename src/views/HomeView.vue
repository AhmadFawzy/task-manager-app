<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import AHeader from '@/components/AHeader.vue'
import TaskFormDialog from '@/components/TaskFormDialog.vue';
import EmptyTasks from '@/components/EmptyTasks.vue';
import Tasks from '@/components/Tasks.vue';
import PageHeader from '@/components/PageHeader.vue';

const store = useStore();
const tasksLength = computed(() => store.state.tasks.length);
const ifTaskFormDialogDisplay = computed(() => store.state.dialog)

onMounted(() => store.dispatch('getTasks'));
</script>

<template>
  <v-app>
    <AHeader />
    <v-main>
      <v-container>
        <PageHeader />
        <Tasks v-if="tasksLength" />
        <EmptyTasks v-else />
        <TaskFormDialog v-if="ifTaskFormDialogDisplay" />
      </v-container>
    </v-main>
  </v-app>
</template>
