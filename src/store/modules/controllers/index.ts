import {
  Mutations,
  Actions,
  Getters,
  Module,
  createMapper
} from 'vuex-smart-module'
import Task from '@/entities/Task'
import { TaskInteractor } from '@/useCases/taskInteractor'
import { TaskState } from '@/entities/Task'
import { Store } from 'vuex'
import { task } from '../domain/task'

class state {}

class getters extends Getters<state> {}

class mutations extends Mutations<state> {}

class actions extends Actions<state, getters, mutations> {
  taskInteractor!: TaskInteractor

  $init(store: Store<any>) {
    this.taskInteractor = new TaskInteractor(task.context(store))
  }

  addTask(title: string) {
    if (!title) {
      return
    }

    const task: Task = {
      title,
      description: '',
      state: TaskState.TODO
    }
    this.taskInteractor.addTask(task)
  }

  complete(index: number) {
    this.taskInteractor.complete(index)
  }
}

export const controllers = new Module({
  actions
})

export const controllersMapper = createMapper(controllers)
