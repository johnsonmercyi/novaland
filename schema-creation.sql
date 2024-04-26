-- Active: 1700342951005@@127.0.0.1@3306@novaland
CREATE DATABASE novaland;

USE novaland;

CREATE TABLE vaccine_appointments (
  id                    INTEGER PRIMARY KEY AUTO_INCREMENT,
  health_card_number    VARCHAR(255) UNIQUE NOT NULL,
  email                 VARCHAR(255) NOT NULL,
  address               VARCHAR(255) NOT NULL,
  vaccine_type          VARCHAR(255) NOT NULL,
  date_of_birth         DATE NOT NULL,
  vaccine_location      VARCHAR(255) NOT NULL,
  available_date        DATE NOT NULL,
  available_time        TIME NOT NULL
);

CREATE TABLE test_appointments (
  id                    INTEGER PRIMARY KEY AUTO_INCREMENT,
  health_card_number    VARCHAR(255) UNIQUE NOT NULL,
  email                 VARCHAR(255) NOT NULL,
  address               VARCHAR(255) NOT NULL,
  date_of_birth         DATE NOT NULL,
  test_location         VARCHAR(255) NOT NULL,
  available_date        DATE NOT NULL,
  available_time        TIME NOT NULL
);

-- DROP TABLE vaccine_appointments;
