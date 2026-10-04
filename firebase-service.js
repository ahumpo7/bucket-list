/**
 * Firebase Authentication & Firestore Realtime Database Service
 * Asynchronously loads pre-bundled Firebase Compat SDK in the background
 * so it NEVER blocks UI rendering, Leaflet map initialization, or user interaction.
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
    this.isLoadingSdk = false;
    this.sdkLoaded = false;
    this._loadPromise = null;
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

  // Asynchronously load Firebase SDK in background (parallel non-blocking downloads)
  async loadSdk() {
    if (this.sdkLoaded) return true;
    if (typeof firebase !== 'undefined' && firebase.auth && firebase.firestore) {
      this.sdkLoaded = true;
      return true;
    }

    if (this._loadPromise) {
      return this._loadPromise;
    }

    this._loadPromise = (async () => {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          // Check if already injected
          const existing = document.querySelector(`script[src="${src}"]`);
          if (existing) {
            if (existing.getAttribute('data-loaded') === 'true') return resolve();
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', (e) => reject(e));
            return;
          }

          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = () => {
            script.setAttribute('data-loaded', 'true');
            resolve();
          };
          script.onerror = (err) => reject(err);
          document.head.appendChild(script);
        });
      };

      try {
        // Step 1: Base App SDK
        await loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
        // Step 2: Auth and Firestore in parallel
        await Promise.all([
          loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth-compat.js'),
          loadScript('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js')
        ]);

        this.sdkLoaded = true;
        return true;
      } catch (err) {
        console.error("Failed to load Firebase scripts asynchronously:", err);
        return false;
      }
    })();

    return this._loadPromise;
  }

  async init() {
    const config = this.getConfig();
    if (!config || !config.apiKey || !config.projectId) {
      this.isConfigured = false;
      this.authResolved = true;
      this.notifyAuthChange(null);
      return false;
    }

    const loaded = await this.loadSdk();
    if (!loaded || typeof firebase === 'undefined') {
      console.warn("Firebase SDK could not be loaded.");
      this.isConfigured = false;
      this.authResolved = true;
      this.notifyAuthChange(null);
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
        if (user) {
          localStorage.setItem('romantic_user_signed_in', 'true');
        } else {
          localStorage.removeItem('romantic_user_signed_in');
        }
        this.notifyAuthChange(user);
      });

      window.dispatchEvent(new CustomEvent('firebase-service-ready'));
      return true;
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      this.isConfigured = false;
      this.authResolved = true;
      this.notifyAuthChange(null);
      return false;
    }
  }

  notifyAuthChange(user) {
    this.authCallbacks.forEach(cb => {
      try { cb(user); } catch (err) { console.error(err); }
    });
  }

  // Real Google Sign-In with popup
  async loginWithGoogle() {
    if (!this.sdkLoaded) {
      await this.loadSdk();
    }
    if (!this.isConfigured) {
      await this.init();
    }
    if (!this.isConfigured) {
      throw new Error("CONFIG_MISSING");
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await this.auth.signInWithPopup(provider);
      this.currentUser = result.user;
      localStorage.setItem('romantic_user_signed_in', 'true');
      return result.user;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  }

  // Sign out
  async logout() {
    localStorage.removeItem('romantic_user_signed_in');
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

// Kick off background initialization without blocking main thread
if (typeof window !== 'undefined') {
  // Use requestIdleCallback or immediate setTimeout to run in background
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => window.firebaseService.init());
  } else {
    setTimeout(() => window.firebaseService.init(), 100);
  }
}
