<template>
    <div class="q-pa-md" style="border-radius: 10px; background-color: rgba(128, 128, 128, 0.11);">
      <div class="q-mb-md text-h6 text-center">
        50 Pictures
      </div>
      <q-carousel
        animated
        v-model="slide"
        infinite
        :autoplay="true"
        transition-prev="slide-down"
        transition-next="jump-up"
        >
        <!-- transition-next="rotate" -->
        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg"/>
        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
      </q-carousel>

      <div class="q-mt-md">
        <q-btn outline icon="add" label="Add Pictures" class="full-width"></q-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
  name: 'ImageCarousel',
  components: {
  },
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>