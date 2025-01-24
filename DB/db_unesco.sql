CREATE DATABASE IF NOT EXISTS db_unesco;

USE db_unesco;

-- Table: Lieu
CREATE TABLE Lieu (
   id_lieu INT AUTO_INCREMENT,
   particulartie VARCHAR(500),
   nom VARCHAR(250) NOT NULL,
   longitude DECIMAL(18,15) NOT NULL, --Float avec max 3 chiffres avant la virgule et 15 chiffres après
   pays VARCHAR(100) NOT NULL,
   latitude DECIMAL(18,15) NOT NULL,  --Float avec max 3 chiffres avant la virgule et 15 chiffres après
   region VARCHAR(150),
   description VARCHAR(1500) NOT NULL,
   histoire VARCHAR(500),
   PRIMARY KEY (id_lieu)
);

-- Table: Compte
CREATE TABLE Compte (
   id_compte INT AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
   pays_origine VARCHAR(50),
   site_veut_visiter VARCHAR(50),
   site_visites VARCHAR(50),
   PRIMARY KEY (id_compte)
);

-- Table: Avis
CREATE TABLE Avis (
   id_avis INT AUTO_INCREMENT,
   rating INT,
   description VARCHAR(500),
   id_compte INT NOT NULL,
   PRIMARY KEY (id_avis),
   FOREIGN KEY (id_compte) REFERENCES Compte(id_compte)
);

-- Table: correspond_a_
CREATE TABLE correspond_a_ (
   id_avis INT,
   id_lieu INT,
   PRIMARY KEY (id_avis, id_lieu),
   FOREIGN KEY (id_avis) REFERENCES Avis(id_avis),
   FOREIGN KEY (id_lieu) REFERENCES Lieu(id_lieu)
);

-- Table: visiter
CREATE TABLE visiter (
   id_lieu INT,
   id_compte INT,
   date_visite DATE,
   PRIMARY KEY (id_lieu, id_compte),
   FOREIGN KEY (id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY (id_compte) REFERENCES Compte(id_compte)
);

-- Table: aimerait_visiter
CREATE TABLE aimerait_visiter (
   id_lieu INT,
   id_compte INT,
   PRIMARY KEY (id_lieu, id_compte),
   FOREIGN KEY (id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY (id_compte) REFERENCES Compte(id_compte)
);