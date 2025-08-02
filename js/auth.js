import { app } from "/js/firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const SESSION_TIMEOUT_MINUTES = 20;
const SESSION_KEY = "lastPageLoadTime";

const auth = getAuth(app);

export function initAuth() {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("error");
  const logoutBtn = document.getElementById("logoutBtn");
  const userEmailLabel = document.getElementById("userEmail");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = loginForm.email.value;
      const password = loginForm.password.value;

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        console.error("Login error:", error);
        errorMsg.style.color = "red";
        errorMsg.textContent = "Invalid username or password!";
      }
    });
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
        gotoDashboard(user, errorMsg);
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
}

function gotoDashboard(user, errorMsg) {
  console.log("Login successful:", user);
  errorMsg.style.color = "green";
  errorMsg.textContent = "Logging in...";
  setTimeout(() => {
    window.location.href = "/main/admin/dashboard.html";
  }, 500);
}

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
