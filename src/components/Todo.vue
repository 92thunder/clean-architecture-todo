<template>
  <div>
    <h1>TODO</h1>
    <input @keydown.enter="addTask" v-model="text" />
    <ul>
      <li
        v-for="(task, index) in tasks"
        :key="index"
        :class="{ strike: !isCompleted(task) }"
      >
        {{ task.title }}
        <button v-if="isCompleted(task)" @click="complete(index)">
          &#x2715;
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Task, { TaskState } from '../entities/Task'
// シングルトンを直でインポートするとコンテキストを注入できないため
// テストやSSRなどの時に困る可能性がありそう
// import store from '../store';

export default Vue.extend({
  name: 'Todo',
  data: (): { text: string } => ({
    text: ''
  }),
  computed: {
    tasks(): Task[] {
      return this.$store.state.task.tasks
    }
  },
  methods: {
    // Viewとロジックを分離したいのでprops経由で
    addTask() {
      // 入力値をusecaseのいいようにいじってやるcontroller的な役割になってるかも
      const task: Task = {
        title: this.text,
        description: '',
        state: TaskState.TODO
      }

      this.$store.dispatch('addTask', task)

      this.text = ''
    },
    complete(index: number) {
      this.$store.dispatch('complete', index)
    },
    isCompleted(task: Task) {
      return task.state !== TaskState.DONE
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
