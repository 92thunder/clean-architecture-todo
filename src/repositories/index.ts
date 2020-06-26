import { ITaskRepository } from '@/interfaces/repository/index'
import { Task } from '@/entities/task'

const KEY = 'tasks'

interface IStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export class TaskRepository implements ITaskRepository {
  storage: IStorage

  constructor() {
    this.storage = localStorage
  }

  load() {
    const tasksStr = this.storage.getItem(KEY)
    return tasksStr ? JSON.parse(tasksStr) : []
  }

  add(task: Task) {
    const tasks = this.load()
    tasks.push(task)
    this.save(tasks)
    return tasks
  }

  save(tasks: Task[]) {
    this.storage.setItem(KEY, JSON.stringify(tasks))
  }
}
