const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
const DATA_FILE = 'data.json';

// Middleware
app.use(cors({
    origin: 'chrome-extension://hbfponicjjmfebjlgebjbpcgajdclffo',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());

// Ruta GET
app.get('/get-data', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo' });
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

// Ruta POST
app.post('/update-data', (req, res) => {
    const newData = req.body;

    if (!Array.isArray(newData) || newData.length === 0) {
        console.log('Error: Se esperaba un array de objetos');
        return res.status(400).json({ error: 'Se esperaba un array de objetos' });
    }

    // Guardar el nuevo objeto en el archivo JSON
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).json({ error: 'Error al guardar los datos' });
        }
        res.status(201).json({ message: 'Datos guardados exitosamente' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo");
});