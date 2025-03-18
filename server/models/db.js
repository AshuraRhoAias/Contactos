import mysql from 'mysql2';

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos"
});

// Verificar conexión
db.connect(err => {
    if (err) {
        console.error("❌ Error de conexión:", err);
        return;
    } else {
        console.log("✅ CONEXIÓN EXITOSA");
    }

});

export default db;