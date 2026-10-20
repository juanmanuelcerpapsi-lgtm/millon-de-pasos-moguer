# Un Millón de Pasos - Moguer

Este proyecto ya incluye la parte pública del recorrido y la inscripción de personas.

Para que la creación de rutas quede protegida y solo la haga el administrador, se añaden estos archivos:

- `admin.html`: página privada para crear senderos
- `supabase/schema.sql`: esquema de base de datos con permisos
- `supabase/functions/create-route/index.ts`: Edge Function segura para crear rutas

## Requisitos

- Proyecto de Supabase
- URL del proyecto
- Anon Key para la parte pública
- Service role key para la Edge Function
- clave secreta `ADMIN_KEY`

## Cómo usarlo

1. Ejecuta `supabase/schema.sql` en el SQL editor de Supabase.
2. Habilita Realtime para `routes` y `route_participants`.
3. Crea la Edge Function y añade la variable `ADMIN_KEY`.
4. En `admin.html` cambia la URL de la Edge Function por la URL real de tu proyecto.
5. Publica `index.html` para la parte pública.
6. Usa `admin.html` solo desde un entorno privado del administrador.

## Nota importante

La parte pública de un sitio HTML estático no puede compartir datos entre distintos usuarios sin una base de datos real y un backend.

Para que todos vean los senderos y los participantes en tiempo real, debes usar Supabase o cualquier backend con base de datos compartida.

Este repositorio ya tiene la lógica de administración y del flujo de inscripción, pero la sincronización real entre personas requiere una base de datos compartida.
