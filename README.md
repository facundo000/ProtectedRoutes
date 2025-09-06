# Proyecto NestJS - Rutas protegidas con roles

Este proyecto es una práctica para implementar autenticación y autorización con roles en **NestJS**.  
El objetivo es contar con endpoints públicos, privados y de administración, protegidos mediante **JWT** y **guards** de roles.

---

## 📌 Pasos del desarrollo

### 1. Preparación del proyecto
- Crear un proyecto nuevo con NestJS (`nest new`).
- Configurar conexión con la base de datos (PostgreSQL, MySQL o similar).
- Instalar y configurar **TypeORM** o **Prisma**.

---

### 2. Entidad Usuario
Definir la entidad `Usuario` con los siguientes campos:
- `id`
- `username`
- `nombre`
- `apellido`
- `password` (encriptado con bcrypt)
- `rol` (enum: `ADMIN`, `USER`)

---

### 3. Módulo de autenticación
- Crear un `AuthModule` con:
  - Servicio para login
  - Servicio para registro
  - Generación de JWT (`@nestjs/jwt`)
- Implementar `LocalStrategy` y `JwtStrategy`.

---

### 4. Guards de seguridad
- `JwtAuthGuard`: Verifica el token JWT.
- `RolesGuard`: Verifica que el usuario tenga el rol requerido (usando `@SetMetadata('roles', [...])`).

---

### 5. Endpoints

#### Públicos (noAuth)
- `POST /auth/register` → Crear usuario
- `POST /auth/login` → Generar token

#### Usuario autenticado
- `GET /users/profile` → Devuelve datos del usuario autenticado

#### Administrador
- `GET /users` → Listar todos los usuarios
- `DELETE /users/:id` → Borrar usuario
- `PATCH /users/:id` → Cambiar rol (opcional)

---

### 6. Decoradores personalizados
- `@Roles('ADMIN')`: Restringe el acceso a ciertos roles.
- `@User()`: Extrae datos del usuario desde el token.

---

### 7. Flujo esperado
1. Un usuario nuevo se registra.  
2. Inicia sesión y obtiene un **JWT**.  
3. Usuario autenticado accede a `/users/profile`.  
4. Si es **admin**, puede listar y borrar usuarios.  

---

### 8. Extras recomendados
- Hash de contraseñas con **bcrypt**.
- Validación de DTOs con **class-validator**.
- Manejo de excepciones (`ForbiddenException`, `UnauthorizedException`).
