const deviceId = "PLANT-001";

let soilMoisture = 55;
let temperature = 28;
let humidity = 65;

async function generateSensorData() {
  soilMoisture -= Math.random() * 2;
  temperature += (Math.random() - 0.5) * 1;
  humidity += (Math.random() - 0.5) * 2;

  soilMoisture = Math.max(0, Math.min(100, soilMoisture));
  temperature = Math.max(15, Math.min(40, temperature));
  humidity = Math.max(20, Math.min(90, humidity));

  const sensorData = {
    deviceId,
    soilMoisture: Number(soilMoisture.toFixed(2)),
    temperature: Number(temperature.toFixed(2)),
    humidity: Number(humidity.toFixed(2)),
    timestamp: new Date().toISOString()
  };

  console.log("Sending sensor data:");
  console.log(sensorData);

  try {
    const response = await fetch(
      "http://localhost:5000/api/sensors/data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sensorData)
      }
    );

    const result = await response.json();

    console.log("Backend response:");
    console.log(result);
    console.log("----------------------");

  } catch (error) {
    console.log("Error sending data:", error.message);
  }
}

generateSensorData();

setInterval(generateSensorData, 5000);