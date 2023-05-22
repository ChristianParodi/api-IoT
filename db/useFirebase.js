import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD75fTcWOVpowFFZOl3YuO4lQm3JaXit5M",
    authDomain: "progetto-iot-a63a0.firebaseapp.com",
    projectId: "progetto-iot-a63a0",
    storageBucket: "progetto-iot-a63a0.appspot.com",
    messagingSenderId: "1051561475886",
    appId: "1:1051561475886:web:8b5706a1f808fea5fc84bf"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db