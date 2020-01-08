import Task, { setState } from '../entities/Task'

export interface TaskStoreState {
  tasks: Task[]
}
export interface TaskStoreActions {
  add: (task: Task) => void
  update: ({ index, task }: { index: number; task: Task }) => void
}

interface TaskStoreModule {
  state: TaskStoreState
  actions: TaskStoreActions
}

export class TaskInteractor {
  store: TaskStoreModule

  constructor(store: TaskStoreModule) {
    this.store = store
  }

  addTask(task: Task) {
    // store
    this.store.actions.add(task)

    // repository
    // this.repository.save(tasks)

    // api
    // this.api.save(tasks)
  }

  complete(index: number) {
    const task = this.store.state.tasks[index]
    this.store.actions.update({ index, task: setState(task, 'DONE') })
  }
}
