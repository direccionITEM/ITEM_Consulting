# Configuración de Firebase para ITEM Consulting

## 🚀 Primeros pasos

### 1. Habilitar Firestore Database

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto `item-consulting`
3. Ve a **Firestore Database** en el menú lateral
4. Haz clic en **Crear base de datos**
5. Selecciona **modo de prueba** (o producción si prefieres reglas más estrictas)
6. Elige la ubicación `europe-west` (más cercana a España)

### 2. Habilitar Firebase Storage

1. Ve a **Storage** en el menú lateral
2. Haz clic en **Comenzar**
3. Selecciona **modo de prueba**
4. Elige la misma ubicación que Firestore

### 3. Crear colecciones

Las colecciones se crearán automáticamente al añadir el primer documento, pero puedes crearlas manualmente:

- `projects` - Para los proyectos
- `news` - Para las noticias

### 4. Migrar datos existentes

Para migrar los datos iniciales, necesitas:

1. Copiar los datos de `src/hooks/useAuth.ts` (las constantes `initialProjects` e `initialNews`)
2. Pegarlos en el script `scripts/migrate-to-firebase.js`
3. Configurar variables de entorno localmente
4. Ejecutar el script

```bash
# Instalar firebase-admin si es necesario
npm install -g firebase-tools

# Login en Firebase
npx firebase login

# Ejecutar migración
node scripts/migrate-to-firebase.js
```

## 🔒 Configurar reglas de seguridad

### Firestore Rules

Ve a Firestore Database > Reglas y pega:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir lectura pública
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /news/{newsId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules

Ve a Storage > Reglas y pega:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 📋 Resumen de cambios

### Funcionalidades implementadas:

✅ **Login con email/password**  
✅ **Login con Google** (solo correos autorizados)  
✅ **Ver contraseña** (botón de ojo)  
✅ **Añadir proyectos/noticias** con imagen  
✅ **Editar proyectos/noticias**  
✅ **Eliminar proyectos/noticias**  
✅ **Botón de admin** abajo a la derecha (solo en Noticias y Proyectos)  
✅ **Datos en Firebase** (Firestore + Storage)  

### Estructura de datos:

**Proyecto:**
```typescript
{
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}
```

**Noticia:**
```typescript
{
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
}
```

## 🆘 Solución de problemas

### "Error al iniciar sesión con Google"

Verifica que el dominio esté autorizado en:
Firebase Console > Authentication > Settings > Authorized domains

Agrega:
- `localhost`
- `item-consulting.firebaseapp.com`
- Tu dominio de Vercel

### "No se pueden subir imágenes"

Verifica las reglas de Storage y que estés autenticado.

### "No aparecen los datos"

Verifica que:
1. Las colecciones existen en Firestore
2. Las reglas permiten lectura pública
3. Hay documentos en las colecciones
