import { Task } from '@/domain/task'

export interface ITaskRepository {
  load: () => Task[]
  save: (tasks: Task[]) => void
  add: (task: Task) => Task[]
}
