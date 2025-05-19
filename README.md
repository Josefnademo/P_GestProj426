# Projet 426 - Site UNESCO

## Projet de:

- Alban Segalen
- Antoine Fabre
- Antoine Piguet
- Charles-Henri Moser
- Mateo Thode
- Romain Denis
- Yosef Nademo

## Chef de Projet

- [Bertrand Sahli](https://www.linkedin.com/in/bertrand-sahli-41b21161/)

# Installation

### Logiciel Requis

- [Docker Desktop](https://www.docker.com/)
- [Node.js](https://www.nodejs.org)
- [Invite de Commandes](https://learn.microsoft.com/fr-fr/windows-server/administration/windows-commands/cmd)

## Étape 1 Cloner le projet

Depuis une Invite de Commandes il faut cloner le repo du Projet <br>
Avec cette commande :

```sh
git clone https://github.com/ASETML/P_GestProj426
```

## Étape 2 Configuration des `Variables d'environnement`

Pour que le Projet fonctionne, il a besoin qu'on lui spécifie
quelques petites variables.

- Copier le `config.mjs.example`, le renommer en `config.mjs`, puis remplir les informations nécessaires dans <br>
  le fichier `config.mjs` (le fichier se trouve dans ce dossier `application/` `Backend/` `src/`)

```properties
  `const db_name = "";`
  `const db_user = "";`
  `const db_password = "";`
  `const db_host = "";`
  `const app_port = ;`
  `const db_port = ;`
```

Le serveur et le site web seront maintenant 100 % opérationnels.

## Étape 3 Création du container Docker qui contiendra la base de données

Dans la racine du projet à : `\P_GestProj426`, ouvrir une console `.bash` puis faire les commandes suivantes :

1. Se rendre dans le répertoire Docker

```sh
cd Docker/
```

2. Composer le container Docker

```sh
docker compose up -d
```

## Étape 4 Création de la base de données

Maintenant que le container est créé, il faut se connecter à MySQL et créer la base de données <br>
Avec ces commandes :

Donc en premier connectez-vous à MySQL en ouvrant une fenêtre de commande depuis le container Docker

```mysql
mysql -u nomdeUser -pMotDePasse
```

Ensuite créer la base de données avec le script qui est dans le dossier `DB/` `db_unesco.sql`<br>
Donc copier-coller le script dans la fenêtre de commande MySQL

Voilà, vous avez créé la base de données avec toutes les données dedans !

## Étape 5 Installation des dépendances du `Backend`

En premier il faut se rendre dans le répertoire `application/` `Backend`
Et dans celui-ci ouvrir une invite de commande.
Dans laquelle il faut entrer cette commande :

```sh
npm install
```

Et pour le `Frontend` il faut faire la même chose mais dans le dossier `application/` `Frontend`

## Étape 6 Lancement des deux serveurs

En premier on va lancer le serveur du `Backend`<br>
En allant dans le dossier `application/` `Backend/`,
Lancer une invite de commande et exécuter cette commande :

```sh
npm start
```

En deuxième on va lancer le serveur du `Frontend`<br>
En allant dans le dossier `application/` `Frontend/`,
Lancer une invite de commande et exécuter cette commande :

```sh
npm run dev
```

<h1>🎈🎆Bravo vous l'avez fait !!✨ </h1>

Maintenant pour admirer votre travail vous pouvez vous rendre sur ce [site](http://localhost:5173) !
