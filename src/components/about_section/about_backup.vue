<template>
    <div class="q-pa-md example-row-mix-and-match scroll">
        <div class="row q-gutter-lg">
            <div class="col col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
            <div class="col-12 col-md-6">
                <div>
                    If I had a flower for every moment I think about you, I could walk forever in my garden.
Let the memory of Jummai be with us forever.
                </div>

                <p>
                    With heavy hearts, we submit to God's will as we announce the death of our beloved Mother, Sister, Cousin, and Aunty, Mrs Jummai Matta which occurred on the 24th of May 2023. We are grateful for the time spent with her and we will remember her forever. 
                </p>

                <p>
                    <ul>
                        <li>Born 07/11/1960</li>
                        <li>Aged 62</li>
                    </ul>
                </p>
                <div>
                    <div class="text-h4 text-bold text-underline q-py-md"> PROGRAMME OF EVENTS </div>
                    <div class="text-h6 "> SERVICE OF SONGS</div>
                    <div>Date: Wednesday 7th June 2023 </div>
                    <div>Time: 3:00 pm </div>
                    <div>Venue: ECWA Plateau Church, Liberty Dam Road, Katon Rikkos, </div>
                    <div>Jos, Plateau State. </div>
                    <div>Live Stream  </div>
                </div>
                <div>
                    <div class="text-h6 q-pt-md">FUNERAL SERVICE</div>
                    <div>Date: Thursday 8th June 2023 </div>
                    <div>Time: 9:00 am </div>
                    <div>Venue: ECWA Plateau Church, Liberty Dam Road, Katon Rikkos, </div>
                    <div>Jos, Plateau State. </div>
                </div>

                <div>
                    <div class="text-h6 q-pt-md">INTERNMENT</div>
                    <div>Date: Thursday 8th June 2023 </div>
                    <div>Time: 11:30 am </div>
                    <div>Venue: Family Compound, Guratop TCNN Road, </div>
                    <div>Jos, Plateau State. </div>
                </div>

                <div>
                    <div class="text-h6 q-pt-md">RECEPTION</div>
                    <div>Time: Immediately after internment </div>
                    <div>Venue: Centre La Sharp, Rayfield </div>
                    <div>Jos, Plateau State </div>
                </div>


                <!-- Put a background attachement here too -->
                <div class="q-py-xl">
                    <p>We would like to sincerely appreciate you for standing with us through the difficult time for our family. </p>
                    <p> We indeed saw an outpour of love through people's kind giving, prayers and many visits. We derive comfort and strength from all your uplifting words. </p>
                    <p> Thank you for thinking of our family, and may God richly bless you </p>
                </div>

                <!-- Tributes Section -->
                <div class="q-pt-xl q-pb-md">
                    <div class="row q-mb-lg">
                        <div class="col-6">
                            <div class="text-h4 text-bold"> Tributes </div>
                        </div>
                        <div class="col-6 flex justify-end">
                            <q-btn outline color="black" icon="edit_note" icon-left="send" label="Leave a Tribute" @click="scrollToBottom('writeTribute')" />
                        </div>
                    </div>
                    <div v-for="tribute in tributes" :key="tribute.name">
                        <TributeCard :username="tribute.name" :date="tribute.date" :comment="tribute.comment" />
                    </div>
                </div>
                <div class="q-my-md q-pa-md" id="writeTribute">
                    <div class="text-h5 q-pb-md">
                        Write a Tribute
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

            <div class="col-12 col-md-2">
                
                // Ads
            </div>
            <div class="col-2 col-md-2" :class="$q.screen.lt.md ? 'hidden': ''"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll
import TributeCard from 'components/tribute_card.vue'

export default defineComponent({
  name: 'AboutSection',
  components: {
    TributeCard
  },
  methods: {
    scrollToBottom (el) {
        let scrollEl = el.closest('#writeTribute')  // added to find the offset of the scrolling region
        console.log(scrollEl)
        const target = getScrollTarget(el)
        const offset = el.offsetTop + el.offsetParent.offsetTop // adjust the scrolling
        const duration = 100
        setScrollPosition(target, offset, duration)
    }
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
