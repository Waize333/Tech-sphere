import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, sendEmailVerification, User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace with your actual Firebase config details
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Sends a verification email to the currently signed-in user.
 * @param user - The currently signed-in Firebase user.
 * @returns A promise that resolves when the email is sent.
 */
const sendVerificationEmail = async (user: User): Promise<void> => {
  if (!user) {
    throw new Error('No user is currently signed in.');
  }

  try {
    await sendEmailVerification(user);
    console.log('Verification email sent.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

/**
 * Resends the verification email to the currently signed-in user.
 * @returns A promise that resolves when the email is resent.
 */
const resendVerificationEmail = async (): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('No user is currently signed in.');
  }

  try {
    await sendEmailVerification(user);
    console.log('Verification email resent.');
  } catch (error) {
    console.error('Error resending verification email:', error);
    throw error;
  }
};

export { app, auth, db, storage, sendVerificationEmail, resendVerificationEmail };