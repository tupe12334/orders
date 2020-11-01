import firebase from 'firebase';
import getGeoCoding from './nominatim';

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

export function sendObjectToFireBase(object) {
  getGeoCoding(object, (postion) => {
    //console.log("postion");
    //console.log(postion);
    object.latitude = postion[0]
    object.longitude = postion[1]
    //console.log("object that send to firebase");
    //console.log(object);
    if (object !== undefined) {
      //console.log("object that send to firebase");
      //console.log(object);
      db.ref('orders').push(object);
    }
  })
}
