<template>
  <div>
    <h1>TODO</h1>
    <input @keydown.enter="add" v-model="text" />
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
import Task from '../entities/Task'
import { controllersMapper } from '@/store/modules/controllers'
import { taskMapper } from '@/store/modules/domain/task'

export default Vue.extend({
  name: 'Todo',
  data: (): { text: string } => ({
    text: ''
  }),

  computed: taskMapper.mapGetters(['tasks']),

  methods: {
    ...controllersMapper.mapActions(['addTask', 'complete']),

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
}
</style>
