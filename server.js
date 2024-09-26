const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const DATA_FILE = 'data.json';

// Middleware
app.use(bodyParser.json());

// Ruta GET
app.get('/data', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

// Ruta POST
app.post('/data', (req, res) => {
    const newData = req.body;

    // Guardar el nuevo objeto en el archivo JSON
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar los datos' });
        }
        res.status(201).json({ message: 'Datos guardados exitosamente' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});