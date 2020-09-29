import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCKxKgE1Mh7DauQBBhHAnJnnuIJaRLhj74",
    authDomain: "orders-cd834.firebaseapp.com",
    databaseURL: "https://orders-cd834.firebaseio.com",
    projectId: "orders-cd834",
    storageBucket: "orders-cd834.appspot.com",
    messagingSenderId: "1099359698304",
    appId: "1:1099359698304:web:1f290a07e5ad1c1740d565",
    measurementId: "G-HL9D0JZH4N"
  };
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.database();

  