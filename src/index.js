import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import {
  getFirestore, collection, addDoc, orderBy,
  getDocs, doc, onSnapshot, query,
  serverTimestamp, deleteDoc, updateDoc
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCuFtjuEJLeQSmI7HSonBzve3Pq1NxIkF4",
  authDomain: "completepost-abd5b.firebaseapp.com",
  projectId: "completepost-abd5b",
  storageBucket: "completepost-abd5b.appspot.com",
  messagingSenderId: "1087595352198",
  appId: "1:1087595352198:web:4de7331a64f3dc66e88107",
  // measurementId: "G-BBLPP702K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
