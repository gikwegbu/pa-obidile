import { defineStore } from 'pinia'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from 'src/boot/firebase'
import {  Notify } from 'quasar'

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
    userName: '',
    userEmail: '',
    userToken: '',
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
    getUserDetails(state) {
      return {
        name : state.userName ,
        email : state.userEmail,
        token : state.userToken
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
    getSenderName(state) {
      const _ = this
      var _name = ''
      if(_.getAdminDetails.name.length) {
        _name = _.getAdminDetails.name;
      } else if (_.getUserDetails.name.length) {
        _name = _.getUserDetails.name
      } else  {
        _name = 'UNKNOWN USER'
      }
      return _name;
    }
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
    deleteContentFromDb(type, id) {
      const _ = this
      var index = 0
      var _tArr = _.tributeArr
      var _sArr = _.tributeArr
      switch (type) {
          case 'tribute':
            index = _.tributeArr.findIndex(val => val.id == id)
            console.log("Calling Tributes before:: ", _.tributeArr.length)
            _.tributeArr.splice(index, 1)
            console.log("Calling Tributes after:: ", _.tributeArr.length)
            break;
          case 'stories':
              index = _.storiesArr.findIndex(val => val.id == id)
              _.storiesArr.splice(index, 1)
            break;
          default:
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
    },
    userGoogleAuthentication() {
      const _ = this;
      const auth = getAuth();
      signInWithPopup(auth, provider)
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          _.userName = user.displayName;
          _.userEmail = user.email;
          _.userToken = user.uid;
          _.notify('Successfully Signed In', 'green')
          // ...
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          _.notify(error.message, 'red')
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
      });

    },
    checkUserLoggedIn() {
      const _  = this;
      return _.getUserDetails.token.length ? true : false;
    },
    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    },
    logoutUser(){
      this.userName = ""
      this.userEmail = ""
      this.userToken = ""
    }
  }
})
