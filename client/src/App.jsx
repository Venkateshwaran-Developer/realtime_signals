import React, { useState, useEffect } from "react";
import TwoSignal from "./components/TwoSignal";
import ThreeSignal from "./components/ThreeSignal";

const App = () => {
  const [twoSignals, setTwoSignals] = useState([]);
  const [threeSignals, setThreeSignals] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.topic === "/signals/two") {
        setTwoSignals(message.signals);
      } else if (message.topic === "/signals/three") {
        setThreeSignals(message.signals);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
    };

    return () => ws.close();
  }, []);

  return (
    <div className="flex  justify-evenly justify-items-center w-full min-h-screen bg-gray-100 p-10">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Two Signal Cards
        </h1>

        {twoSignals.length > 0 && (
          <div className="signal-container flex flex-col lg:flex-row gap-6 justify-center">
            {twoSignals.map((signal) => (
              <TwoSignal
                key={signal.id}
                id={signal.id}
                state={signal.state}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Three Signal Cards
        </h1>

        {threeSignals.length > 0 && (
          <div className="signal-container flex flex-col lg:flex-row gap-6 justify-center ">
            {threeSignals.map((signal) => (
              <ThreeSignal
                key={signal.id}
                id={signal.id}
                state={signal.state}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {twoSignals.length === 0 && threeSignals.length === 0 && (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default App;
