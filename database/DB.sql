CREATE DATABASE ATLAS_EN_ACCION;

USE ATLAS_EN_ACCION;


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
    Accepted TINYINT(1) DEFAULT 0,
    PRIMARY KEY(ApplicantIdentification)
);

/*CREATE TABLE MentesInfo
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
    Accepted TINYINT(1) DEFAULT 0,
    PRIMARY KEY(ApplicantIdentification)

); */

/* Relación entre tabla de PerfilInfo y Users */
CREATE TABLE ProfileInfo
(
    Name VARCHAR(255),
    Identification VARCHAR(255),
    Phone VARCHAR(255),
    Email VARCHAR(255),
    Age VARCHAR(255),
    PRIMARY KEY(Identification)
);

CREATE TABLE Users
(
    Username VARCHAR(255),
    Password VARCHAR(255),
    PRIMARY KEY(Username),
    CONSTRAINT Username FOREIGN KEY (Username) REFERENCES ProfileInfo(Identification)
);

CREATE TABLE RolAdmin
(
    Adminame VARCHAR(255),
    PRIMARY KEY(Adminame),
    CONSTRAINT Adminame FOREIGN KEY (Adminame) REFERENCES Users(Username)
);

CREATE TABLE RolColab
(
    Colabname VARCHAR(255),
    PRIMARY KEY(Colabname),
    CONSTRAINT Colabname FOREIGN KEY (Colabname) REFERENCES Users(Username)
);