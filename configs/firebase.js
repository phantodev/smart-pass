// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuSTyfsopBcJ0CYSicIB4bjs-d6yhBc_c",
  authDomain: "app-smart-pass.firebaseapp.com",
  projectId: "app-smart-pass",
  storageBucket: "app-smart-pass.appspot.com",
  messagingSenderId: "608326187945",
  appId: "1:608326187945:web:72b4e85faf43010e5522b8",
  measurementId: "G-WH7HSDFXD9",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
