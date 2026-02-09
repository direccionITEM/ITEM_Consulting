# Solución problema Google Sign-In

## 🔧 Para solucionar "se abre y se cierra la ventana":

### 1. Verificar dominios autorizados en Firebase

Ve a [Firebase Console](https://console.firebase.google.com/) → Authentication → Settings → Authorized domains

Agrega estos dominios:
- `localhost` (ya debería estar)
- `item-consulting.firebaseapp.com` (ya debería estar)
- `item-consulting.web.app` (si usas Firebase Hosting)
- Tu dominio de Vercel: `tudominio.vercel.app`
- Tu dominio personalizado (si tienes): `www.tudominio.com`

### 2. Habilitar Google Sign-In

Ve a Authentication → Sign-in method → Google → Habilitar

### 3. Verificar que el popup no esté bloqueado

El navegador puede estar bloqueando ventanas emergentes. Verifica:
- Icono de bloqueo en la barra de direcciones
- Configuración de popup del navegador

### 4. Probar en modo incógnito

Abre el sitio en modo incógnito/private browsing para evitar conflictos con caché o cookies.

## 📝 Mensajes de error comunes:

| Código | Significado | Solución |
|--------|-------------|----------|
| `auth/popup-blocked` | Popup bloqueado | Permitir ventanas emergentes |
| `auth/popup-closed-by-user` | Usuario cerró ventana | Intentar de nuevo |
| `auth/unauthorized-domain` | Dominio no autorizado | Agregar dominio en Firebase Console |
| `auth/cancelled-popup-request` | Múltiples popups | Solo hacer clic una vez |

## ✅ Verificación rápida:

1. Abre la consola del navegador (F12)
2. Intenta iniciar sesión con Google
3. Revisa si hay mensajes de error en rojo
4. El mensaje ahora debería ser más descriptivo
