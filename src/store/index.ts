import Vue from "vue";
import Vuex from "vuex";
import * as task from "./modules/task";

Vue.use(Vuex);

export interface RootState {
  task: task.TaskState;
}

export default new Vuex.Store<RootState>({
  modules: {
    task: task.store
  }
});
