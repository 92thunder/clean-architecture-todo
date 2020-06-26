import { createTask, setState } from '@/domain/task'
import { ITaskRepository } from '@/interfaces/repository'

export class TaskService {
  repository: ITaskRepository

  constructor(repository: ITaskRepository) {
    this.repository = repository
  }

  addTask(title: string) {
    try {
      // Domain/utilsでtask作成
      const task = createTask(title)

      // Repositoryを使って保存する
      const tasks = this.repository.add(task)

      return tasks
    } catch (e) {
      throw e
    }
  }

  complete(index: number) {
    const tasks = this.repository.load()
    const completedTask = setState(tasks[index], 'DONE')
    tasks[index] = completedTask
    this.repository.save(tasks)
    return completedTask
  }

  load() {
    const tasks = this.repository.load()
    return tasks
  }
}
