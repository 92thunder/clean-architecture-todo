import { Task, TaskState } from './types'

export function changeState(task: Task, taskState: TaskState): Task {
  return {
    ...task,
    state: taskState
  }
}
