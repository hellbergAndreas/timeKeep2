import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBk7eWt_appV4pXhv1jwHVB4D4 - JRsBLpY",
  authDomain: "timekeep2.firebaseapp.com",
  databaseURL:
    "https://timekeep2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "timekeep2",
  storageBucket: "timekeep2.appspot.com",
  messagingSenderId: "171717721341",
  appId: "1:171717721341:web:a0abe42557bd7043c99294",
})
export const auth = app.auth()
export default app
