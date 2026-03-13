# Protected Routes API

API NestJS con autenticación JWT, control de acceso basado en roles y gestión de imagen de perfil por usuario.

---

## Requisitos previos

- Node.js >= 18
- PostgreSQL
- Docker (opcional)

---

## Instalación

1. Clona el repositorio e instala dependencias:
```bash
git clone https://github.com/your-username/protected-routes-api.git
cd protected-routes-api
npm install
```

2. Crea el archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rutasProtegidas
DB_USERNAME=postgres
DB_PASSWORD=your-password
JWT_SECRET=your-jwt-secret
PORT=3000
```

3. Levanta la base de datos con Docker (opcional):
```bash
docker compose up -d
```

4. Inicia el servidor en modo desarrollo:
```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000/protected-routes/v1`.

---

## Documentación Swagger

Disponible en `http://localhost:3000/api` una vez iniciado el servidor.

---

## Autenticación

La API usa autenticación **JWT Bearer**. Al hacer login o registro se devuelve un token que debe incluirse en el header de las siguientes peticiones:

```
Authorization: Bearer <token>
```

El token expira en **1 hora**.

---

## Roles

| Rol     | Descripción                                      |
|---------|--------------------------------------------------|
| `user`  | Usuario estándar. Gestiona su propia cuenta.     |
| `admin` | Administrador. Acceso completo a todos los usuarios. |

---

## Endpoints

Todos los endpoints tienen el prefijo `/protected-routes/v1`.

### Auth

| Método | Ruta                      | Acceso       | Descripción                              |
|--------|---------------------------|--------------|------------------------------------------|
| POST   | `/auth/register`          | Público      | Registra un nuevo usuario                |
| POST   | `/auth/login`             | Público      | Inicia sesión y devuelve un JWT          |
| GET    | `/auth/check-status`      | Opcional     | Verifica el estado de autenticación      |

### Users

| Método | Ruta                        | Acceso            | Descripción                                         |
|--------|-----------------------------|-------------------|-----------------------------------------------------|
| GET    | `/users`                    | `admin`           | Lista todos los usuarios                            |
| GET    | `/users/profile/:id`        | `user` / `admin`  | Obtiene perfil por ID (solo el propio si es `user`) |
| PATCH  | `/users/:id`                | Autenticado       | Actualiza nombre y apellido de la propia cuenta     |
| POST   | `/users/upload-image`       | Autenticado       | Sube o reemplaza la imagen de perfil propia         |
| DELETE | `/users/remove/:id`         | `user` / `admin`  | Elimina la propia cuenta (admin puede eliminar cualquiera) |

---

## Imagen de perfil

El endpoint `POST /users/upload-image` acepta un archivo mediante `multipart/form-data` con el campo `file`.

- **Formatos permitidos:** `jpg`, `jpeg`, `png`, `gif`, `webp`
- **Tamaño máximo:** 5 MB
- Las imágenes se almacenan en `public/uploads/` y se sirven en `/uploads/<filename>`
- Al subir una nueva imagen, la anterior se elimina automáticamente del disco
- Al eliminar una cuenta, su imagen de perfil también se elimina

**Ejemplo de respuesta:**
```json
{
  "profileImage": "/uploads/1718000000000-123456789.jpg"
}
```

---

## Control de acceso por política

- Un usuario con rol `user` **solo puede** ver, modificar y eliminar **su propia cuenta**.
- Un usuario con rol `admin` puede realizar esas operaciones sobre **cualquier cuenta**.
- Intentar operar sobre la cuenta de otro usuario devuelve `403 Forbidden`.

---

## Variables de entorno

| Variable      | Descripción                    | Default |
|---------------|--------------------------------|---------|
| `DB_HOST`     | Host de la base de datos       | —       |
| `DB_PORT`     | Puerto de PostgreSQL           | `5432`  |
| `DB_NAME`     | Nombre de la base de datos     | —       |
| `DB_USERNAME` | Usuario de PostgreSQL          | —       |
| `DB_PASSWORD` | Contraseña de PostgreSQL       | —       |
| `JWT_SECRET`  | Clave secreta para firmar JWTs | —       |
| `PORT`        | Puerto del servidor            | `3000`  |
