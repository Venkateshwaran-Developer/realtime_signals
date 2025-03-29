import { connect } from "mqtt";
import dbClient from "./config/ConnectDatabase.js";

const mqttClient = connect("mqtt://localhost");

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");

  let toggle = true;

  setInterval(() => {
    const signals = toggle
      ? [
          {
            id: 1,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)],
          },
          {
            id: 2,
            state: ["Red", "Green"][Math.floor(Math.random() * 2)],
          },
        ]
      : [
          {
            id: 1,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
          },
          {
            id: 2,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
          },
          {
            id: 3,
            state: ["Red", "Yellow", "Green"][Math.floor(Math.random() * 3)],
          },
        ];

    const topic = toggle ? "/signals/two" : "/signals/three";
    mqttClient.publish(topic, JSON.stringify(signals));
    console.log(`Published to ${topic}:`, signals);

    signals.forEach((signal) => {
      const query =
        "INSERT INTO signals (signal_id, state, timestamp) VALUES ($1, $2, NOW())";
      const values = [signal.id, signal.state];

      dbClient
        .query(query, values)
        .then(() => console.log("Signals stored in Database:", signal))
        .catch((err) => console.error("Failed to store signal data:", err));
    });

    toggle = !toggle;
  }, 3000);
});
