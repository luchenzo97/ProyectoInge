CREATE DATABASE ATLAS_EN_ACCIONBASE;

USE ATLAS_EN_ACCIONBASE;


CREATE TABLE Applicants
(
    ApplicantName VARCHAR(255),
    ApplicantIdentification VARCHAR(255),
    ApplicantPhone VARCHAR(255),
    ApplicantEmail VARCHAR(255),
    ApplicantBirthDate VARCHAR(16),
    ApplicantAge VARCHAR(50),
    ApplicantProvince VARCHAR(50),
    ApplicantCanton VARCHAR(50),
    ApplicantDistrict VARCHAR(50),
    ApplicantOcupation VARCHAR(50),
    ApplicantOcupationPlace VARCHAR(50),
    ApplicantEnglishLevel VARCHAR(50),
    ApplicantDevices VARCHAR(50),
    ApplicantConnection VARCHAR(50),
    ApplicantAvailability VARCHAR(50),
    ApplicantAbout TEXT,
    ApplicantAspiration TEXT,
    ApplicantHobbies TEXT,
    ApplicantDescription TEXT,
    ApplicantExpectation TEXT,
    ApplicantImpact TEXT,
    ApplicantWomenInSTEM TEXT,
    ApplicantCondition VARCHAR(5),
    ApplicantConditionName VARCHAR(50),
    ApplicantConditionAssistance VARCHAR(50),
    ApplicantMediaImpact VARCHAR(50),
    ApplicantTry VARCHAR(5),
    ApplicantEmpleateCondition VARCHAR(50),
    ApplicantEmpleateConditionName VARCHAR(25),
    ApplicantEconomicStatus VARCHAR(100),
    ApplicantTshirt VARCHAR(3),
    ApplicantPermision VARCHAR(3),
    ApplicantParentName VARCHAR(255),
    ApplicantParentPhone VARCHAR(255),
    ApplicantParentEmail VARCHAR(255),
    ApplicantComments TEXT,
    PRIMARY KEY(ApplicantIdentification)
);

CREATE TABLE MentesInfo
(
    ApplicantName VARCHAR(255),
    ApplicantIdentification VARCHAR(255),
    ApplicantPhone VARCHAR(255),
    ApplicantEmail VARCHAR(255),
    ApplicantBirthDate VARCHAR(16),
    ApplicantAge VARCHAR(50),
    ApplicantProvince VARCHAR(50),
    ApplicantCanton VARCHAR(50),
    ApplicantDistrict VARCHAR(50),
    ApplicantOcupation VARCHAR(50),
    ApplicantOcupationPlace VARCHAR(50),
    ApplicantEnglishLevel VARCHAR(50),
    ApplicantDevices VARCHAR(50),
    ApplicantConnection VARCHAR(50),
    ApplicantAvailability VARCHAR(50),
    ApplicantAbout TEXT,
    ApplicantAspiration TEXT,
    ApplicantHobbies TEXT,
    ApplicantDescription TEXT,
    ApplicantExpectation TEXT,
    ApplicantImpact TEXT,
    ApplicantWomenInSTEM TEXT,
    ApplicantCondition VARCHAR(5),
    ApplicantConditionName VARCHAR(50),
    ApplicantConditionAssistance VARCHAR(50),
    ApplicantMediaImpact VARCHAR(50),
    ApplicantTry VARCHAR(5),
    ApplicantEmpleateCondition VARCHAR(50),
    ApplicantEmpleateConditionName VARCHAR(25),
    ApplicantEconomicStatus VARCHAR(100),
    ApplicantTshirt VARCHAR(3),
    ApplicantPermision VARCHAR(3),
    ApplicantParentName VARCHAR(255),
    ApplicantParentPhone VARCHAR(255),
    ApplicantParentEmail VARCHAR(255),
    ApplicantComments TEXT,
    PRIMARY KEY(ApplicantIdentification)

);

CREATE TABLE UsersMentes
(
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (username),
    CONSTRAINT ApplicantIdentification FOREIGN KEY (username) REFERENCES MentesInfo(ApplicantIdentification)
);

CREATE TABLE UsersColab
(
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    IsColab TINYINT(1) DEFAULT 1,
    PRIMARY KEY (username)
);

CREATE TABLE RegistroGraduadas
(
    GraduatedName VARCHAR(255),
    GraduatedIdentification VARCHAR(255),
    GraduatedPhone VARCHAR(255),
    GraduatedEmail VARCHAR(255),
    RegisteredPassword VARCHAR(255),
    PRIMARY KEY(GraduatedIdentification)
);