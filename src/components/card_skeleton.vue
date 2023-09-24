<template>
    <div class="full-width q-mb-lg">
      <q-card class="">
        <q-item>
            <q-item-section avatar>
                <q-skeleton type="QBtn" />
            </q-item-section>
            
            <q-item-section>
                <q-item-label>
                    <q-skeleton type="QBadge" />
                </q-item-label>
                <q-item-label caption>
                    <q-skeleton type="text" />
                </q-item-label>
            </q-item-section>
        </q-item>
  
        <q-skeleton height="200px" square />
  
        <q-card-actions class="flex justify-between q-gutter-md">
          <q-skeleton type="QBtn" />
          <q-skeleton type="QBtn" />
        </q-card-actions>
      </q-card>
    </div>
  </template>

<script>
import { defineComponent, ref } from 'vue'
// import { date } from 'quasar'

export default defineComponent({
  name: 'SkeletonCard',
  setup() {
      return {
    }
  }
})
</script>