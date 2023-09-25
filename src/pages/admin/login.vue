<template>
    <q-layout view="hHh lpR fFf">
       <q-page-container>
        <q-page class="flex flex-center">
            <div >
                <div class="text-h5 text-center -q-mb-lg">
                    Ichie, Nno! 😎
                </div>
                <div class="q-gutter-y-lg q-mt-lg">
                    <q-input type="email"  v-model.trim="email" label="Enter email" :style="$q.screen.lt.sm ? 'width: 80vw;' : 'width: 40vw;'" />
                    <q-input :type="isPwd ? 'password' : 'text'"  v-model.trim="password" label="Enter password" >
                        <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
                        </template>
                    </q-input>
                    <div class="text-center">

                        <q-btn glossy color="primary" label="Login ⚙️" @click="login()" :loading="isSigningIn"/>
                    </div>
                </div>
            </div>
        </q-page>
       </q-page-container>
    </q-layout>
</template>


<script>
import { defineComponent, ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from 'src/boot/firebase'
import { doc, getDoc } from "firebase/firestore";
import { useDbStore } from 'stores/db'

import { Notify } from 'quasar'


export default defineComponent({
  name: 'LoginScreen',
  components: {
  },
  methods: {
    login() {
        const _ = this;
        // Check if values were provided for both email and password... 
        if(!_.email.length || !_.password.length) {
            _.notify('Incorrect Email and Password', 'red');
            return
        }
        _.isSigningIn = true;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, _.email, _.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            _.confirmAdmin(user.uid)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            _.notify(error.message, 'red');
            _.isSigningIn = false;
        });
    },
    async confirmAdmin(uid){
        const _ = this;
        _.isSigningIn = true;
        const docRef = doc(db, "admins", uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            _.notify("Login Successfully", 'green');
            // console.log("Document data:", docSnap.data());
            // Admin Token
            const adminToken = docSnap.data().uid
            const adminName = docSnap.data().name
            const adminEmail = docSnap.data().email
            _.dbStore.loginAdmin(adminName, adminEmail, adminToken)
            _.isSigningIn = false;

            //
            // Move to dashboard
            _.$router.push({
                name: "Dashboard"
            })
        } else {
            // docSnap.data() will be undefined in this case
            _.notify("Oops!! You no longer have Admin Access 😔", 'red');
            _.isSigningIn = false;
        }
    },
    notify(message, color) {
        Notify.create({
            message: message,
            color: color
        })
    }
  },
  setup() {
    const dbStore = useDbStore();
    return {
        dbStore,
        email: ref(''),
        password: ref(''),
        isPwd: ref(true),
        isSigningIn: ref(false),
    }
  }
})
</script>
