
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAjEANTxNYYeop2NA84mqMrC5I12X4RMXg",
    authDomain: "test-task-68f24.firebaseapp.com",
    databaseURL: "https://test-task-68f24.firebaseio.com",
    projectId: "test-task-68f24",
    storageBucket: "test-task-68f24.appspot.com",
    messagingSenderId: "138782641504",
    appId: "1:138782641504:web:b682b612eec5f2854b6205"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;