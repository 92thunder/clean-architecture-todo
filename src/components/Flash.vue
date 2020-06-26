<template>
  <div class="flash">
    <div class="message" v-for="(message, index) in messages" :key="index">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { flashMapper } from '@/store/modules/flash'

export default Vue.extend({
  name: 'Flash',

  computed: flashMapper.mapGetters(['messages'])
})
</script>

<style scoped>
.flash {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.message {
  text-align: center;
  max-width: 80%;
  width: auto;
  border: red 1px solid;
  background: pink;
  border-radius: 4px;
  margin-top: 3px;
  padding: 2px 4px;
}
</style>
