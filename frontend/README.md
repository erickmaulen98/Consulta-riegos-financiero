# Consulta de Riesgo Financiero — Frontend

SPA en React + TypeScript para el MVP de consulta de riesgo financiero: login y consulta de *score* por RUT, respetando las restricciones de rol definidas por el backend.

## Requisitos previos

- Node.js 18 o superior
- npm
- El backend corriendo (ver `backend/README.md`)

## Instalación

```bash
cd frontend
npm install
```

## Variables de entorno

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `VITE_API_URL` | URL base de la API backend | `http://localhost:4000` |

Si no creas el `.env`, el frontend igual funciona apuntando a `http://localhost:4000` (fallback definido en el código).

## Ejecución

```bash
npm run dev
```

La app queda disponible en `http://localhost:5173`.

## Flujo de la aplicación

1. **Login** (`/login`): formulario de usuario/contraseña. Usa las mismas credenciales mock del backend (ver `backend/README.md`). Al loguearse, el JWT se guarda en `localStorage` y queda configurado como header `Authorization` en todas las peticiones siguientes.
2. **Consulta de score** (`/score`, ruta protegida): 
   - Si el usuario logueado tiene rol `admin`, puede ingresar cualquier RUT.
   - Si tiene rol `user`, el campo viene precargado y bloqueado con su propio RUT (no puede consultar otro).
3. **Logout**: botón visible en la página de consulta, limpia la sesión y redirige a `/login`.

## Manejo de errores

- Credenciales inválidas en el login: se muestra el mensaje devuelto por el backend.
- Token expirado o inválido durante una consulta (401): se cierra la sesión automáticamente y se pide volver a loguearse.
- Consulta de un RUT ajeno con rol `user` (403): se muestra el mensaje de permiso denegado, sin cerrar la sesión.
- Errores de red / servidor caído: mensaje genérico.

## Estructura relevante

```
src/
  components/    # PrivateRoute, ErrorMessage
  context/       # AuthContext (sesion, login/logout, persistencia)
  pages/         # LoginPage, ScorePage
  services/      # api.ts (axios), auth.service.ts, score.service.ts
  utils/         # jwt.utils.ts (decodifica el token en el navegador)
  types/         # tipos compartidos (Role, AuthUser, ScoreResult)
```