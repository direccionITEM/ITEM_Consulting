# Configuración de Firebase Authentication

## 📋 Resumen de cambios

Se ha migrado el sistema de autenticación de un login local con hash SHA-256 a **Firebase Authentication**.

## 🔧 Pasos para configurar Firebase

### 1. Crear proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Sigue los pasos para crear un nuevo proyecto
4. **No** es necesario habilitar Google Analytics (opcional)

### 2. Registrar la aplicación web

1. En el panel del proyecto, haz clic en el icono `</>` para agregar una app web
2. Dale un nombre a la app (ej: "ITEM Consulting Web")
3. **No** marques la opción de "Firebase Hosting" (ya usas Vercel)
4. Haz clic en "Registrar app"

### 3. Obtener las credenciales

Después de registrar la app, Firebase mostrará un código similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

### 4. Configurar variables de entorno

1. Copia el archivo `.env.example` y renómbralo a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` y reemplaza los valores con los de tu proyecto Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu-api-key-real
   VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

   > ⚠️ **IMPORTANTE**: El archivo `.env` contiene información sensible. **NUNCA** lo subas a Git (ya está en `.gitignore`).

### 5. Crear un usuario en Firebase (para login con email)

1. En Firebase Console, ve a "Authentication" > "Users"
2. Haz clic en "Agregar usuario"
3. Introduce el email y contraseña para el acceso de administración
4. Guarda el usuario

### 6. Habilitar Email/Password como método de login

1. Ve a "Authentication" > "Sign-in method"
2. Haz clic en "Email/Password"
3. Activa la primera opción "Email/Password"
4. Guarda los cambios

### 7. Habilitar Google Sign-In

1. Ve a "Authentication" > "Sign-in method"
2. Haz clic en "Google"
3. Activa el proveedor "Google"
4. Selecciona tu email de soporte
5. Guarda los cambios

> **Nota**: Para desarrollo local, el dominio `localhost` ya está autorizado por defecto en Firebase. Para producción, asegúrate de agregar tu dominio en "Authorized domains".

## 🚀 Ejecutar la aplicación

```bash
npm run dev
```

Ahora el login usará Firebase Authentication en lugar del sistema anterior.

## 📁 Archivos modificados/creados

| Archivo | Descripción |
|---------|-------------|
| `src/lib/firebase.ts` | Configuración de Firebase con Google Sign-In |
| `src/hooks/useAuth.ts` | Hooks de autenticación con email y Google |
| `src/components/Layout.tsx` | Login con email/password y botón de Google |
| `src/pages/Proyectos.tsx` | Login con email/password y botón de Google |
| `src/pages/Noticias.tsx` | Login con email/password y botón de Google |
| `.env.example` | Plantilla de variables de entorno |
| `package.json` | Agregada dependencia `firebase` |

## 🔒 Seguridad

- Las credenciales de Firebase se almacenan en variables de entorno
- Firebase Auth maneja automáticamente la seguridad de las contraseñas
- Las sesiones se gestionan mediante tokens JWT de Firebase
- No es necesario almacenar contraseñas en localStorage

## 📝 Notas adicionales

- El sistema anterior usaba el usuario fijo `ITEM` con contraseña hasheada SHA-256
- Ahora puedes tener múltiples usuarios administradores desde Firebase Console
- Firebase Auth persiste la sesión automáticamente
- **Login con Google**: Solo los correos autorizados pueden acceder:
  - `rayengea@gmail.com`
  - `direccion@itemconsulting.es`
  - Si un usuario intenta acceder con otro correo de Google, se le cerrará la sesión inmediatamente

## 🆘 Solución de problemas

### Error: "Firebase App already exists"
Esto ocurre si intentas inicializar Firebase más de una vez. El archivo `firebase.ts` ya maneja esto correctamente.

### Error: "Invalid API key"
Verifica que las variables de entorno en `.env` sean correctas y que el archivo esté en la raíz del proyecto.

### El login no funciona
1. Verifica que hayas creado un usuario en Firebase Console
2. Asegúrate de que el método Email/Password esté habilitado
3. Revisa la consola del navegador para ver errores específicos

## 📚 Documentación de Firebase

- [Firebase Auth Web](https://firebase.google.com/docs/auth/web/start)
- [Manage Users](https://firebase.google.com/docs/auth/web/manage-users)
