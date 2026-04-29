import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// All keys loaded from environment variables — never hardcoded
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let db = null;

const isConfigValid = Object.values(firebaseConfig).every(
  (val) => val && !val.includes('PLACEHOLDER') && !val.includes('YOUR_')
);

if (isConfigValid) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error('[Firebase] Initialization error:', error);
  }
} else {
  console.info('[Firebase] Running with placeholder config. Firestore writes are disabled.');
}

/**
 * Submits user feedback to the Firestore 'feedback' collection.
 * @param {string} feedbackText - Sanitized feedback string from user.
 * @returns {Promise<boolean>} True if write succeeded, false otherwise.
 */
export const submitFeedback = async (feedbackText) => {
  if (!db) return false;

  try {
    await addDoc(collection(db, 'feedback'), {
      text: feedbackText,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error('[Firestore] Write error:', error);
    return false;
  }
};

export { db };
