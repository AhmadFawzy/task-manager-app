import { createStore } from 'vuex';
import type { Task } from '@/types';
import axios from '@/plugins/axios'

const store = createStore({
  state: {
    tasks: [] as Task[],
    selectedTask: null,
    dialog: false
  },
  
  getters: {
    todoTasks(state): Task[] {
      return state.tasks.filter(task => task.status === 'to do');
    },
    inProgressTasks(state): Task[] {
      return state.tasks.filter(task => task.status === 'in progress');
    },
    doneTasks(state): Task[] {
      return state.tasks.filter(task => task.status === 'done');
    }
  },
  
  mutations: {
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
    updateTask(state, { id, updatedTask }: { id: string; updatedTask: Task }) {
      const index = state.tasks.findIndex(task => task.id === id);
      if(index !== -1) state.tasks.splice(index, 1, updatedTask);
    },
    deleteTask(state, id: string) {
      const index = state.tasks.findIndex(task => task.id === id);
      if(index !== -1) state.tasks.splice(index, 1);
    },
    toggleDialog(state) {
      state.dialog = !state.dialog
    },
    updateSelectedTask(state, task) {
      state.selectedTask = task
    }
  },

  actions: {
    async getTasks({ commit }) {
      try {
        const { status, data } = await axios.get('/tasks');
        if(status === 200) commit('setTasks', data);
      }
      catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit }, task: Task) {
      try {
        const { status, data } = await axios.post('/tasks', task);
        if(status === 201) commit('addTask', data);
      } catch (error) {
        console.error(error);
      }
    },
    updateSelectedTask({ commit }, task) {
      commit('updateSelectedTask', task);
    },
    async updateTask({ commit }, { id, updatedTask }: { id: string; updatedTask: Task }) {
      try {
        const { status, data } = await axios.put(`/tasks/${id}`, updatedTask);
        if(status === 200) commit('updateTask', { id, updatedTask: data })
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit }, id: string) {
      try {
        const { status } = await axios.delete(`/tasks/${id}`)
        if(status === 200) commit('deleteTask', id)
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default store;