CREATE TABLE Lieu(
   id_lieu INT AUTO_INCREMENT,
   particulartie VARCHAR(500),
   nom VARCHAR(250) NOT NULL,
   longitude DECIMAL(18,15) NOT NULL, -- float avec 15 chiffres après la virgule et 3 avant max
   latitude DECIMAL(18,15) NOT NULL, -- float avec 15 chiffres après la virgule et 3 avant max
   region VARCHAR(150),
   description VARCHAR(1500) NOT NULL,
   histoire VARCHAR(500),
   PRIMARY KEY(id_lieu)
);

CREATE TABLE Compte(
   id_compte INT AUTO_INCREMENT,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(50),
   email VARCHAR(50),
   site_veut_visiter VARCHAR(50),
   site_visites VARCHAR(50),
   PRIMARY KEY(id_compte)
);

CREATE TABLE Pays(
   id_pays INT AUTO_INCREMENT,
   nom VARCHAR(50),
   id_lieu INT NOT NULL,
   id_compte INT NOT NULL,
   PRIMARY KEY(id_pays),
   FOREIGN KEY(id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY(id_compte) REFERENCES Compte(id_compte)
);

CREATE TABLE Avis(
   id_avis INT AUTO_INCREMENT,
   rating INT,
   description VARCHAR(500),
   id_compte INT NOT NULL,
   PRIMARY KEY(id_avis),
   FOREIGN KEY(id_compte) REFERENCES Compte(id_compte)
);

CREATE TABLE correspond_a_(
   id_avis INT,
   id_lieu INT,
   PRIMARY KEY(id_avis, id_lieu),
   FOREIGN KEY(id_avis) REFERENCES Avis(id_avis),
   FOREIGN KEY(id_lieu) REFERENCES Lieu(id_lieu)
);

CREATE TABLE visiter(
   id_lieu INT,
   id_compte INT,
   date_visite DATE,
   PRIMARY KEY(id_lieu, id_compte),
   FOREIGN KEY(id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY(id_compte) REFERENCES Compte(id_compte)
);

CREATE TABLE aimerait_visiter(
   id_lieu INT,
   id_compte INT,
   PRIMARY KEY(id_lieu, id_compte),
   FOREIGN KEY(id_lieu) REFERENCES Lieu(id_lieu),
   FOREIGN KEY(id_compte) REFERENCES Compte(id_compte)
);