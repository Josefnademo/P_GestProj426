# Projet 426 - Site UNESCO

## Projet de:

- Romain Denis
- Mateo Thode
- Alban Segalen
- Antoine Fabre
- Antoine Piguet
- Charles-Henri Moser
- Yosef Nademo

## Chef de Projet

- [Bertrand Sahli](https://www.linkedin.com/in/bertrand-sahli-41b21161/)

# Installation

### Logiciel Requis

- [Docker-desktop](https://www.docker.com/)
- [NodeJs](https://www.nodejs.org)
- [Terminale de Commande](https://learn.microsoft.com/fr-fr/windows-server/administration/windows-commands/cmd)

## étape 1 Cloner le projet

Depuis un Terminal de Commande il faut cloner le repo du Projet <br>
avec cette Commande :

```sh
git clone https://github.com/ASETML/P_GestProj426
```

## étape 2 Configuration des `Variables d'environnement`

Pour que le Projet fonctionne il a besoin qu'on lui spécifie
quelques petites Variables.

- Copier le `config.mjs.example`, le renommer en config.mjs. puis remplir les information nécessaires dans le fichier config.mjs  
  `const db_name = "";`  
  `const db_user = "";`  
  `const db_password = "";`  
  `const db_host = "";`  
  `const app_port = ;`  
  `const db_port = ;`
- Le serveur et siteweb sera maintenant 100% opérationnel.

- Dans la racine du projet à : `\P_GestProj426`, ouvrir une console .bash Puis faires les commandes suivantes:

1.  `cd Docker/`
2.  `docker compose up -d`
3.  `cd ../backend/`
4.  `npm install`
5.  `npm start`<br>
6.  ouvrir un autre terminal de commande dans le dossier frontend
7.  `npm install`
8.  `npm run dev`
