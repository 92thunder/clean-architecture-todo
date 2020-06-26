import {
  Mutations,
  Actions,
  Getters,
  Module,
  createMapper
} from 'vuex-smart-module'

class state {
  messages: string[] = []
}

class getters extends Getters<state> {
  get messages() {
    return this.state.messages
  }
}

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
class mutations extends Mutations<state> {
  addMessage(message: string) {
    this.state.messages.push(message)
  }

  clearMessages() {
    this.state.messages.splice(0, this.state.messages.length)
  }
}

// 状態の更新はVuex流に合わせ、API通信などについてはusecase側にロジックを隠蔽する
class actions extends Actions<state, getters, mutations> {
  showFlash(message: string) {
    this.commit('addMessage', message)
    window.setTimeout(() => this.commit('clearMessages', undefined), 3000)
  }
}

export const flash = new Module({
  state,
  mutations,
  actions,
  getters
})

export const flashMapper = createMapper(flash)
