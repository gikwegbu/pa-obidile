<template>
    <q-dialog ref="dialogRef" >
        <UploadForm :imageType="imageType" />
    </q-dialog>
</template>


<script>
import { defineComponent, ref } from 'vue'

import UploadForm from 'components/gallery_section/upload_form.vue'

export default defineComponent({
  name: 'ImageUploader',
  props:{
    imageType: {
        type : String,
        required: true
    }
  },
  components: {
    UploadForm
  },
  methods: {
  },
  setup() {
    
    return { 
    }
  }
})
</script>