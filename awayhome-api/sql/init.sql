-- Initialize Database
CREATE DATABASE IF NOT EXISTS awayhome;
USE awayhome;

-- Drop tables if they exist to avoid duplicate entries
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS PetFlyers;
DROP TABLE IF EXISTS Animals;
DROP TABLE IF EXISTS Users;

-- Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Animals Table
CREATE TABLE IF NOT EXISTS Animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('dog', 'cat', 'small-furry', 'other') NOT NULL,
    breed VARCHAR(255),
    size ENUM('small', 'medium', 'large', 'extra-large'),
    gender ENUM('male', 'female', 'unknown'),
    age ENUM('baby', 'young', 'adult', 'senior'),
    color VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    status ENUM('lost', 'found'),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PetFlyers Table
CREATE TABLE IF NOT EXISTS PetFlyers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    animal_id INT NOT NULL,
    type ENUM('lost', 'found') NOT NULL,
    flyer_image VARCHAR(255),
    location VARCHAR(255),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    description TEXT,
    contact_name VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(255),
    contact_address JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (animal_id) REFERENCES Animals(id)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES Users(id),
    FOREIGN KEY (receiver_id) REFERENCES Users(id)
);

-- Example data insertion
INSERT INTO Users (username, email, password) VALUES ('Pet Lover', 'pets@example.com', 'password123');
INSERT INTO Users (username, email, password) VALUES ('Animal Rescuer', 'rescuer@example.com', 'password123');

INSERT INTO Animals (type, breed, size, gender, age, color, name, description, status) 
VALUES ('dog', 'Labrador', 'large', 'male', 'adult', 'black', 'Buddy', 'Friendly dog', 'lost');

INSERT INTO PetFlyers (user_id, animal_id, type, flyer_image, location, latitude, longitude, description, contact_name, contact_phone, contact_email, contact_address) 
VALUES (1, 1, 'lost', 'flyer.jpg', 'Central Park, New York, NY', 40.785091, -73.968285, 'Lost dog named Buddy', 'Pet Lover', '123-456-7890', 'pets@example.com', '{}');

INSERT INTO Messages (sender_id, receiver_id, message) VALUES (1, 2, 'I found your dog near the library.');
