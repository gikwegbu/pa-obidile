<template>
    <div class="q-pa-md scroll">
        <div class="row flex justify-center q-gutter-lg">
            <div class="col-12 col-md-6">
                <!-- <div>
                    If I had a flower for every moment I think about you, I could walk forever in my garden. Let the memory of Jummai be with us forever.
                </div>

                <p>
                    With heavy hearts, we submit to God's will as we announce the death of our beloved Mother, Sister, Cousin, and Aunty, Mrs Jummai Matta which occurred on the 24th of May 2023. We are grateful for the time spent with her and we will remember her forever. 
                </p>
                <p>
                    <ul>
                        <li>Born 07/11/1960</li>
                        <li>Aged 62</li>
                    </ul>
                </p> -->
                    <!-- About Section... -->
                    <div class="q-mb-lg" v-html="about_section.about_text" v-if="about_section.about_text"></div>
                    <TextSkeleton  v-else/>
                <!-- {{ editor }} -->
                <div class="q-mt-lg" v-html="about_section.programme_of_events"></div>
                <!-- <div>
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
                </div> -->
            </div>
            <div class="col-12 col-md-3">
                <Carousel />
            </div>
        </div>

        <!-- Mid-Screen -->
        <div class="bgImage q-mt-lg text-h6 flex justify-center">
            <div class="col-md-6">
                <div class="q-py-xl q-pa-lg">
                    <!-- <p>We would like to sincerely appreciate you for standing with us through the difficult time for our family. </p>
                    <p> We indeed saw an outpour of love through people's kind giving, prayers and many visits. We derive comfort and strength from all your uplifting words. </p>
                    <p> Thank you for thinking of our family, and may God richly bless you </p> -->
                    <div v-html="about_section.center_text"></div>
                </div>
            </div>
        </div>

        <!-- Tribute Section -->
        <div class="row flex justify-center">
            <div class="col-12 col-md-6">
                <!-- Tributes Section -->
                <div class="q-pt-xl q-pb-md ">
                    <div class="row q-mb-lg" style="margin-bottom: 40px;">
                        <div >
                            <div class="text-h4 text-bold"> Tributes </div>
                            <span> Scroll down to leave a tribute </span>
                        </div>
                    </div>
                    <div v-if="tributes.length">

                        <div v-for="tribute in tributes" :key="tribute.name">
                            <TributeCard :username="tribute.name" :date="tribute.date" :comment="tribute.comment" />
                        </div>
                    </div>
                    <div v-else v-for="index in 4" :key="index">
                        <SkeletonCard />
                    </div>
                </div>
                <div class="q-my-md " :class="$q.screen.gt.sm ? 'q-pa-md' : ''" id="writeTribute">
                    <div class="text-h5 q-pb-md">
                        Write a Tribute
                    </div>
                    <div>
                        <q-editor
                            v-model.trim="editor"
                            :definitions="{
                                bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
                            }"
                            :toolbar="[
                                [
                                {
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    list: 'only-icons',
                                    options: ['left', 'center', 'right', 'justify']
                                },
                                {
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                                ],
                                ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                                ['token', 'hr', 'link', 'custom_btn'],
                                ['print', 'fullscreen'],
                                [
                                {
                                    label: $q.lang.editor.formatting,
                                    icon: $q.iconSet.editor.formatting,
                                    list: 'no-icons',
                                    options: [
                                    'p',
                                    'h1',
                                    'h2',
                                    'h3',
                                    'h4',
                                    'h5',
                                    'h6',
                                    'code'
                                    ]
                                },
                                {
                                    label: $q.lang.editor.fontSize,
                                    icon: $q.iconSet.editor.fontSize,
                                    fixedLabel: true,
                                    fixedIcon: true,
                                    list: 'no-icons',
                                    options: [
                                    'size-1',
                                    'size-2',
                                    'size-3',
                                    'size-4',
                                    'size-5',
                                    'size-6',
                                    'size-7'
                                    ]
                                },
                                {
                                    label: $q.lang.editor.defaultFont,
                                    icon: $q.iconSet.editor.font,
                                    fixedIcon: true,
                                    list: 'no-icons',
                                    options: [
                                    'default_font',
                                    'arial',
                                    'arial_black',
                                    'comic_sans',
                                    'courier_new',
                                    'impact',
                                    'lucida_grande',
                                    'times_new_roman',
                                    'verdana'
                                    ]
                                },
                                'removeFormat'
                                ],
                                ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                                ['undo', 'redo'],
                                ['viewsource']
                            ]"
                            :fonts="{
                                arial: 'Arial',
                                arial_black: 'Arial Black',
                                comic_sans: 'Comic Sans MS',
                                courier_new: 'Courier New',
                                impact: 'Impact',
                                lucida_grande: 'Lucida Grande',
                                times_new_roman: 'Times New Roman',
                                verdana: 'Verdana'
                            }"
                        />
                    </div>
                    <div class="flex justify-end q-mt-md">
                        <q-btn glossy color="teal" :class="$q.screen.lt.sm ? 'full-width' : ''" :loading="isPublishing" @click="publishTribute()">
                            Publish
                        </q-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .bgImage {
        color: white;
        background-image: url("https://t3.ftcdn.net/jpg/05/50/73/66/360_F_550736697_UTL4e61oXNfnEedZy2brWpHwikYzIpXq.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-attachment: fixed;
        font-family: 'cursive';
    }
</style>

<script>
import { defineComponent, ref } from 'vue'
import { db } from 'src/boot/firebase'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { useDbStore } from 'stores/db'
import { scroll, Notify, useQuasar } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll
import TributeCard from 'components/tribute_card.vue'
import Carousel from 'components/sidebar/carousel.vue'
import SkeletonCard from 'components/card_skeleton.vue'
import TextSkeleton from 'components/text_skeleton.vue'
import { tributeSection, aboutSection } from 'src/pages/admin/constants'
import GoogleAuthDialog from 'components/google_auth_dialog.vue'
// import EditorComponent from 'components/editor.vue'


export default defineComponent({
  name: 'AboutSection',
  components: {
    TributeCard,
    Carousel,
    SkeletonCard,
    TextSkeleton,
    // EditorComponent,
  },
  methods: {
    scrollToBottom (el) {
        let scrollEl = el.closest('#writeTribute')  // added to find the offset of the scrolling region
        console.log(scrollEl)
        const target = getScrollTarget(el)
        const offset = el.offsetTop + el.offsetParent.offsetTop // adjust the scrolling
        const duration = 100
        setScrollPosition(target, offset, duration)
    },
    loadTributesFromFirebase() {
        const _ = this;
        const q = query(collection(db, tributeSection), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.tributes = []
            querySnapshot.forEach((doc) => {
                console.log("this is the doc:: ",doc.id, doc.data())
                _.tributes.push({ 
                    id: doc.id,
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
        });
    },
    loadAboutFromFirebase() {
        const _ = this;
        const q = collection(db, aboutSection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                _.about_section = doc.data()
            });
        });
    },
    async publishTribute() {
        const _  = this
        // Check if user is logged in
        if(!_.dbStore.checkUserLoggedIn()) {
            // User is not logged in so pop up the notification...
            _.userAuthModal()
            return
        }
        if(!_.editor.length) {
            _.notify("Please write soemthing", 'red');
            return
        }
        // Sha check if user is signup, and can uplish, get their name and do the mbunu
        var data = { 
            content: _.editor,
            date: serverTimestamp(),
            // name: _.dbStore.getAdminDetails.name ?? _.dbStore.getUserDetails.name 
            name: _.dbStore.getSenderName 
            // name: ''
        };
        _.isPublishing = true;
        const docRef = await addDoc(collection(db, tributeSection), data);
        _.isPublishing = false;
        _.editor = ''
        _.notify("Tribute published successfully", 'green')
    },

    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    }
  },

  mounted() {
    this.loadTributesFromFirebase();
    this.loadAboutFromFirebase();
    // this.userAuthModal();
  },
  setup() {
    const $q = useQuasar()
    const dbStore = useDbStore();

    return {
        dbStore,
        tributes: ref([]),
        about_section: ref({}),
        editor: "",
        isPublishing: ref(false),
        userAuthModal() {
            $q.dialog({
                component: GoogleAuthDialog,
    
                // props forwarded to your custom component
                componentProps: {
                }
                }).onOk(() => {
                console.log('OK')
                }).onCancel(() => {
                console.log('Cancel')
                }).onDismiss(() => {
                console.log('Called on OK or Cancel')
            })
        },
    }
  }
})
</script>
