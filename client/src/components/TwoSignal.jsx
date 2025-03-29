import React from "react";

const TwoSignal = ({ id, state }) => {
  const getLightClass = (lightState) => {
    return state === lightState
      ? "opacity-100 ring-4 ring-offset-2 ring-white"
      : "opacity-30";
  };

  return (
    <div className="traffic-signal w-24 h-72 bg-gradient-to-b from-gray-800 to-gray-900 rounded-full flex flex-col justify-around items-center p-6 shadow-2xl">
      <div
        className={`w-14 h-14 rounded-full bg-red-600 ${getLightClass(
          "Red"
        )} transition-all`}
      ></div>

      <div
        className={`w-14 h-14 rounded-full bg-green-600 ${getLightClass(
          "Green"
        )} transition-all`}
      ></div>
    </div>
  );
};
export default TwoSignal;