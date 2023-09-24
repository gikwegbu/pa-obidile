<template>
    <div class="row q-gutter-lg flex justify-center">
        <div class="col-12 col-md-6">
            <div class="q-pb-md">
                <div class="row q-mb-lg q-px-md" style="margin-bottom: 40px;">
                    <div class="col-12 col-sm-6">
                        <div class="text-h6 text-bold"> Share a special moment from Obidile's life.</div>
                    </div>
                    <div class="col-12 col-sm-6 flex justify-end">
                        <q-btn outline color="black" icon="edit_note" icon-left="send" label="Write a Story" @click="scrollToBottom('writeTribute')" />
                    </div>
                </div>
                <div v-for="tribute in tributes" :key="tribute.name" class="q-pl-lg q-pr-md">
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
                    <q-btn glossy color="teal" :class="$q.screen.lt.sm ? 'full-width' : ''">
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
import {   collection, onSnapshot } from "firebase/firestore";

export default defineComponent({
  name: 'StoriesSection',
  components: {
    TributeCard,
    Carousel
  },
  methods: {
    loadLifeFromFirebase() {
        const _ = this;
        const q = collection(db, "stories_section");
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.tributes = []
            querySnapshot.forEach((doc) => {
                _.tributes.push({ 
                    name: doc.data().name, 
                    date: doc.data().date, 
                    comment: doc.data().content 
                });
            });
        });
    },
  },
  mounted() {
    this.loadLifeFromFirebase();
  },
  setup() {
    return {
        tributes: ref([]),
        editor: ""
    }
  }
})
</script>


