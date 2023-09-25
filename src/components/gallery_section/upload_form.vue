<template>
    <div class="full-width">
        <div style="heigh: 300px;" class="full-width bg-white">
            <div class="text-h5 text-center q-py-md">
                Upload {{ imageType.split('_')[0].toUpperCase() }}
            </div>
            <q-img :src="file ? imgUrl : 'src/assets/emptyImage.jpg'" style="border-radius: 10px;">
                <div class="absolute-bottom text-subtitle1 text-center">
                    {{ title }}
                </div>
            </q-img>
            <div class="q-pa-lg q-my-lg">
                <!-- <q-file clearable filled v-model="file" label="Select Image" accept="image/jpeg" @input="onSelectFile" /> -->
                <q-file clearable filled v-model="file" label="Select Image" accept="image/png, image/gif, image/jpeg" @input="onSelectFile" />
                <q-input v-model.trim="title" label="Caption" class="q-my-md" maxlength="100" />
                <div class="text-right">
                    <q-btn color="primary"  label="Upload Image" :loading="isUploading" @click="uploadImage()" />
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { defineComponent, ref} from 'vue'

import db from 'src/boot/firebase'
import { getStorage, ref as _ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, collection, onSnapshot, setDoc, addDoc, serverTimestamp } from "firebase/firestore";

import { Notify } from 'quasar'
import { heroImageStorage, landingPage, galleryStorage } from 'src/pages/admin/constants'
import { useDbStore } from 'stores/db'

export default defineComponent({
  name: 'UploaderComponent',
  props:{
    imageType: {
        type : String,
        required: true
    }
  },
  components: {
  },
  methods: {
    uploadImage() {
        const _ = this
        if(_.file == null || !_.title.length) {
            _.notify('Please complete the form', 'red')
            return
        }
        _.isUploading = true
        const _ext = _.file.type.split('/')[1]
        const _fileName = _.imageType == heroImageStorage ? _.imageType : new Date().getTime()
        const _filePath = `${_.imageType}/${_fileName}.${_ext}`
        // const _filePath = imageType+'/'+_fileName+'.'+_ext

        // Get reference
        const _containerRef = _ref(_.storage, _filePath)
        // const _containerRef = _ref(_.storage, imageType)
        const uploadTask = uploadBytesResumable(_containerRef, _.file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
            _.isUploading = false
            _.notify(error.message, 'red')
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            // _.isUploading = false
           
            // Send image to Database...
            _.saveImageUrlToDb(downloadURL, _filePath)
            });
        }
        );
    },
    saveImageUrlToDb(url, path) {
        const _ = this
          // Fetch all data in that collection
          const q = collection(db, _.imageType == heroImageStorage ? landingPage : galleryStorage);
            const unsubscribe =  onSnapshot(q, (querySnapshot) => {
                _.results = []
                querySnapshot.forEach((doc) => {
                    _.results.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
            });

            setTimeout(async () => {
                var docRef = ''
                var data = {}
                switch (_.imageType) {
                    case heroImageStorage:
                        const _docRef = doc(db, landingPage, _.results[0]['id']);
                        data = { 
                            [heroImageStorage]: url,
                            date: serverTimestamp(),
                            name: _.title,
                            uploader:  _.dbStore.getAdminDetails.name,
                        };
                        await setDoc((_docRef), data,{ merge: true } );
                        _.isUploading = false;
                        _.clearFix()
                        _.notify("Image  updated successfully", 'green')
                        break;
                    case galleryStorage:
                        data = { 
                            [galleryStorage]: url,
                            date: serverTimestamp(),
                            title: _.title,
                            // name:  _.dbStore.getAdminDetails.name ?? _.dbStore.getUserDetails.name
                            name: "",
                            ref: path,
                        };
                        const docRef = await addDoc(collection(db, galleryStorage), data);
                        _.isUploading = false;
                        _.clearFix()
                        _.notify("Image updated successfully", 'green')
                        break;
                
                    default:
                        break;
            }
        }, 500);
    },
    clearFix() {
        const _ = this
        _.file = null
        _.title = ''
        _.imgUrl = ''
    },
    onSelectFile () {
        const _ = this
        setTimeout(() => {
            _.imgUrl = URL.createObjectURL(_.file);
        }, 500);
    },
    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    }
  },
  setup() {
    const storage = getStorage();
    const dbStore = useDbStore();

    return {
        dbStore,
        storage,
        file: ref(null),
        title: ref(""),
        imgUrl: ref(''),
        isUploading: ref(false),
        result: ref([])
    }
  }
})
</script>

<!-- 
onSelectFile () {
    const input = this.$refs.fileInput
    const files = input.files
    if (files && files[0]) {
      const reader = new FileReader
      reader.onload = e => {
        this.imageData = e.target.result
      }
      reader.readAsDataURL(files[0])
      this.$emit('input', files[0])
    }
  } -->