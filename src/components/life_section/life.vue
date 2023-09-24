<template>
    <div class="row q-gutter-lg">
        <div class="col col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
        <div class="col-12 col-md-6">
            <TributeCard 
                username="Biography" 
                :date="null" 
                comment="O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..."
                :hasIcon="false"
            />
        </div>

        <div class="col-12 col-md-3">
            <Carousel />
        </div>
        <div class="col-2 col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import TributeCard from 'components/tribute_card.vue'
import Carousel from 'components/sidebar/carousel.vue'

export default defineComponent({
  name: 'LifeSection',
  components: {
    TributeCard,
    Carousel
  },
  setup() {
    return {
        
    }
  }
})
</script>