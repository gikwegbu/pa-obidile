<template>
    <div class="q-pa-md" style="border-radius: 10px; background-color: rgba(128, 128, 128, 0.11);">
      <div class="q-mb-md text-h6 text-center">
        {{ gallery.length }} Pictures
      </div>
      <q-carousel
        animated
        v-model="slide"
        infinite
        :autoplay="true"
        transition-prev="slide-down"
        transition-next="jump-up"

        
        >
        <q-carousel-slide 
            v-for="{index, id, gallery_image} in gallery" 
            :key="index"
            :name="id" 
            :img-src="gallery_image" 
        />
      </q-carousel>

      <div class="q-mt-md">
        <q-btn outline icon="add" label="Add Pictures" class="full-width" @click="addPicture()"></q-btn>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import { useQuasar, Notify } from 'quasar'
  import { useDbStore } from 'stores/db'
  import ImageUploader from 'components/image_uploader.vue'
  import db from 'src/boot/firebase'
  import { collection, query,orderBy, onSnapshot } from "firebase/firestore";
  import {  galleryStorage } from 'pages/admin/constants'
  import GoogleAuthDialog from 'components/google_auth_dialog.vue'
  
  export default defineComponent({
  name: 'ImageCarousel',
  components: {
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
    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    }
  },
  mounted(){
    const _ = this
    _.loadGalleryFromFirebase()
  },
  setup () {
    const $q = useQuasar()
    const dbStore = useDbStore();

    return {
      dbStore,
      gallery: ref([]),
      slide: ref(0),
      addPicture() {
        const _ = this
        if(!_.dbStore.checkUserLoggedIn()) {
            // User is not logged in so pop up the notification...
            _.userAuthModal()
            return
        }
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