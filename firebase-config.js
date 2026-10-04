/**
 * Firebase Configuration for Couple's Travel Bucket List
 * 
 * To connect your own free Google Firebase project:
 * 1. Go to https://console.firebase.google.com
 * 2. Click "Add project" (name it e.g. "our-travel-bucket-list")
 * 3. In the project dashboard:
 *    - Click the Web icon (</>) to create a Web App
 *    - Copy the firebaseConfig keys and paste them below (or paste them in the app's settings modal!)
 * 4. In Firebase Console sidebar:
 *    - Go to "Build" > "Authentication" > "Get Started" > select "Google" > Enable it
 *    - Go to "Build" > "Firestore Database" > "Create Database" > start in "Test mode"
 *    - Under Authentication > "Settings" > "Authorized domains", add your GitHub Pages domain:
 *      ahumpo7.github.io (and localhost is enabled by default)
 */

window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Default Shared Couple List ID (both users log in and share this list!)
window.DEFAULT_COUPLE_LIST_ID = "our-adventures-bucket-list";
