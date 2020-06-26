import { Task, TaskState } from './types'

export function setState(task: Task, taskState: TaskState): Task {
  return {
    ...task,
    state: taskState
  }
}
