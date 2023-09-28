<template>
    <q-dialog ref="dialogRef" >
        <div class="full-width bg-white q-pa-lg" style="heigh: 300px;">
            <div class="text-center text-h5 q-mb-lg"> Sign-in With Google </div>
            <div class="text-center q-mb-md">
                Before you continue, you will need to sign in with us.
            </div>
            <div class="text-center">
                <q-btn color="primary" label="Sign-in with Google" v-close-popup @click="dbStore.userGoogleAuthentication()" />
            </div>
        </div>
    </q-dialog>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { useDbStore } from 'stores/db'

export default defineComponent({
  name: 'GoogleAuthDialog',
  components: {
  },
  methods: {
  },
  setup() {
    
    const dbStore = useDbStore();

    return {
        dbStore,
    }
  }
})
</script>