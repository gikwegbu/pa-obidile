import { defineStore } from 'pinia'

export const useDbStore = defineStore('counter', {
  persist: true,
  state: () => ({
    counter: 0,
    adminToken: '',
    adminName: '',
    adminEmail: '',
    currentImage: '',
    tributeArr: [],
    storiesArr: [],
    imageArr: [],
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    },
    getAdminDetails(state) {
      return {
        name : state.adminName ,
        email : state.adminEmail,
        token : state.adminToken
      }
    },
    getCurrentImage(state) {
      return state.currentImage;
    },
    getAdminDashboardMetric(state) {
      return {
        tributeArr: state.tributeArr,
        storyArr   : state.storiesArr,
        imageArr    : state.imageArr
      };
    },
  },

  actions: {
    increment () {
      this.counter++
    },
    addContentToDb(type, content) {
      const _ = this;
      switch (type) {
          case 'tribute':
            _.tributeArr = content;
              break;
          case 'stories':
            _.storiesArr = content
            break;
          case 'images':
            _.imageArr = content
            break;
          default:
              break;
      }
    },
    loginAdmin (name, email, token) {
      this.adminName = name
      this.adminEmail = email
      this.adminToken = token
    },
    logoutAdmin() {
      this.adminName = ""
      this.adminEmail = ""
      this.adminToken = ""
    }
  }
})
