import { db, doc, getDoc, runTransaction } from "/js/firestore.js";

const counterDoc = doc(db, "counters", "page-visits");

// Session-based visit flag
const VISIT_KEY = "hasVisited";
const hasVisited = sessionStorage.getItem(VISIT_KEY);

// Increment only once per session
async function incrementVisit() {
    if (!hasVisited) {
        try {
            await runTransaction(db, async (transaction) => {
                const docSnap = await transaction.get(counterDoc);
                if (!docSnap.exists()) {
                    transaction.set(counterDoc, { count: 1 });
                } else {
                    const newCount = docSnap.data().count + 1;
                    transaction.update(counterDoc, { count: newCount });
                }
            });
            sessionStorage.setItem(VISIT_KEY, "true");
        } catch (err) {
            console.error("Transaction failed:", err);
        }
    }
}

async function showVisitCount() {
    try {
        const snap = await getDoc(counterDoc);
        if (snap.exists()) {
            document.getElementById("visitCount").textContent = snap.data().count;
        }
    } catch (err) {
        console.error("Error fetching count:", err);
    }
}

// Call the functions
export function initVisitCounter() {
    incrementVisit().then(showVisitCount);
}