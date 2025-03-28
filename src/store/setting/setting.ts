import { defineStore } from 'pinia'

const useSettingStore = defineStore('setting', {
  state: () => ({
    isFold: false
  }),

  actions: {
    isFoldChance(value: boolean) {
      this.isFold = value
    }
  }
})

export default useSettingStore
