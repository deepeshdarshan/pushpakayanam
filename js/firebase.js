import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, where, limit, startAfter } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";


const SESSION_TIMEOUT_MINUTES = 15;
const SESSION_KEY = 'lastPageLoadTime';

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
const auth = getAuth(app);
const db = getFirestore(app);

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, orderBy, where, limit, startAfter };

//  DOM Elements
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");
const logoutBtn = document.getElementById("logoutBtn");
const userEmailLabel = document.getElementById("userEmail");
const contests = document.getElementById("contests");

// Login Handler
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            errorMsg.style.color = "blue";
            errorMsg.textContent = "Logging in...";
            console.log("Login successful:", user);
            errorMsg.style.color = "green";
            errorMsg.textContent = "Login successful! Please wait...";

            setTimeout(() => {
                window.location.href = "/main/admin/dashboard.html";
            }, 1500);
            localStorage.setItem(SESSION_KEY, Date.now());
        } catch (error) {
            console.error("Login error:", error);
            errorMsg.style.color = "red";
            errorMsg.textContent = "Invalid username or password";
        }
    });
}

// Logout Handler
async function logoutUser() {
    try {
        await signOut(auth);
        localStorage.removeItem(SESSION_KEY);
        console.log("User logged out");
        window.location.href = "/login.html";
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        logoutUser();
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        localStorage.setItem(SESSION_KEY, Date.now());
        checkSessionTimeout();

        // If user is on login.html and already logged in, redirect to dashboard
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "/main/admin/dashboard.html";
        } else if (userEmailLabel) {
            userEmailLabel.textContent = `${user.email}`;
        }
    } else {
        localStorage.removeItem(SESSION_KEY);

        // If user is not logged in and is not on login page, redirect to login
        if (!window.location.pathname.includes("login.html")) {
            window.location.href = "/login.html";
        }
    }
});

if (contests) {
    document.addEventListener('DOMContentLoaded', async () => {
        if (document.getElementById('contests')) {
            const data = await fetchDocuments();
            console.log(data);
        }
    });
}

function checkSessionTimeout() {
    const lastLoad = localStorage.getItem(SESSION_KEY);
    if (!lastLoad) {
        // No previous session info, set current time
        localStorage.setItem(SESSION_KEY, Date.now());
        return;
    }
    const lastLoadTime = parseInt(lastLoad, 10);
    const now = Date.now();
    const diffMinutes = (now - lastLoadTime) / 1000 / 60;

    if (diffMinutes > SESSION_TIMEOUT_MINUTES) {
        logoutUser();
    } else {
        setTimeout(logoutUser, (SESSION_TIMEOUT_MINUTES - diffMinutes) * 60 * 1000);
    }
}

export async function fetchDocuments() {
    const querySnapshot = await getDocs(collection(db, "pushpakayanam_contests"));
    querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id);
        console.log("Fields:", doc.data());
    });
}