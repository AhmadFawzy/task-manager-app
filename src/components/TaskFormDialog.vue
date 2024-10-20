<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

const statusOptions = computed(() => {
  return [
    { title: 'To do', value: 'to do' },
    { title: 'In Progress', value: 'in progress' },
    { title: 'Done', value: 'done' }
  ]
})

const store = useStore();
const dialog = computed(() => store.state.dialog);
const selectedTask = computed(() => store.state.selectedTask);
const formTitle = computed(() => selectedTask.value?`Edit task with id: ${selectedTask.value.id}`:'Add a new task!')
const submitBtnText = computed(() => selectedTask.value?'Save':'Add')

const toggleDialog = () => store.commit('toggleDialog');

const validationSchema = toTypedSchema(
  zod.object({
    id: zod.string().optional(),
    title: zod
      .string({ message: 'Title is required' })
      .min(3, { message: 'Must be more than 2 characters' })
    ,
    description: zod
      .string()
      .optional()
    ,
    status: zod
      .string()
      .optional()
  })
);

const { handleSubmit, handleReset, setValues, errors, initialValues } = useForm({ validationSchema, initialValues: { title: '', description: '', status: 'to do' } });
const { value: id } = useField('id');
const { value: title } = useField('title');
const { value: description } = useField('description');
const { value: status } = useField('status') as unknown as { value: string | null | undefined };

const onSubmit = handleSubmit(values => {
  const taskValues = values;
  if(taskValues?.id) store.dispatch('updateTask', { id: taskValues.id, updatedTask: taskValues })
  else {
    delete taskValues.id
    store.dispatch('addTask', taskValues);
  }
  toggleDialog();
  handleReset();
});
const onCancel = () => {
  toggleDialog();
  handleReset();
}

onMounted(() => {
  if(selectedTask.value) {
    const { id, title, description, status } = selectedTask.value
    setValues({
      'id': id,
      'title': title,
      'description': description,
      'status': status
    })
  }
})
onUnmounted(() => {
  store.dispatch('updateSelectedTask', null)
})
</script>

<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-plus" :title="formTitle">
      <form @submit="onSubmit">
        <v-card-text>
          <v-text-field v-if="false" name="id" v-model="id" :initial-values="initialValues.id" class="d-none"/>
          <v-text-field name="title" v-model="title" :initial-values="initialValues.title" :error-messages="errors.title" label="Title" />
          <v-textarea v-model="description" :initial-values="initialValues.description" name="description" label="Description" clearable />
          <v-select
            name="status"
            label="Status"
            item-title="title"
            item-value="value"
            v-model="status"
            :initial-values="initialValues.status"
            :items="statusOptions"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="onCancel">Cancel</v-btn>
          <v-btn type="submit">{{ submitBtnText }}</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>