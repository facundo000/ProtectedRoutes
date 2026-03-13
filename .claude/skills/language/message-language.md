---
name: lenguaje-de-mensajes
description: Define el idioma del código, logs del servidor y documentación del proyecto.
---

## Reglas de idioma del proyecto

Para mantener consistencia internacional en el código y claridad para el equipo, se deben seguir estas reglas:

### 1. Código y mensajes del sistema
Todo lo relacionado con la ejecución del programa debe estar en **inglés**:

- Código fuente
- Variables
- Nombres de funciones
- Nombres de clases
- Logs del servidor
- Mensajes de error
- Mensajes informativos generados por el sistema
- Salidas de consola
- Respuestas internas de APIs

Ejemplo:

```ts
throw new Error("User not found")
logger.info("Server started on port 3000")