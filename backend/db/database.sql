CREATE DATABASE heavens;
USE heavens;
CREATE TABLE Departamento (
    idDepartamento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreDepartamento VARCHAR(100) NOT NULL
);
CREATE TABLE Municipio (
    idMunicipio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    NombreMunicipio VARCHAR(100) NOT NULL,
    idDepartamento INT NOT NULL,
    FOREIGN KEY (idDepartamento) REFERENCES Departamento(idDepartamento)
);
CREATE TABLE Comuna (
    idComuna INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreComuna VARCHAR(100) NOT NULL,
    idMunicipio INT NOT NULL,
    FOREIGN KEY (idMunicipio) REFERENCES Municipio(idMunicipio)
);
CREATE TABLE Barrio (
    idBarrio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreBarrio VARCHAR(100) NOT NULL,
    idComuna INT NOT NULL,
    FOREIGN KEY (idComuna) REFERENCES Comuna(idComuna)
);
CREATE TABLE Creyente (
    idIdentificacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    NroCelular VARCHAR(20) NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    IdBarrio INT NOT NULL,
    FOREIGN KEY (IdBarrio) REFERENCES Barrio(idBarrio)
);
