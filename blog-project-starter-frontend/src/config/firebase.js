// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";//firebase import
import {getAuth} from "firebase/auth";//getAuth function provide Authentication feature 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd6i-yhW6scGinM3ghvBUAYf8F8m3W4ok",
  authDomain: "personal-blog-app-5b4d3.firebaseapp.com",
  projectId: "personal-blog-app-5b4d3",
  storageBucket: "personal-blog-app-5b4d3.firebasestorage.app",
  messagingSenderId: "895983276705",
  appId: "1:895983276705:web:63dd260048da220a0d96e0",
  measurementId: "G-13MZ5NG7ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)//auth variable denote app-firebaseconfig and auth-Authentication 

export default auth//auth variable have firebase config,auth it will export for signup & login functionalities
