import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Funciones de autenticación
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = (): Promise<import('firebase/auth').UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Funciones de Firestore para Proyectos
export const projectsCollection = collection(db, 'projects');

export const getProjects = async () => {
  const q = query(projectsCollection, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getProjectById = async (id: string) => {
  const docRef = doc(db, 'projects', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};

export const addProject = async (project: any) => {
  const docRef = await addDoc(projectsCollection, {
    ...project,
    createdAt: Timestamp.now(),
  });
  return { id: docRef.id, ...project };
};

export const updateProject = async (id: string, project: any) => {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, {
    ...project,
    updatedAt: Timestamp.now(),
  });
};

export const deleteProject = async (id: string) => {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
};

// Funciones de Firestore para Noticias
export const newsCollection = collection(db, 'news');

export const getNews = async () => {
  const q = query(newsCollection, orderBy('date', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getNewsById = async (id: string) => {
  const docRef = doc(db, 'news', id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};

export const addNewsItem = async (newsItem: any) => {
  const docRef = await addDoc(newsCollection, {
    ...newsItem,
    createdAt: Timestamp.now(),
  });
  return { id: docRef.id, ...newsItem };
};

export const updateNewsItem = async (id: string, newsItem: any) => {
  const docRef = doc(db, 'news', id);
  await updateDoc(docRef, {
    ...newsItem,
    updatedAt: Timestamp.now(),
  });
};

export const deleteNewsItem = async (id: string) => {
  const docRef = doc(db, 'news', id);
  await deleteDoc(docRef);
};

// Funciones de Storage para imágenes
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

export type { FirebaseUser };
