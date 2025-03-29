# realtime_signals
This project is about updating realtime signals using react as frontend and node.js, mqtt broker and websocket as server side and postgresql as database.
To Run this Project in your Desktop follow the steps mentioned below

# Frontend
open the client folder and run npm install 
Start Command : npm run dev

# Server
open the server folder and run npm install

Download and install mqtt on your system https://mosquitto.org/

Create a Database name called realtime_signals and create a table called signal ( the sql commands in server folder named database.sql )
Update your pgAdmin user credentials in .env file to connect the PostgreSql Database 

Start Command : node mqttBroker.js and node websocket.js ( run this commands seperatly on seperate terminal )

