# Sistema web de gestión de empleados

Proyecto académico SENA de desarrollo full stack. Permite administrar registros de empleados mediante una interfaz web conectada a un servidor y una base de datos.

## Funcionalidades
- Registro y consulta de empleados.
- Actualización y eliminación de registros.
- Comunicación HTTP entre frontend y backend.

## Tecnologías
JavaScript, React, Axios, Bootstrap, Node.js, Express y MySQL.

## Arquitectura
- `src/`: interfaz React.
- `server/index.js`: servidor Express y operaciones de base de datos.
- `package.json` y `server/package.json`: dependencias de cada componente.

## API
| Método | Ruta |
| --- | --- |
| POST | /create |
| GET | /empleados |
| PUT | /update |
| DELETE | /delete/:id |

## Instalación local (Git Bash)
Requiere Node.js, npm y MySQL. Clona el repositorio:

```bash
git clone https://github.com/AstharoXs/ProyectoNode.js.git
cd ProyectoNode.js
npm ci
cd server
npm ci
```

Prepara una base de datos local de pruebas y revisa la configuración y las consultas en server/index.js para crear el esquema compatible. No uses credenciales reales en el código publicado.

Inicia el backend desde server:

```bash
node index.js
```

En otra terminal, desde la raíz del proyecto:

```bash
npm start
```

Frontend: http://localhost:3000. Backend: puerto 3001.

## Estado
Proyecto académico. Instalación y pruebas pendientes de validación en un entorno limpio. Queda pendiente documentar el esquema SQL y externalizar la configuración de conexión.
