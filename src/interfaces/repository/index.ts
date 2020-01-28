import Task from '@/entities/Task'

export interface ITaskRepository {
  load: () => Task[]
  save: (tasks: Task[]) => void
}
