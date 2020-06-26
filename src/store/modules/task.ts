import {
  Mutations,
  Actions,
  Getters,
  Module,
  createMapper
} from 'vuex-smart-module'
import { Task } from '@/entities/task'
import { TaskService } from '@/services/TaskService'
import { TaskRepository } from '@/repositories'

class state {
  tasks: Task[] = []
}

class getters extends Getters<state> {
  get tasks() {
    return this.state.tasks
  }
}

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
class mutations extends Mutations<state> {
  updateTasks(tasks: Task[]) {
    this.state.tasks = tasks
  }

  updateTask({ index, task }: { index: number; task: Task }) {
    this.state.tasks.splice(index, 1, task)
  }
}

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
class actions extends Actions<state, getters, mutations> {
  taskService!: TaskService

  $init() {
    this.taskService = new TaskService(new TaskRepository())
  }

  update({ index, task }: { index: number; task: Task }) {
    this.commit('updateTask', {
      index,
      task
    })
  }

  addTask(title: string) {
    const tasks = this.taskService.addTask(title)

    this.commit('updateTasks', tasks)
  }

  complete(index: number) {
    const completedTask = this.taskService.complete(index)
    this.commit('updateTask', { index, task: completedTask })
  }

  load() {
    const tasks = this.taskService.load()
    this.commit('updateTasks', tasks)
  }
}

export const task = new Module({
  state,
  mutations,
  actions,
  getters
})

export const taskMapper = createMapper(task)
