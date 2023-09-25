<template>
    <div>

        <div class="flex justify-end q-mb-lg">
            <q-btn glossy color="secondary" icon="add" label="Add" @click="addPicture()"></q-btn>
        </div>
        <div class="row q-gutter-lg justify-center">
            <div v-for="{index,title,  gallery_image} in gallery"  :key="index" class="col-3 col-xs-12 col-sm-4 col-md-3" @click="previewImage(gallery_image, title)">
                <q-img :src="gallery_image" style="border-radius: 10px;  height: 200px; border: 1px solid #eee">
                    <div class="absolute-bottom text-subtitle1 text-center">
                        {{ title }}
                    </div>
                </q-img>
            </div>
        </div>
        <div class="flex justify-center q-mt-lg">
            <q-btn glossy color="secondary" icon="add" label="Add" class="" @click="addPicture()"></q-btn>
          </div>
    </div>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import ImageUploader from 'components/image_uploader.vue'
import db from 'src/boot/firebase'
import { collection, query,orderBy, onSnapshot } from "firebase/firestore";
import DisplayImage from 'components/gallery_section/image_display.vue'
import {  galleryStorage } from 'pages/admin/constants'

export default defineComponent({
  name: 'GallerySection',
  components: {
    // DisplayImage
  },
  methods: {
    loadGalleryFromFirebase() {
        const _ = this;
        const q = query(collection(db, galleryStorage), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            _.gallery = []
            querySnapshot.forEach((doc) => {
                _.gallery.push({ 
                    id: doc.id,
                    name: doc.data().name, 
                    date: doc.data().date, 
                    title: doc.data().title, 
                    gallery_image: doc.data().gallery_image, 
                    ref: doc.data().ref, 
                });
            });
        });
    },
  },
  mounted(){
    const _ = this
    _.loadGalleryFromFirebase()
  },
  setup() {
    const $q = useQuasar()
    
    return {
        gallery: ref([]),
        editor: "",
        previewImage(img, caption) {
            // pass the url to store, and retrieve it from the component...
            $q.dialog({
                component: DisplayImage,

                // props forwarded to your custom component
                componentProps: {
                    imageUrl: img,
                    caption: caption
                }
                }).onOk(() => {
                console.log('OK')
                }).onCancel(() => {
                console.log('Cancel')
                }).onDismiss(() => {
                console.log('Called on OK or Cancel')
            })
        },
        addPicture() {
        const _ = this
        $q.dialog({
              component: ImageUploader,

              // props forwarded to your custom component
              componentProps: {
                  imageType: galleryStorage,
                  // ...more..props...
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