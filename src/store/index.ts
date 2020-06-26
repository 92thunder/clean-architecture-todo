import Vue from 'vue'
import Vuex from 'vuex'
import { task } from './modules/task'
import { createStore, Module } from 'vuex-smart-module'

Vue.use(Vuex)

const root = new Module({
  modules: {
    task
  }
})

export const store = createStore(root, {
  strict: process.env.NODE_ENV !== 'production'
})
