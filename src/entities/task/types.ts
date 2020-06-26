export type TaskState = 'TODO' | 'DONE'

export type Task = Readonly<{
  title: string
  description: string
  state: TaskState
}>
