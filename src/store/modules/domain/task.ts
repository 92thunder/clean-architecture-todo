import {
  Mutations,
  Actions,
  Getters,
  Module,
  createMapper
} from 'vuex-smart-module'
import Task from '../../../entities/Task'
import { TaskStoreActions, TaskStoreState } from '@/useCases/taskInteractor'

class state implements TaskStoreState {
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
class actions extends Actions<state, getters, mutations>
  implements TaskStoreActions {
  add(task: Task) {
    this.commit('updateTasks', this.state.tasks.concat(task))
  }
  update({ index, task }: { index: number; task: Task }) {
    this.commit('updateTask', {
      index,
      task
    })
  }
}

export const task = new Module({
  state,
  mutations,
  actions,
  getters
})

export const taskMapper = createMapper(task)
