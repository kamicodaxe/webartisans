import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  // Your firebase config
};

const app = initializeApp(firebaseConfig);

// const db = initializeFirestore(app, { experimentalForceLongPolling: true })
const db = getFirestore(app)

const auth = getAuth(app);

const storage = getStorage(app);

export {
  app,
  db,
  auth,
  storage
};

