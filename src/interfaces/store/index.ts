import { Task } from '@/entities/task'

export interface TaskStoreState {
  tasks: Task[]
}

export interface TaskStoreActions {
  add: (task: Task) => void
  update: ({ index, task }: { index: number; task: Task }) => void
}
