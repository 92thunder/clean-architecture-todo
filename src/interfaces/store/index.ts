import Task from '@/entities/Task'

export interface TaskStoreState {
  tasks: Task[]
}

export interface TaskStoreActions {
  add: (task: Task) => void
  update: ({ index, task }: { index: number; task: Task }) => void
}
