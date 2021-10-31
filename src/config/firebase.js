import firebase from 'firebase/firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCQazDW8--q6GVYUC-P-f9Ek1foIZf373c',
  authDomain: 'project-h-u-team.firebaseapp.com',
  projectId: 'project-h-u-team',
  storageBucket: 'project-h-u-team.appspot.com',
  messagingSenderId: '684124269704',
  appId: '1:684124269704:web:de3b0e1735eae3c0e2033d',
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

provider.setCustomParameters({
  prompt: 'select_account',
});

export { db, auth, provider, storage };
