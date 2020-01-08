// Task entity
export default interface Task {
  title: string
  description: string
  state: TaskState
}

export enum TaskState {
  TODO = 'TODO',
  DONE = 'DONE'
}

// ビジネスロジック
export function setState(task: Task, taskState: TaskState): Task {
  return {
    ...task,
    ...{ state: taskState }
  }
}
