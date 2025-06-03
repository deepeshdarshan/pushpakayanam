import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuw-WYpsHX98Yz7BwyrvigeE0adXO6uSw",
    authDomain: "pushpakayanam.firebaseapp.com",
    projectId: "pushpakayanam",
    storageBucket: "pushpakayanam.firebasestorage.app",
    messagingSenderId: "875591833793",
    appId: "1:875591833793:web:5bfc3a643fc03e9d54dc40",
    measurementId: "G-D7TBLMT7KL"
};

// Firebase Configuration & Initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//  DOM Elements
const loginForm = document.getElementById("loginForm");
const errorMsg = document.getElementById("error");
const logoutBtn = document.getElementById("logoutBtn");
const userEmailLabel = document.getElementById("userEmail");

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
        } catch (error) {
            console.error("Login error:", error);
            errorMsg.style.color = "red";
            errorMsg.textContent = "Invalid username or password";
        }
    });
}

// Logout Handler
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            console.log("User logged out");
            window.location.href = "/login.html";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    });
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        if (!loginForm) {
            window.location.href = "/login.html";
        }
    } else {
        console.log("Logged in as:", user.email);
        if (userEmailLabel) {
            userEmailLabel.textContent = `Welcome ${user.email}`;
        }
    }
});