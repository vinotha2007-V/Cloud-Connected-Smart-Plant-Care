import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

function Dashboard() {
  const [pumpOn, setPumpOn] = useState(false);
  const [autoWatering, setAutoWatering] = useState(true);

  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest sensor data from Firestore
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const sensorQuery = query(
          collection(db, "sensorData"),
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const snapshot = await getDocs(sensorQuery);

        if (!snapshot.empty) {
          setSensorData(snapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  const soilMoisture = sensorData?.soilMoisture ?? 0;
  const temperature = sensorData?.temperature ?? 0;
  const humidity = sensorData?.humidity ?? 0;

  const handleWater = () => {
    setPumpOn(true);

    setTimeout(() => {
      setPumpOn(false);
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: "#f4f8f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🌱 Smart Plant Care Dashboard</h1>

      <p>Cloud-Connected Smart Plant Care & Watering System</p>

      <hr />

      {loading && <p>Loading sensor data...</p>}

      {/* Plant Status */}
      <div
        style={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <h2>🌿 Plant Status</h2>

        <p>
          Status:{" "}
          <strong>
            {soilMoisture < 30 ? "Needs Water 💧" : "Healthy 🌱"}
          </strong>
        </p>

        <p>Device ID: {sensorData?.deviceId || "PLANT-001"}</p>
      </div>

      {/* Sensor Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {/* Soil Moisture */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <h2>💧 Soil Moisture</h2>
          <h1>{soilMoisture}%</h1>
          <p>Current soil moisture level</p>
        </div>

        {/* Temperature */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <h2>🌡️ Temperature</h2>
          <h1>{temperature}°C</h1>
          <p>Current temperature</p>
        </div>

        {/* Humidity */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <h2>💦 Humidity</h2>
          <h1>{humidity}%</h1>
          <p>Current humidity</p>
        </div>

        {/* Water Pump */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
          }}
        >
          <h2>🚰 Water Pump</h2>

          <h1>{pumpOn ? "ON 🟢" : "OFF 🔴"}</h1>

          <button onClick={handleWater}>
            💦 Water Plant
          </button>
        </div>
      </div>

      <br />

      {/* Automatic Watering */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <h2>🤖 Automatic Watering</h2>

        <p>
          Automatic watering is currently{" "}
          <strong>
            {autoWatering ? "ON 🟢" : "OFF 🔴"}
          </strong>
        </p>

        <button onClick={() => setAutoWatering(!autoWatering)}>
          {autoWatering
            ? "Turn OFF Auto Watering"
            : "Turn ON Auto Watering"}
        </button>
      </div>

      <br />

      {/* System Information */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "12px",
        }}
      >
        <h2>☁️ System Information</h2>

        <p>Connection: Online 🟢</p>
        <p>Cloud Database: Firebase Firestore</p>
        <p>Authentication: Firebase Authentication</p>
        <p>Device: {sensorData?.deviceId || "PLANT-001"}</p>

        {sensorData?.timestamp && (
          <p>
            Last Updated:{" "}
            {sensorData.timestamp?.toDate
              ? sensorData.timestamp.toDate().toLocaleString()
              : "Available"}
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;