import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZP-mCxGanfsfmuKf_gkUW7PjAKfDLCl0",
  authDomain: "svendeproeve-images.firebaseapp.com",
  projectId: "svendeproeve-images",
  storageBucket: "svendeproeve-images.appspot.com",
  messagingSenderId: "305640601878",
  appId: "1:305640601878:web:4725ad8820d71c39387837",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
