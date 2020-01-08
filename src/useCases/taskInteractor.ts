import Task, { setState, TaskState } from '../entities/Task'

// storeなどの仕組みには関知しない形でロジックを実装する
// repository, api などを受け取れるような高階関数にする
export const addTask = (/*{ repository, api }*/) => (
  tasks: Task[],
  task: Task
) => {
  const addedTasks = tasks.concat(task)

  // repository(データ永続化)
  // repository.addTask()

  // api
  // api.save()

  return addedTasks
}

export const complete = () => (task: Task) => {
  return setState(task, TaskState.DONE)
}
