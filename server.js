const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Smart Plant Care Backend is running!"
    });
});

// Sensor data test route
app.get("/api/sensors/latest", (req, res) => {
    res.json({
        deviceId: "PLANT-001",
        soilMoisture: 45,
        temperature: 28,
        humidity: 65,
        timestamp: new Date().toISOString()
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});