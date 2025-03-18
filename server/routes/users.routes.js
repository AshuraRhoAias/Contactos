import { Router } from 'express';
import sql from 'sql-template-strings';
import db from '../models/db.js';
import upload from '../multer/multer.js';
import fs from 'fs';

const router = Router();

router.post("/crear", upload.single('file'), (req, res) => {
    const { nombre, numero, correo } = req.body;
    const file = req.file;

    // Verifica si todos los campos están presentes
    if (!nombre || !numero || !correo || !file) {
        console.error("Faltan campos obligatorios:", { nombre, numero, correo, file });
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Solo guardamos la ruta del archivo
    const filePath = file.path.replace('\\', '/'); // Asegura que la ruta sea compatible con diferentes sistemas operativos

    // Consulta SQL para insertar los datos
    const query = "INSERT INTO contact (nombre, numero, correo, foto) VALUES (?, ?, ?, ?)";

    db.query(query, [nombre, numero, correo, filePath], (err, result) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            return res.status(500).json({ error: "Error en la base de datos", details: err });
        }
        console.log("Contacto creado con éxito:", result);
        res.status(201).json({ message: "Contacto creado con éxito" });
    });

});


router.put("/update/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, numero, correo } = req.body;

    // Comprobación de campos obligatorios
    if (!nombre || !numero || !correo) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Verificar si el contacto existe en la base de datos
    const checkQuery = sql`SELECT id FROM contact WHERE id=${id}`;

    db.query(checkQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos al verificar el contacto" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Contacto no encontrado" });
        }

        // Crear la consulta SQL para actualizar el contacto
        const updateQuery = sql`UPDATE contact SET nombre=${nombre}, numero=${numero}, correo=${correo} WHERE id=${id}`;

        // Ejecutar la consulta de actualización
        db.query(updateQuery, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al actualizar el contacto" });
            }
            res.status(200).json({ message: "Contacto actualizado con éxito" });
        });
    });
});

router.delete("/delete/:id", (req, res) => {
    const { id } = req.params;

    // Comprobación de campos obligatorios
    if (!id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Creando la consulta SQL para insertar los datos en la base de datos
    const query = sql`DELETE FROM contact WHERE id=${id}`;

    // Ejecutando la consulta en la base de datos
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.status(201).json({ message: "Contacto borrado con éxito" });
    });
});

router.get("/list", (req, res) => {
    const query = sql`SELECT * FROM contact`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }
        res.status(200).json(result); // Devuelve todos los contactos en formato JSON
    });
});


export default router;
