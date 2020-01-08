import Vue from 'vue'
import Vuex from 'vuex'
import { task } from './modules/domain/task'
import { controllers } from './modules/controllers'
import { createStore, Module } from 'vuex-smart-module'

Vue.use(Vuex)

const root = new Module({
  modules: {
    controllers,
    task
  }
})

export const store = createStore(root, {
  strict: process.env.NODE_ENV !== 'production'
})
