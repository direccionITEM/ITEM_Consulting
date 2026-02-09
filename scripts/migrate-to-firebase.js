// Script para migrar datos iniciales a Firebase
// Ejecutar con: node scripts/migrate-to-firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Aquí pegaremos los datos de proyectos y noticias para migrarlos
const projects = [];
const news = [];

async function migrate() {
  console.log('Migrando proyectos...');
  for (const project of projects) {
    try {
      await addDoc(collection(db, 'projects'), project);
      console.log(`✓ Proyecto migrado: ${project.title}`);
    } catch (error) {
      console.error(`✗ Error migrando proyecto: ${project.title}`, error);
    }
  }

  console.log('Migrando noticias...');
  for (const item of news) {
    try {
      await addDoc(collection(db, 'news'), item);
      console.log(`✓ Noticia migrada: ${item.title}`);
    } catch (error) {
      console.error(`✗ Error migrando noticia: ${item.title}`, error);
    }
  }

  console.log('Migración completada!');
  process.exit(0);
}

migrate();
