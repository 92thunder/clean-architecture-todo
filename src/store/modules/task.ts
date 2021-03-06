import {
  Mutations,
  Actions,
  Getters,
  Module,
  createMapper,
  Context
} from 'vuex-smart-module'
import { Task, visibleTasks } from '@/domain/task'
import { TaskService } from '@/services/TaskService'
import { TaskRepository } from '@/repositories'
import { flash } from './flash'
import { Store } from 'vuex'

class state {
  tasks: Task[] = []
}

class getters extends Getters<state> {
  get tasks() {
    return visibleTasks(this.state.tasks)
  }
}

class mutations extends Mutations<state> {
  updateTasks(tasks: Task[]) {
    this.state.tasks = tasks
  }

  updateTask({ index, task }: { index: number; task: Task }) {
    this.state.tasks.splice(index, 1, task)
  }
}

class actions extends Actions<state, getters, mutations> {
  flash!: Context<typeof flash>
  taskService: TaskService

  constructor() {
    super()
    this.taskService = new TaskService(new TaskRepository())
  }

  $init(store: Store<any>) {
    this.flash = flash.context(store)
  }

  addTask(title: string) {
    try {
      // 永続化などアプリケーションとしての仕事はApplicationServiceに任せる
      const tasks = this.taskService.addTask(title)

      // Serviceの返り値をStoreに反映
      this.commit('updateTasks', tasks)
    } catch (e) {
      // エラーがあればUIに反映する
      this.flash.dispatch('showFlash', e.message)
    }
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
