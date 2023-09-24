<template>
    <div class="row q-gutter-lg flex justify-center">
        <div class="col-12 col-md-6" :class="$q.screen.lt.md ? 'q-px-lg' : ''">
            <TributeCard 
                username="Biography" 
                :date="null" 
                :comment="life_section"
                :hasIcon="false"
            />
        </div>

        <div class="col-12 col-md-4 q-px-lg" :class="$q.screen.gt.md ? 'q-pl-lg' : ''">
            <Carousel />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TributeCard from 'components/tribute_card.vue'
import Carousel from 'components/sidebar/carousel.vue'
import db from 'src/boot/firebase'
import {   collection, onSnapshot } from "firebase/firestore";

export default defineComponent({
  name: 'LifeSection',
  components: {
    TributeCard,
    Carousel
  },
  methods: {
    loadLifeFromFirebase() {
        const _ = this;
        const q = collection(db, "life_section");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
               _.life_section = doc.data().content
            });
        });
    },
  },
  mounted() {
    this.loadLifeFromFirebase();
  },
  setup() {
    return {
        life_section: ref({})
    }
  }
})
</script>