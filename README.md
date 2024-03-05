# Développez une interface utilisateur pour une application web Python
### Auteur : Nicolas Sylvestre
### Contact : sylvestrenicolas@sfr.fr

## Présentation.
### Site web qui permet aux abonnés de visualiser en temps réel des films intéressants et inspirée de l'interface Netflix.

## Prérequis.
### Installez la dernière version de Python et Git, pour cela, cliquez sur les liens ci-dessous et suivre les indications selon le système d'exploitation utilisé.
### <https://fr.wikihow.com/installer-Python>

### <https://git-scm.com/book/fr/v2/D%C3%A9marrage-rapide-Installation-de-Git>


## Téléchargement des fichiers.
### Sous Windows, procédez à l'ouverture d'une invite de commande (Cmd ou PowerShell), puis saisir ou copier / coller les lignes de commande ci-dessous.
```sh
cd desktop   
   ```
```sh
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
   ``` 
```sh
git clone https://github.com/Nico13118/Projet6_V2.git
   ``` 
### Sous Mac / Linux, procédez, à l'ouverture du Terminal, puis saisir ou copier / coller les lignes de commande ci-dessous.
```sh
cd ~/Desktop   
   ```
```sh
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
   ``` 
```sh
git clone https://github.com/Nico13118/Projet6_V2.git
   ``` 

## Création d'un environnement virtuel dans le fichier OCMovies-API-EN-FR-master.
### Sous Windows, saisir les commandes ci-dessous (Cmd ou PowerShell).

```sh
cd desktop/OCMovies-API-EN-FR
   ``` 
```sh
python -m venv env
   ``` 

### Sous Mac / Linux, saisir les commandes ci-dessous (Terminal)

```sh
cd ~/Desktop/OCMovies-API-EN-FR   
   ```
```sh
python3 -m venv env
   ``` 

## Activez l'environnement virtuel

### Sous Windows, saisir la commande ci-dessous (Cmd ou PowerShell).

```sh
env\Scripts\activate
   ``` 

### Sous Mac / Linux, saisir la commande ci-dessous (Terminal)

```sh
source env/bin/activate
   ``` 

## Mise à jour du gestionnaire de packages et installation des dépendances.

### Sous Windows, saisir les commandes ci-dessous (Cmd ou PowerShell).

```sh
python.exe -m pip install --upgrade pip
   ``` 

```sh
pip install -r requirements.txt
   ``` 

### Sous Mac / Linux, saisir les commandes ci-dessous (Terminal)

```sh
python3 -m pip install --upgrade pip
   ``` 
```sh
pip install -r requirements.txt
   ``` 

## Créer et alimenter la base de données avec la commande ci-dessous.

### Sous Windows, saisir la commande ci-dessous (Cmd ou PowerShell).

```sh
python manage.py create_db
   ``` 

### Sous Mac / Linux, saisir la commande ci-dessous (Terminal)

```sh
python3 manage.py create_db
   ``` 

## Démarrer le serveur.

### Sous Windows, saisir la commande ci-dessous (Cmd ou PowerShell).

```sh
python manage.py runserver
   ``` 

### Sous Mac / Linux, saisir la commande ci-dessous (Terminal)

```sh
python3 manage.py runserver
   ``` 

## Ouverture de l'interface web.

### Procéder à l'ouverture des répertoires suivants : Desktop\Projet6_V2 -> frontend -> templates puis ouvrir le fichier index.html avec votre navigateur.

