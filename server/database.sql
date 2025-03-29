
-- This SQL script creates a database and a table for storing real-time signals.

CREATE DATABASE realtime_signals;

CREATE TABLE signals (
    id SERIAL PRIMARY KEY,          
    signal_id INT NOT NULL,         
    state VARCHAR(10) NOT NULL,     
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);