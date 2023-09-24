<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="hidden">
        <q-toolbar-title>
          <q-avatar>
            <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"> -->
            <img src="~assets/candle.png">
          </q-avatar>
          Forever in our Hearts
        </q-toolbar-title>

        <!-- Volume button -->
        <!-- volume_off -->
        <q-btn flat round dense icon="volume_up" class="q-mr-xs" /> 
        <q-tabs v-model="tab" shrink>
          <q-tab name="tab1" label="Sign in" />
          <q-tab name="tab2" label="Invite People" />
          <q-tab name="tab3" label="Contact Us" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({ 
  name: 'MainLayout',

  created () {
    this.$q.addressbarColor.set('#a2e3fa')
  },

  components: {
  },

  setup () {
    return {
      tab:  ref('')
    }
  }
})
</script>
