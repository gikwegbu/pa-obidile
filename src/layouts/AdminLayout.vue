<template>
    <q-layout view="hHh lpR fFf">
  
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
  
          <q-toolbar-title>
            Dashboard
          </q-toolbar-title>

          <q-btn flat round  color="red" icon="logout" class="q-mr-xs" @click="logout()" />
        </q-toolbar>
      </q-header>
  
      <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable :active="$route.name == 'Dashboard'" @click="navigateTo('Dashboard')">
                <q-item-section avatar >
                    <q-icon name="edit" />
                </q-item-section>

                <q-item-section>
                    <q-item-label> Content Editor</q-item-label>
                    <q-item-label caption> create and modify written articles here </q-item-label>
                </q-item-section>
            </q-item>

            <q-item clickable :active="$route.name == 'Gallery'"  @click="navigateTo('Gallery')">
                <q-item-section avatar >
                    <q-icon name="image" />
                </q-item-section>

                <q-item-section>
                    <q-item-label> Gallery </q-item-label>
                    <q-item-label caption> upload and delete images here </q-item-label>
                </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">
              Welcome {{ dbStore.getAdminDetails.name }}
            </div>
            <div>
              {{ dbStore.getAdminDetails.email }}
            </div>
          </div>
        </q-img>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import { getAuth, signOut } from "firebase/auth";
  import { Notify } from 'quasar'
  import { useDbStore } from 'stores/db'

  export default defineComponent({
    name: 'AdminLayout',
    methods: {
      logout() {
          const _ = this;
          // Logout from firebase.
          // Clear the token store.
          // Send user to Login Screen.
          const auth = getAuth();
          signOut(auth)
          .then(() => {
              // Sign-out successful.
              _.dbStore.logoutAdmin()
              _.$router.push({
                  name: "Auth"
              })
          }) .catch((error) => {
              const errorMessage = error.message;
              _.notify(error.message, 'red');
          });
        },
      notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
      },
      navigateTo(route) {
        const _ = this
        _.$router.push({name: route});
      }
    },
    setup () {
      const leftDrawerOpen = ref(false)
  
      const dbStore = useDbStore();
      return {
        dbStore,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        },
      }
    }
  })
  </script>