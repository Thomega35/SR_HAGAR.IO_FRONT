# Rapport d'implémentation du Jeu Distribué - Thomas Delapart

## Introduction

Avant de nous plonger dans le code, nous avons cherché quel jeu nous pourrions réaliser. Nous avons choisi de garder les fonctionnalités de déplacement comme dans l'exemple de base, ce qui nous a fait assez converger vers notre jeu final : `Hagar.io`.

Le projet Hagar.io est un jeu multijoueur en temps réel, où le but est d'occuper la première place du classement en augmentant son score le plus possible sans mourir. Ce rapport détaille la conception et l'implémentation du front-end du jeu.

## Aperçu de la conception

### Stack Technologique

Nous sommes parti sur une base [t3.create](https://create.t3.gg/) pour avoir une base pour le développement de notre projet avec les technologies suivantes :

`Next.js`, la backend de vercel, très bien integré à React. Cela nous permet de bénéficier des avantages du rendu côté serveur tout en conservant la réactivité du rendu côté client. Sa compatibilité avec Vercel nous permet également de déployer rapidement et efficacement le projet.

Le projet utilise donc aussi `React` pour son polyglottisme et sa facilité d'utilisation, qui permet certaines facilités pour le développement du jeu notamment pour la gestion des événements et des états.

Nous avons également utilisé `Tailwind CSS` pour la conception de l'interface utilisateur afin de garantir une expérience de jeu fluide et réactive.

Le projet est écrit en `Typescript` pour garantir la robustesse du code et faciliter la maintenance.

Afin de communiquer avec le serveur, nous avons utilisé `Socket.io` qui nous évite de faire des requêtes HTTP pour récupérer les informations.

Afin de garantir la qualité du code, nous avons mis en place une série de tests d'intégration à chaque commit pour s'assurer du bon fonctionnement de la non-régression du projet grâce à l'outil `Playwright`.

### Architecture

Notre projet est basé sur une architecture distribuée un peu spéciale, car la totalité des calculs du jeu sont effectués côté client pour une expérience de jeu fluide et réactive. 

Le serveur ne sert que pour la communication entre les joueurs et la mise à jour des scores. Toutefois, celui-ci est capable de gérer les cas de triches et les mises à jour des scores en cas de déconnexion du joueur.

## Communication avec le serveur

Dans notre communication avec le serveur, on commence par se connecter au serveur avec `SetSocket`, puis on emet un message `this.socket?.emit("newPlayer", ...);` afin de signaler au serveur qu'un nouveau joueur est arrivé.

Puis à chaque tick, on envoie au serveur la position du joueur avec `this.socket?.emit("move", ...);`. On récupère également les informations des autres joueurs avec `this.socket?.on("players", ...);` et les informations des boules de nourriture avec `this.socket?.on("food", ...);`.

## Les tests

Les tests effectués avec `Playwright` sont les suivants :

- Test de Chargement de la page
- Verification de la fonctionnalité de changement de nom
- Verification des fonctionalités du menu
- Verification de la fonctionnalité de déplacement
- Test de charge pour 10 et 20 joueurs connectés


## Conclusion

Le frontend de Hagar.io est le résultat d'une réflexion approfondie sur la conception d'un jeu distribué, efficace et réactif. Malgré les défis rencontrés, nous sommes fiers du résultat obtenu et sommes convaincus des possibilités d'amélioration future.
