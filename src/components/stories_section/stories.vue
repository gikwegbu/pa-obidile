<template>
    <!-- <div class="row q-gutter-lg">
        <div class="col col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
        <div class="col-12 col-md-6">
            <TributeCard 
                username="June 3 . by Mathew James" 
                date="" 
                comment="O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..."
                :hasIcon="false"
            />
        </div>

        <div class="col-12 col-md-3">
            <Carousel />
        </div>
        <div class="col-2 col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
    </div> -->
    <div class="row q-gutter-lg">
            <div class="col-sm-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
            <div class="col-12 col-md-6">
                <!-- Tributes Section -->
                <div class="q-pt-xl q-pb-md">
                    <div class="row q-mb-lg">
                        <div class="col-12 col-sm-6">
                            <div class="text-h6 text-bold"> Share a special moment from Obidile's life.</div>
                        </div>
                        <div class="col-12 col-sm-6 flex justify-end">
                            <q-btn outline color="black" icon="edit_note" icon-left="send" label="Write a Story" @click="scrollToBottom('writeTribute')" />
                        </div>
                    </div>
                    <div v-for="tribute in tributes" :key="tribute.name">
                        <TributeCard 
                            username="June 3 . by Mathew James" 
                            date="" 
                            :comment="tribute.comment" 
                            :hasIcon="false"
                        />
                    </div>
                </div>
                <div class="q-my-md q-pa-md" id="writeTribute">
                    <div class="text-h5 q-pb-md">
                        Write a Story
                    </div>
                    <div>
                        <q-editor
                            v-model="editor"
                            :definitions="{
                                bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                            }"
                        />
                    </div>
                    <div class="flex justify-end q-mt-md">
                        <q-btn glossy color="teal" :class="$q.screen.lt.sm ? 'full-width' : ''">
                            Publish
                        </q-btn>
                    </div>
                </div>
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
  name: 'StoriesSection',
  components: {
    TributeCard,
    Carousel
  },
  setup() {
    return {
        tributes: [
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
            { name: "Ikwegbu George", date: Date(), comment: "O death, where is your sting? Our beloved mother and closest friend taught us what true love means in words and actions and touched lives everywhere you went with your compassionate and kind heart.Who will I talk to daily and speak about all my joys and worries? Who will give me those sound nuggets of advice and wisdom that always calms and reassures me? You were selfless, you were caring, hardworking, and God-fearing. Life won't be the same..." },
        ],
        editor: ""
    }
  }
})
</script>