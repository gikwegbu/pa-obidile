<template>
    <div class="row q-gutter-lg justify-center">
        <div v-for="index in 40"  :key="index" class="col-3 col-xs-12 col-sm-4 col-md-3" @click="previewImage">
            <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" style="border-radius: 10px;">
            <div class="absolute-bottom text-subtitle1 text-center">
                Caption
            </div>
            </q-img>
        </div>
    </div>
</template>


<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

import DisplayImage from 'components/gallery_section/image_display.vue'

export default defineComponent({
  name: 'GallerySection',
  components: {
    // DisplayImage
  },
  setup() {
    const $q = useQuasar()
    
    return {
        images: [
        ],
        editor: "",
        previewImage() {
            // pass the url to store, and retrieve it from the component...
            $q.dialog({
                component: DisplayImage,

                // props forwarded to your custom component
                componentProps: {
                    text: 'something',
                    // ...more..props...
                }
                }).onOk(() => {
                console.log('OK')
                }).onCancel(() => {
                console.log('Cancel')
                }).onDismiss(() => {
                console.log('Called on OK or Cancel')
            })
        }
    }
  }
})
</script>