<template>
  <q-page class="bg-white">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" > -->
    <!-- desktop-only -->
    <div class="heroSection">
      <div class="q-pa-md  row items-start q-gutter-md">
        <div class="col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
        <div class="col-xs-12 col-sm flex flex-center">
          <q-img 
            class="rounded" 
            style="border-radius: 10px;"
            src="https://media.istockphoto.com/id/912073272/photo/happy-senior-man-sitting-at-home.jpg?s=612x612&w=0&k=20&c=O_e4_qWJJNvrRzU9pRvI3TiDbxpPUbHQxtA3D6eWZNs=">
            <div class="absolute-bottom text-subtitle1 text-center">
              Obidile
            </div>
          </q-img>
        </div>
        <div class="col-sm col-12 flex flex-center">
          
        </div>

      </div>
      <q-tabs v-model="tab" align="center" narrow-indicator class="q-mb-lg q-pb-md " >
        <q-tab class="text-white" name="about" label="About" />
        <q-tab class="text-white" name="life" label="Life" />
        <q-tab class="text-white" name="gallery" label="Gallery" />
        <q-tab class="text-white" name="stories" label="Stories" />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated transition-prev="fade" transition-next="fade" class="" >
          <q-tab-panel name="about">
            <AboutSection/>
          </q-tab-panel>

          <q-tab-panel name="life">
            <LifeSection/>
          </q-tab-panel>

          <q-tab-panel name="gallery">
            <div class="flex justify-end q-mb-lg">
              <q-btn glossy color="secondary" icon="add" label="Add"></q-btn>
            </div>
            <GallerySection />
            <div class="flex justify-center q-mt-lg">
              <q-btn glossy color="secondary" icon="add" label="Add" class=""></q-btn>
            </div>
          </q-tab-panel>
          <q-tab-panel name="stories">
            <StoriesSection />>
          </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

<style>
  .heroSection {
    /* height: 600px; */
    background-image: url("https://t3.ftcdn.net/jpg/05/50/73/66/360_F_550736697_UTL4e61oXNfnEedZy2brWpHwikYzIpXq.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
  }
</style>

<script>
import { defineComponent, ref } from 'vue'
import AboutSection from 'components/about_section/about.vue'
import GallerySection from 'components/gallery_section/gallery.vue'
import LifeSection from 'components/life_section/life.vue'
import StoriesSection from 'components/stories_section/stories.vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    AboutSection,
    GallerySection,
    LifeSection,
    StoriesSection,
  },

  setup() {
    return {
      tab: ref('about')
    }
  }
})
</script>
