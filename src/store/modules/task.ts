import { Module, MutationTree, ActionTree } from "Vuex";
import Task from "../../entities/Task";
import { RootState } from "../index";
import { addTask, complete } from '@/useCases/taskInteractor';

export interface TaskState {
  tasks: Task[];
}

export const state: TaskState = {
  tasks: []
};

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
const mutations: MutationTree<TaskState> = {
  updateTasks: (state, tasks: Task[]) => {
    state.tasks = tasks;
  },
  updateTask: (state, { index, task }: { index: number, task: Task }) => {
    state.tasks.splice(index, 1, task);
  }
};

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
const actions: ActionTree<TaskState, RootState> = {
  addTask: ({ commit, state }, task: Task) => {
    commit('updateTasks', addTask()(state.tasks, task));
  },
  complete: ({ commit }, index: number) => {
    commit('updateTask', { index, task: complete()(state.tasks[index]) });
  }
};

export const store: Module<TaskState, RootState> = {
  state,
  mutations,
  actions
};
