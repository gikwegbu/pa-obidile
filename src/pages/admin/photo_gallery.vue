<template>
    <q-page class="q-pa-lg">
        <div class="flex justify-between q-mb-lg">
          <div class="text-h5">
            Image Gallery
          </div>
          <q-btn-dropdown flat color="primary" :label="imageUploadType">
              <q-list>
                  <q-item clickable v-close-popup @click="selectImageUploadType(name, value)" v-for="{index, value, name} in imageUploadArr" :key="index">
                      <q-item-section>
                          <q-item-label>
                              {{ name }}
                          </q-item-label>
                      </q-item-section>
                  </q-item>
              </q-list>
          </q-btn-dropdown>
        </div>
        <div class="row q-gutter-lg justify-around" v-if="gallery.length">
            <div v-for="{index, title,ref,id, gallery_image} in gallery"  :key="index" class="col-3 col-xs-12 col-sm-4 col-md-3">
              <q-img :src="gallery_image" style="border-radius: 10px; height: 200px; border: 1px solid #eee;">
                <div class="absolute-top-right text-subtitle1 text-center bg-transparent">
                  <q-btn outline round icon="delete" color="red" @click="deleteImage(ref, id)" />
                </div>
                <div class="absolute-bottom text-subtitle1 text-center">
                  {{title}}
                </div>
              </q-img>
            </div>
          </div>
          <div v-else class="flex flex-center">
           Oopss!!! No Image Available Now.
          </div>
    </q-page>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useQuasar, Notify } from 'quasar'
import ImageUploader from 'components/image_uploader.vue'
import { heroImageStorage, landingPage, galleryStorage } from 'pages/admin/constants'
import db from 'src/boot/firebase'
import { collection, query,orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref as _ref, deleteObject } from "firebase/storage";


const _imageUploadArr = [
    {
        name: 'Hero Image',
        section: landingPage,
        value: heroImageStorage
    },
    {
        name: 'Gallery',
        section: galleryStorage,
        value: galleryStorage
    },
]

export default defineComponent({
  name: 'GalleryScreen',
  components: {
  },
  methods: {
    selectImageUploadType (type, val) {
        const _ = this
        _.selectedImageUploadType = val
        _.imageUploadType = type
        _.chooseImageUploadType()
    },
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
  mounted() {
    const _ = this
    _.loadGalleryFromFirebase()
  },
  setup() {
    const $q = useQuasar()
    const storage = getStorage();


    return {
      storage,
      selectedImageUploadType: ref(''),
      imageUploadType: ref('Gallery'),
      imageUploadArr: ref(_imageUploadArr),
      gallery: ref([]),

       deleteImage(fileRef, id) {
        const _ = this
        $q.dialog({
            title: 'Confirm',
            message: 'Are you sure you want to delete this Image?',
            cancel: true,
            persistent: true
          }).onOk(() => {
            // Create a reference to the file to delete
            const imageRef = _ref(storage, fileRef);

            // Delete the file
            deleteObject(imageRef).then(async () => {
              // File deleted successfully
              const docRef = doc(db, fileRef.split('/')[0], id);
              await deleteDoc(docRef);

              _.notify('Image Deleted successfully', 'green')
            }).catch((error) => {
              // Uh-oh, an error occurred!
              console.log(error.message)
              _.notify(error.message, 'red')
            });
          })
      },
      chooseImageUploadType() {
        const _ = this
        $q.dialog({
              component: ImageUploader,

              // props forwarded to your custom component
              componentProps: {
                  imageType: _.selectedImageUploadType,
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
