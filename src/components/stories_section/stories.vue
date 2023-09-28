<template>
    <div class="row q-gutter-lg flex justify-center">
        <div class="col-12 col-md-6">
            <div class="q-pb-md">
                <div class="row q-mb-lg q-px-md" style="margin-bottom: 40px;">
                    <div class="col-12 col-sm-6">
                        <div class="text-h6 text-bold"> Share a special moment from Obidile's life.</div>
                    </div>
                    <div class="col-12 col-sm-6 flex justify-end">
                        <!-- <q-btn outline color="black" icon="edit_note" icon-left="send" label="Write a Story" @click="scrollToBottom('writeTribute')" /> -->
                        <!-- <q-btn outline color="black" icon="edit_note" icon-left="send" label="Write a Story" @click="userAuthModal()" /> -->
                        <q-btn outline color="black" icon="edit_note" icon-left="send" label="Write a Story" />
                    </div>
                </div>
                <div v-if="stories.length">
                    <div v-for="tribute in stories" :key="tribute.name" class="q-pl-lg q-pr-md">
                            <!-- :username="'June 3 . by '+tribute.name"  -->
                            <!-- :username="new Date(tribute.date.seconds * 1000).toLocaleDateString('en-us', { weekday:'long', year:'numeric', month:'short', day:'numeric'})+' . by '+tribute.name"  -->
                        <TributeCard 
                            :username="new Date(tribute.date.seconds * 1000).toLocaleDateString('en-us', { month:'short', day:'numeric'}) + ' . by ' + tribute.name" 
                            date="" 
                            :comment="tribute.comment" 
                            :hasIcon="false"
                        />
                    </div>
                </div>
                <div v-else v-for="index in 4" :key="index">
                    <SkeletonCard />
                </div>
            </div>
            <div class="q-my-md q-pa-md" id="writeTribute">
                <div class="text-h5 q-pb-md">
                    Write a Story
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
                    <q-btn glossy color="teal" :class="$q.screen.lt.sm ? 'full-width' : ''" :loading="isPublishing" @click="publishStory()">
                        Publish
                    </q-btn>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4 q-px-lg" >
            <Carousel />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import TributeCard from 'components/tribute_card.vue'
import Carousel from 'components/sidebar/carousel.vue'
import db from 'src/boot/firebase'
import { useDbStore } from 'stores/db'
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { storiesSection } from 'src/pages/admin/constants';
import {  Notify, useQuasar } from 'quasar'
import GoogleAuthDialog from 'components/google_auth_dialog.vue'

export default defineComponent({
  name: 'StoriesSection',
  components: {
    TributeCard,
    Carousel
  },
  methods: {
    loadLifeFromFirebase() {
        const _ = this;
        const q = query(collection(db, storiesSection), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.stories = []
            querySnapshot.forEach((doc) => {
                _.stories.push({ 
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
        });
    },
    async publishStory() {
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
        const docRef = await addDoc(collection(db, storiesSection), data);
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
    this.loadLifeFromFirebase();
  },
  setup() {
    const $q = useQuasar()
    const dbStore = useDbStore();

    return {
        dbStore,
        stories: ref([]),
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


