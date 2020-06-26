import { ITaskRepository } from '@/interfaces/repository/index'
import { Task } from '@/entities/task'

interface IStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
}

export class TaskRepository implements ITaskRepository {
  storage: IStorage

  constructor(storage: IStorage) {
    this.storage = storage
  }

  load() {
    const tasksStr = this.storage.getItem('tasks')
    return tasksStr ? JSON.parse(tasksStr) : []
  }

  save(tasks: Task[]) {
    this.storage.setItem('tasks', JSON.stringify(tasks))
  }
}
