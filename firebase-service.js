/**
 * Firebase Authentication & Firestore Realtime Database Service
 * Uses Firebase SDK v10 via ES Modules
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.currentUser = null;
    this.unsubscribeTrips = null;
    this.isConfigured = false;
    this.coupleListId = localStorage.getItem('couple_list_id') || window.DEFAULT_COUPLE_LIST_ID || "our-adventures-bucket-list";
  }

  // Load config from window.FIREBASE_CONFIG or localStorage
  getConfig() {
    try {
      const stored = localStorage.getItem('custom_firebase_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.apiKey && parsed.projectId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not parse stored Firebase config", e);
    }

    if (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.apiKey && window.FIREBASE_CONFIG.projectId) {
      return window.FIREBASE_CONFIG;
    }

    return null;
  }

  init() {
    const config = this.getConfig();
    if (!config || !config.apiKey || !config.projectId) {
      this.isConfigured = false;
      console.log("Firebase is not configured yet. Running in Local Storage mode.");
      return false;
    }

    try {
      if (!getApps().length) {
        this.app = initializeApp(config);
      } else {
        this.app = getApps()[0];
      }
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.isConfigured = true;
      console.log("Firebase initialized successfully with project:", config.projectId);
      return true;
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      this.isConfigured = false;
      return false;
    }
  }

  // Real Google Sign-In with popup
  async loginWithGoogle() {
    if (!this.isConfigured) {
      throw new Error("CONFIG_MISSING");
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(this.auth, provider);
      this.currentUser = result.user;
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  }

  // Sign out
  async logout() {
    if (this.unsubscribeTrips) {
      this.unsubscribeTrips();
      this.unsubscribeTrips = null;
    }

    if (this.auth) {
      await signOut(this.auth);
    }
    this.currentUser = null;
  }

  // Listen to Auth State Changes
  onAuthChange(callback) {
    if (!this.isConfigured || !this.auth) {
      callback(null);
      return;
    }

    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      callback(user);
    });
  }

  // Real-time Firestore Sync for the shared Couple Bucket List
  subscribeToCoupleTrips(callback) {
    if (!this.isConfigured || !this.db) return null;

    if (this.unsubscribeTrips) {
      this.unsubscribeTrips();
    }

    const listRef = doc(this.db, "couple_bucket_lists", this.coupleListId);

    this.unsubscribeTrips = onSnapshot(listRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (Array.isArray(data.trips)) {
          callback(data.trips, {
            updatedAt: data.updatedAt,
            lastUpdatedBy: data.lastUpdatedBy
          });
        }
      } else {
        // Document doesn't exist yet in cloud
        callback(null);
      }
    }, (error) => {
      console.error("Firestore sync subscription error:", error);
    });

    return this.unsubscribeTrips;
  }

  // Save trips to Firestore (syncs in real time to both devices!)
  async syncTripsToCloud(trips) {
    if (!this.isConfigured || !this.db || !this.currentUser) return false;

    const listRef = doc(this.db, "couple_bucket_lists", this.coupleListId);
    try {
      await setDoc(listRef, {
        trips: trips,
        updatedAt: new Date().toISOString(),
        lastUpdatedBy: {
          uid: this.currentUser.uid,
          name: this.currentUser.displayName || 'Google User',
          email: this.currentUser.email,
          photoURL: this.currentUser.photoURL
        }
      }, { merge: true });
      return true;
    } catch (error) {
      console.error("Failed to sync trips to Firestore:", error);
      throw error;
    }
  }

  // Set Couple List Room ID
  setCoupleListId(newId) {
    if (!newId || !newId.trim()) return;
    this.coupleListId = newId.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    localStorage.setItem('couple_list_id', this.coupleListId);
  }
}

// Attach singleton to window
window.firebaseService = new FirebaseService();
window.firebaseService.init();

// Dispatch event so app.js knows FirebaseService is ready
window.dispatchEvent(new CustomEvent('firebase-service-ready'));
