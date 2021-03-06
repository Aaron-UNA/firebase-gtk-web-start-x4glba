// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
// var firebaseConfig = {};
// copiado desde mi configuración en Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDce_VhjTlCEQjOKuj_NmM2pJn_lRU1NtU",
  authDomain: "fir-web-codelab-ef1fb.firebaseapp.com",
  databaseURL: "https://fir-web-codelab-ef1fb.firebaseio.com",
  projectId: "fir-web-codelab-ef1fb",
  storageBucket: "fir-web-codelab-ef1fb.appspot.com",
  messagingSenderId: "226033193034",
  appId: "1:226033193034:web:d66963c086f46ed79196b3"
};

//descomentamos la inicializacion
firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

// decomentamos la siguiente linea
//esta linea le dice que vamos a utilizar la autenticacion
const ui = new firebaseui.auth.AuthUI(firebase.auth());
//evento del boton para autenticar
startRsvpButton.addEventListener("click", ()=>{
  if (firebase.auth().currentUser){
    firebase.auth().signOut();
  } else {
    ui.start("#firebaseui-auth-container", uiConfig);
  }  
});

firebase.auth().onAuthStateChanged((user)=>{
 if(user){
   startRsvpButton.textContent = "LOGOUT";
   guestbookContainer.style.display = "block";
 }else{
   startRsvpButton.textContent = "RSVP"
   guestbookContainer.style.display = "none";
 }
});


form.addEventListener("submit",(e)=>{
  e.preventDefault();
  firebase.firestore().collection("guestbook").add({
    test: input.value,
    timestamp: Date.now(),
    name: firebase.auth().currentUser.uid
  });
  input.value = "";
  return false;
});
