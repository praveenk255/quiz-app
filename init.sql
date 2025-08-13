CREATE DATABASE IF NOT EXISTS quiz_app;
USE quiz_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    quiz_name VARCHAR(255) DEFAULT NULL,
    sheet_url TEXT DEFAULT NULL,
    date_taken DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attempted INT DEFAULT 0,
    correct INT DEFAULT 0,
    incorrect INT DEFAULT 0,
    mistakes_json LONGTEXT DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX(user_id),
    INDEX(date_taken)
);
