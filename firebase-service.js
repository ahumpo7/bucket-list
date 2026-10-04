/**
 * Firebase Authentication & Firestore Realtime Database Service
 * Uses pre-bundled Firebase Compat SDK for ultra-fast load times (no 60+ ES module waterfall)
 */

class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.currentUser = null;
    this.unsubscribeTrips = null;
    this.isConfigured = false;
    this.coupleListId = localStorage.getItem('couple_list_id') || window.DEFAULT_COUPLE_LIST_ID || "our-adventures-bucket-list";
    this.authCallbacks = [];
    this.authResolved = false;
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
    if (typeof firebase === 'undefined') {
      console.warn("Firebase SDK not yet loaded in window.");
      return false;
    }

    const config = this.getConfig();
    if (!config || !config.apiKey || !config.projectId) {
      this.isConfigured = false;
      this.authResolved = true;
      this.authCallbacks.forEach(cb => {
        try { cb(null); } catch (err) { console.error(err); }
      });
      return false;
    }

    try {
      if (!firebase.apps.length) {
        this.app = firebase.initializeApp(config);
      } else {
        this.app = firebase.app();
      }
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.isConfigured = true;

      // Watch auth state changes
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
        this.authResolved = true;
        this.authCallbacks.forEach(cb => {
          try { cb(user); } catch (err) { console.error(err); }
        });
      });

      return true;
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      this.isConfigured = false;
      this.authResolved = true;
      this.authCallbacks.forEach(cb => {
        try { cb(null); } catch (err) { console.error(err); }
      });
      return false;
    }
  }

  // Real Google Sign-In with popup
  async loginWithGoogle() {
    if (!this.isConfigured) {
      throw new Error("CONFIG_MISSING");
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await this.auth.signInWithPopup(provider);
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
      await this.auth.signOut();
    }
    this.currentUser = null;
  }

  // Listen to Auth State Changes
  onAuthChange(callback) {
    this.authCallbacks.push(callback);
    if (this.authResolved) {
      callback(this.currentUser);
    }
  }

  // Real-time Firestore Sync for the shared Couple Bucket List
  subscribeToCoupleTrips(callback) {
    if (!this.isConfigured || !this.db) return null;

    if (this.unsubscribeTrips) {
      this.unsubscribeTrips();
      this.unsubscribeTrips = null;
    }

    const listRef = this.db.collection("couple_bucket_lists").doc(this.coupleListId);

    this.unsubscribeTrips = listRef.onSnapshot((docSnap) => {
      if (docSnap.exists) {
        const data = docSnap.data();
        if (Array.isArray(data.trips)) {
          callback(data.trips, {
            updatedAt: data.updatedAt,
            lastUpdatedBy: data.lastUpdatedBy
          });
        }
      } else {
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

    const listRef = this.db.collection("couple_bucket_lists").doc(this.coupleListId);
    try {
      await listRef.set({
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

// Try initializing immediately or as soon as firebase script finishes loading
function tryInitFirebase() {
  if (typeof firebase !== 'undefined' && window.firebaseService) {
    window.firebaseService.init();
    window.dispatchEvent(new CustomEvent('firebase-service-ready'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', tryInitFirebase);
} else {
  tryInitFirebase();
}
