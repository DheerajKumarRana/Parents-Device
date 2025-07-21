import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCE-8NdXbwXadEvKGIXTjvq8yQiPXKNpNo",
  authDomain: "school-bus-tracker-4b20c.firebaseapp.com",
  projectId: "school-bus-tracker-4b20c",
  storageBucket: "school-bus-tracker-4b20c.appspot.com",
  messagingSenderId: "226324789327",
  appId: "1:226324789327:web:19faaf22331c8f1dfed23a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
