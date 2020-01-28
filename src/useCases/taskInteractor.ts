import Task, { setState } from '../entities/Task'
import { TaskStoreState, TaskStoreActions } from '@/interfaces/store'
import { ITaskRepository } from '@/interfaces/repository'

interface TaskStoreModule {
  state: TaskStoreState
  actions: TaskStoreActions
}

export class TaskInteractor {
  store: TaskStoreModule
  repository: ITaskRepository

  constructor(store: TaskStoreModule, repository: ITaskRepository) {
    this.store = store
    this.repository = repository
  }

  addTask(task: Task) {
    // store
    this.store.actions.add(task)

    const tasks = this.store.state.tasks

    // repository
    this.repository.save(tasks)

    // api
    // this.api.save(tasks)
  }

  complete(index: number) {
    const task = this.store.state.tasks[index]
    this.store.actions.update({ index, task: setState(task, 'DONE') })

    const tasks = this.store.state.tasks
    this.repository.save(tasks)
  }

  load() {
    const tasks = this.repository.load()

    tasks
      .filter(task => task.state === 'TODO')
      .forEach(task => {
        this.store.actions.add(task)
      })
  }
}
