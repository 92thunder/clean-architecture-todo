import { createTask, setState } from '@/entities/task'
import { ITaskRepository } from '@/interfaces/repository'

export class TaskService {
  repository: ITaskRepository

  constructor(repository: ITaskRepository) {
    this.repository = repository
  }

  addTask(title: string) {
    try {
      const task = createTask(title)
      const tasks = this.repository.add(task)
      return tasks
    } catch (e) {
      throw e
    }
  }

  complete(index: number) {
    const tasks = this.repository.load()
    const task = tasks[index]
    const completedTask = setState(tasks[index], 'DONE')
    tasks[index] = task
    this.repository.save(tasks)
    return completedTask
  }

  load() {
    const tasks = this.repository.load()
    return tasks
  }
}
