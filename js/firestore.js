import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    runTransaction,
    query,
    orderBy,
    where,
    limit,
    limitToLast,
    startAfter,
    endBefore
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuw-WYpsHX98Yz7BwyrvigeE0adXO6uSw",
    authDomain: "pushpakayanam.firebaseapp.com",
    projectId: "pushpakayanam",
    storageBucket: "pushpakayanam.firebasestorage.app",
    messagingSenderId: "875591833793",
    appId: "1:875591833793:web:5bfc3a643fc03e9d54dc40",
    measurementId: "G-D7TBLMT7KL"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db,
    app,
    collection,
    getDoc,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    runTransaction,
    query,
    orderBy,
    where,
    limit,
    limitToLast,
    startAfter,
    endBefore
};

export async function addData(collection, document) {
    await addDoc(collection, document);
}

export async function updateData(docId, collectionName, data) {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
}

export async function deleteData(docId, db, collectionName) {
    await deleteDoc(doc(db, collectionName, docId));
}

export async function getData(query) {
    return await getDocs(query);
}
