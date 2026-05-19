// init_db.js
// Ejecutar: node init_db.js
// Es seguro correrlo aunque ya tengas datos — no borra nada.

const Database = require("better-sqlite3");
const db = new Database("incidencias.db");

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS incidencias (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre    TEXT    NOT NULL,
    apellido  TEXT    NOT NULL,
    correo    TEXT    NOT NULL,
    pc_numero TEXT    NOT NULL,
    problema  TEXT    NOT NULL,
    urgencia  TEXT    NOT NULL,
    foto      TEXT    DEFAULT NULL,
    fecha     TEXT    NOT NULL DEFAULT (datetime('now','localtime')),
    estado    TEXT    NOT NULL DEFAULT 'Pendiente'
  );
`);

// Migración segura: agrega columna foto si la tabla ya existía sin ella
try {
  db.exec(`ALTER TABLE incidencias ADD COLUMN foto TEXT DEFAULT NULL;`);
  console.log("✅ Columna 'foto' agregada correctamente.");
} catch (_) {
  console.log("ℹ️  Columna 'foto' ya existía — sin cambios.");
}

console.log("✅ Base de datos lista: incidencias.db");
db.close();
