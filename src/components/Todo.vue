<template>
  <div>
    <h1>TODO</h1>
    <input @keydown.enter="add" v-model="text" />
    <Flash />
    <ul>
      <li
        v-for="(task, index) in tasks"
        :key="index"
        :class="{ strike: !isCompleted(task) }"
      >
        {{ task.title }}
        <button v-if="isCompleted(task)" @click="close(index)">
          &#x2715;
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Task } from '../domain/task'
import { taskMapper } from '@/store/modules/task'
import Flash from './Flash.vue'

export default Vue.extend({
  name: 'Todo',

  components: {
    Flash
  },

  data: (): { text: string } => ({
    text: ''
  }),

  created() {
    this.load()
  },

  computed: taskMapper.mapGetters(['tasks']),

  methods: {
    ...taskMapper.mapActions(['addTask', 'complete', 'load']),

    add() {
      this.addTask(this.text)
      this.text = ''
    },
    close(index: number) {
      this.complete(index)
    },
    isCompleted(task: Task) {
      return task.state !== 'DONE'
    }
  }
})
</script>

<style scoped>
.strike {
  text-decoration: line-through;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
