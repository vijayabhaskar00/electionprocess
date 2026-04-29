import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// PLACEHOLDER: Please update this with your actual Firebase config
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

let app;
export let db = null;

try {
  // Only initialize if the placeholder has been replaced
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export const submitFeedback = async (feedbackText) => {
  if (!db) {
    console.warn("Firestore is not initialized. Make sure to add your config in src/utils/firebase.js. Feedback not saved:", feedbackText);
    return false;
  }
  
  try {
    await addDoc(collection(db, "feedback"), {
      text: feedbackText,
      timestamp: new Date()
    });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};
