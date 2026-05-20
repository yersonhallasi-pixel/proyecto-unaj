# 🛠️ Sistema Integrado de Gestión de Incidencias (SIG) - UNAJ

Plataforma corporativa automatizada para el control operacional, mitigación de riesgos tecnológicos y aseguramiento de la continuidad académica en los laboratorios de cómputo de la Universidad Nacional de Juliaca (UNAJ).

---

## 📂 1. Arquitectura de Estructura de Datos (Directorios)

El proyecto sigue una arquitectura estructurada monolítica ligera dividida por responsabilidades operacionales:

* **` proyecto-unaj/ `** (Raíz del proyecto backend).
    * **`📁 node_modules/`** Contiene las librerías binarias nativas del motor cargadas por NPM. *(Excluido en control de versiones mediante `.gitignore`)*.
    * **`📁 public/`** Capa de presentación (Frontend interactivo).
        * `index.html`: Portal de acceso con control de dominios e interfaz del estudiante.
        * `admin.html`: Tablero analítico gerencial, KPIs dinámicos, bitácora ISO y reportes.
    * **`📁 uploads/`** Repositorio físico local administrado por el servidor para el almacenamiento estático de evidencias fotográficas en formato `JPG`/`PNG`.
    * `server.js`: Núcleo central del backend, enrutamiento, lógica de APIs y middleware.
    * `incidencias.db`: Archivo físico relacional binario que aloja el motor de base de datos local.
    * `init_db.js`: Script de migración y construcción estructural DDL de base de datos.
    * `package.json`: Manifiesto de metadatos, comandos de arranque y árbol de dependencias.

---

## 📋 2. Requerimientos Técnicos del Sistema

### ⚙️ Entorno de Ejecución (Backend)
* **Motor de Servidor:** Node.js (Versión LTS 18.x, 20.x o superior).
* **Framework de Enrutamiento:** `express` (v5.2.1) - Encargado de la gestión de endpoints HTTP, parseo de peticiones y exposición de directorios estáticos.
* **Motor de Base de Datos:** `better-sqlite3` (v12.10.0) - Controlador nativo síncrono de alto rendimiento para SQLite. No requiere servicios o servidores externos.
* **Gestor de Archivos Multi-part:** `multer` (v2.1.1) - Middleware especializado en el manejo de transferencias `multipart/form-data` para subidas de archivos binarios al disco.

### 🌐 Interfaz y Renderizado (Frontend)
* **Hoja de Estilos:** Tailwind CSS v4 cargado de forma optimizada mediante redes de distribución de contenido (CDN).
* **Motor de Graficación:** Chart.js v4 para la construcción adaptativa del Estado de Incidencias y Fallas por Aula.
* **Compatibilidad:** Navegadores modernos basados en Chromium (Google Chrome, Brave, Microsoft Edge) con soporte nativo para ECMAScript 6, `fetch` API y `FileReader`.

---

## 🚀 3. Guía de Despliegue Local (Manual Técnico)

Para clonar, inicializar y ejecutar esta plataforma de auditoría tecnológica en cualquier estación de trabajo, ejecute la siguiente secuencia de comandos en su terminal:

1.  **Instalación del Árbol de Dependencias:**
    ```bash
    npm install
    ```
    *Este comando lee el archivo `package.json`, crea el directorio `node_modules` y descarga las versiones exactas de Express, Better-SQLite3 y Multer.*

2.  **Inicialización de la Infraestructura de Datos:**
    ```bash
    node init_db.js
    ```
    *Ejecuta el bloque de migración segura. Valida la existencia del archivo `incidencias.db`, construye la tabla `incidencias` y aplica una alteración estructurada de control (ALTER TABLE) para asegurar que la columna `foto` esté acoplada sin afectar registros históricos.*

3.  **Lanzamiento del Servicio de Planta:**
    ```bash
    npm start
    ```
    *Corre la instrucción mapeada en los scripts del sistema (`node server.js`), levantando el backend en el puerto 3000 (`http://localhost:3000`) y exponiendo el endpoint administrativo (`/admin`).*

---

## 📊 4. Matriz del Modelo de Datos (Esquema Relacional SQL)

El archivo `incidencias.db` estructura su persistencia a través de la tabla `incidencias` definida por las siguientes restricciones de integridad DDL:

| Campo | Tipo de Datos | Parámetros / Restricciones | Propósito del Campo |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY AUTOINCREMENT | Identificador único y correlativo de la auditoría. |
| `nombre` | TEXT | NOT NULL | Nombre oficial del estudiante que reporta. |
| `apellido` | TEXT | NOT NULL | Apellido del estudiante (Asignado por defecto como 'Estudiante'). |
| `correo` | TEXT | NOT NULL | Correo de validación institucional con dominio (`@unaj.edu.pe`). |
| `pc_numero`| TEXT | NOT NULL | Código o número de la estación tecnológica en falla. |
| `problema` | TEXT | NOT NULL | Cadena descriptiva que incluye la ubicación del laboratorio y el detalle del incidente. |
| `urgencia` | TEXT | NOT NULL | Nivel operacional asignado: `Baja`, `Media` o `Alta`. |
| `foto` | TEXT | DEFAULT NULL | Nombre del archivo físico hash encriptado por el servidor en `/uploads`. |
| `fecha` | TEXT | NOT NULL DEFAULT (datetime('now','localtime')) | Estampa de tiempo automatizada con la zona horaria de Perú. |
| `estado` | TEXT | NOT NULL DEFAULT 'Pendiente' | Flujo del proceso: `Pendiente`, `En Revisión` o `Solucionado`. |

---

## 🔒 5. Políticas Operacionales del Sistema Integrado de Gestión (SIG)

* **ISO 9001 (Calidad):** La persistencia estricta de las variables `fecha` y `estado` permite a los métodos analíticos de la aplicación calcular el porcentaje de soluciones efectivas y el Tiempo Medio de Respuesta Técnico (MTTR).
* **ISO 14001 (Gestión Ambiental):** Al centralizar el almacenamiento en un archivo digital plano mapeado directamente por el servidor, se suprime por completo la necesidad de registros físicos de impresión o bitácoras en papel (Paperless).
* **ISO 45001 (Seguridad y Salud Ocupacional):** El enrutamiento de incidencias filtra dinámicamente las cadenas marcadas bajo la etiqueta de Infraestructura `[INF]` (como cableados expuestos), derivándolas automáticamente a una bitácora parpadeante de alta criticidad en el panel de control para mitigar accidentes de planta de forma inmediata.