import { Task } from './types'

export function createTask(title: string): Task {
  if (!title) {
    throw new Error('タイトルの形式が不正です')
  }
  return {
    title,
    description: '',
    state: 'TODO'
  }
}
