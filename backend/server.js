const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Smart Plant Care Backend is running!",
  });
});


// Get latest sensor data
app.get("/api/sensors/latest", async (req, res) => {
  try {
    const snapshot = await db
      .collection("sensorData")
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.json({
        message: "No sensor data available",
      });
    }

    const data = snapshot.docs[0].data();

    res.json(data);
  } catch (error) {
    console.error("Error getting sensor data:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get sensor data",
    });
  }
});


// Receive sensor data and save to Firestore
app.post("/api/sensors/data", async (req, res) => {
  try {
    const sensorData = req.body;

    console.log("Received sensor data:");
    console.log(sensorData);

    const docRef = await db.collection("sensorData").add({
      deviceId: sensorData.deviceId,
      soilMoisture: sensorData.soilMoisture,
      temperature: sensorData.temperature,
      humidity: sensorData.humidity,
      timestamp: admin.firestore.Timestamp.fromDate(
        new Date(sensorData.timestamp)
      ),
    });

    console.log("Saved to Firestore:", docRef.id);

    res.json({
      success: true,
      message: "Sensor data saved to Firestore",
      id: docRef.id,
    });

  } catch (error) {
    console.error("Firestore error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to save sensor data",
    });
  }
});


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});