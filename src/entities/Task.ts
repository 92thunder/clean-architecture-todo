// Task entity

export default interface Task {
  title: string
  description: string
  state: TaskState
}

export type TaskState = 'TODO' | 'DONE'

// ビジネスロジック
export function setState(task: Task, taskState: TaskState): Task {
  return {
    ...task,
    ...{ state: taskState }
  }
}
