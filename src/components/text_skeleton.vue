<template>
    <div class="full-width q-mb-lg">
        <div class="row" v-for="index in 5" :key="index">
            <q-skeleton type="text" width="full-width" style="width: 80%;" />
            <q-skeleton type="text" width="full-width" style="width: 100%;" />
            <q-skeleton type="text" width="full-width" style="width: 50%;" />
            <q-skeleton type="text" width="full-width" style="width: 100%;" />
            <q-skeleton type="text" width="full-width" style="width: 20%;" />
        </div>
    </div>
  </template>

<script>
import { defineComponent, ref } from 'vue'
// import { date } from 'quasar'

export default defineComponent({
  name: 'TextSkeleton',
  setup() {
      return {
    }
  }
})
</script>