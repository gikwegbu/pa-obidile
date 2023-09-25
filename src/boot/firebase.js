import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYaySByqBQvDIj3wX_GNQ8-OosV8pvQ5o",
  authDomain: "obidile-3aeb8.firebaseapp.com",
  projectId: "obidile-3aeb8",
  storageBucket: "obidile-3aeb8.appspot.com",
  messagingSenderId: "384395302330",
  appId: "1:384395302330:web:6efd733c1cea96aa883983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {storage, auth, db}
export default db