# API de Consulta de Riesgo Financiero — Backend

MVP de una API REST para Pronto Paga: permite iniciar sesión y consultar el *score* crediticio de un RUT, aplicando autenticación vía JWT y autorización basada en roles (`admin` / `user`).

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación

```bash
cd backend
npm install
```

## Variables de entorno

Copia el archivo de ejemplo y ajústalo si es necesario:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto en el que escucha el servidor | `4000` |
| `JWT_SECRET` | Secreto usado para firmar y verificar los JWT | `change-this-secret-in-production` |
| `JWT_EXPIRES_IN_SECONDS` | Tiempo de expiración del token, en segundos | `3600` (1 hora) |

## Ejecución

**Desarrollo** (con recarga automática):
```bash
npm run dev
```


El servidor queda disponible en `http://localhost:4000` (o el puerto que hayas definido en `PORT`).

## Usuarios mock (credenciales de prueba)

No hay base de datos: la autenticación se valida contra este arreglo en memoria (`src/data/users.ts`).

| username | password | role | rut |
|---|---|---|---|
| `admin` | `admin9998` | `admin` | — |
| `user` | `user9998` | `user` | `20183048-6` |
| `user2` | `user9998` | `user` | `19973815-1` |

## Endpoints

### `POST /login`

Simula la autenticación y devuelve un JWT firmado.

**Body:**
```json
{
  "username": "admin",
  "password": "admin9998"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

El payload del token incluye `sub` (id del usuario) y `role`. Si el rol es `user`, además incluye `rut`; si es `admin`, no.

**Errores:**
| Código | Caso |
|---|---|
| `400` | Falta `username` o `password` en el body |
| `401` | Credenciales inválidas |

### `GET /score/:rut`

Devuelve el score financiero de un RUT. Requiere autenticación.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "rut": "20183048-6",
  "score": 73,
  "fecha": "2025-06-27T14:35:00.000Z"
}
```

**Errores:**
| Código | Caso |
|---|---|
| `401` | No se envió token, el token es inválido o expiró |
| `403` | Un usuario con rol `user` intenta consultar un RUT que no es el suyo |

## Reglas de autorización

- **`admin`**: puede consultar el score de cualquier RUT.
- **`user`**: solo puede consultar su propio RUT (el que viene en su token). Si intenta consultar otro, recibe `403`.

## Sobre el cálculo del score

El score **no es un valor real de riesgo crediticio**: se calcula con un hash determinístico (djb2) sobre el RUT normalizado, acotado al rango 0-100 (`hash % 101`). Esto garantiza que el mismo RUT siempre devuelva el mismo score, y que RUTs distintos devuelvan valores distintos — cumpliendo el requisito de determinismo del desafío, sin necesidad de persistencia en base de datos.

## Health check

```
GET /health
```
Devuelve `200` si el servidor está corriendo.
