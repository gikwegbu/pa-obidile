<template>
    <q-dialog ref="dialogRef" >
        <div style="heigh: 300px;" class="full-width">
            <q-img :src="imageUrl" style="border-radius: 10px;">
                <div class="absolute-bottom text-subtitle1 text-center">
                    {{ caption }}
                    <!-- {{ dbStore.getCurrentImage.caption }} -->

                </div>
            </q-img>
        </div>
    </q-dialog>
  </template>
<script>
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'DisplayImage',
  props: {
    imageUrl: {
        type: String,
        // retrieve url from the store...
        required: true,
    },
    caption: {
        type: String, 
        default: ""
    }
  },
  setup() {
    
    return {
    }
  }
})
</script>