const nbPoney = 3;
// Le nombre de poney au départ
const nbEnergy = 1;
// Le nombre d'énergie que chaque poney gagne par tic
const ticTime = 1000;
// Temps en milliseconde entre chaque tic
const ticTimeDeadpool = 3000;
// Deadpool check la liste tout les X millisecondes
const ticTimeSpiderman = 3000;
// Same for spiderman
const nbTicDay = 5; // Le nombre de tic représentant le jour
const nbTicNight = 3; // Le nombre de tic représentant la nuit
let clock = 0; // Le nombre de tic qui s'est passé
const drainEnergyDeadpool = 2;
// Le nombre d'énergie que deadpool absorbe sur une licorne le jour
const poneyArray = [];
const listToTransform = [];
function Poney(id) {
  this.id = id;
  this.energy = 0;
  this.isUnicorn = false; // Au départ, on n'a pas de licorne.
  console.log('Le poney avec pour id: "' + this.id + '" a ete crée.');
  this.isAvailable = true;
  /* Pour éviter que cette créature
  soit utilisé par Spider-man et Deadpool en même temps
   */
}
const createAllPoney = (nbPoney, poneyArray) => {
  let i;
  for (i = 0; i < nbPoney; i++) {
    poneyArray.push(new Poney(i));
    // Rajoute un element dans le tableau à la fin de celui-ci
  }
};
createAllPoney(nbPoney, poneyArray);
Poney.prototype.viewEnergy = function () {
  if (this.isUnicorn === false) {
    console.log('Le poney avec pour id: "' + this.id +
      '" à ' + this.energy + ' energie.');
  } else {
    console.log('La licorne avec pour id: "' + this.id +
      '" à ' + this.energy + ' energie.');
  }
};
Poney.prototype.viewIsUnicorn = function () {
  if (this.isUnicorn) {
    console.log('La creature ayant pour id: "' +
      this.id + '" est une licorne.');
  } else {
    console.log('La créature ayant pour id: "' +
      this.id + '" est un poney.');
  }
};
function bouclefor(i) {
  for (i = 0; i < nbPoney; i++) {
    if (poneyArray[i].energy < 10) {
      poneyArray[i].energy += (nbEnergy * 2);
      if (poneyArray[i].energy >= 10 && poneyArray[i].isUnicorn === false) {
        /* Il faut ajouter ce poney à la liste d'attente
        pour se faire transformer par deadpool ! */
        console.log('Et un poney de plus à transformer !');
        listToTransform.push(poneyArray[i].id);
        // On rajoute le poney dans la liste
        console.log('Le poney ' + poneyArray[i].id +
        ' a ete ajoute a la liste.');
      } else {
        poneyArray[i].viewEnergy();
      }
    }
  }
  return i;
}
const addEnergy = () => {
  let i;
  clock += 1;
  console.log(clock + ' tic se sont déroulée.');
  if (clock <= nbTicDay) {
    console.log('Il fait encore jour !');
    for (i = 0; i < nbPoney; i++) {
      if (poneyArray[i].energy < 10) {
        poneyArray[i].energy += nbEnergy;
        if (poneyArray[i].energy >= 10 && poneyArray[i].isUnicorn === false) {
          /* Il faut ajouter ce poney à la liste d'attente
          pour se faire transformer par deadpool ! */
          console.log('Et un poney de plus à transformer !');
          listToTransform.push(poneyArray[i].id);
          // On rajoute le poney dans la liste
          console.log('Le poney ' + poneyArray[i].id +
            'a ete ajoute a la liste.');
        } else {
          poneyArray[i].viewEnergy();
        }
      }
    }
    /* CTRL ALT SHIFT T */
  } else if (clock > nbTicDay) {
    if (clock === (nbTicDay + nbTicNight + 1)) {
      clock = 0; // Si le jour est terminée alors on remet les pendules a zero
    } else {
      /* Si c'est la nuit alors */
      console.log('Il fait nuit !');
      i = bouclefor(i);
    }
  }
};
setInterval(addEnergy, ticTime);
// Lance la fonction addEnergy tout les ticTime en millisecondes
const chooseDeadpool = () => {
  if (listToTransform[0] === null) {
    console.log('La liste est vide, deadpool est triste !');
  } else {
    console.log('La liste a transformé est: ' + listToTransform);
    console.log(listToTransform[0]); // On recuperer l'id du premier element
    listToTransform[0].isAvailable = false; // La créature est maintenant
    // Occupé par Deadpool, Spider-man devra attendre !
    const random = Math.round(Math.random());
    console.log('Random =' + random);
    if (random === 0) {
      console.log('~~~~~ Réussite de la transformation ! ~~~~~');
      poneyArray[listToTransform[0]].isUnicorn = true;
      // On la transforme en licorne
    } else {
      console.log('Echec de la transformation !');
    }
    poneyArray[listToTransform[0]].energy = 0;
    poneyArray[listToTransform[0]].viewEnergy();
    // On check si l'énergie a bien été remise a zero
    poneyArray[listToTransform[0]].viewIsUnicorn();
    // On check si la transformation s'est bien déroulée
    listToTransform.shift();// On retire le premier élément de la liste
  }
};
setInterval(chooseDeadpool, ticTimeDeadpool);
// Deadpool va choisir un poney au hazard pour l'aider a se transformer
const regenDeadpool = () => {
  let hasHeFind = false;
  if (clock <= nbTicDay) {
    let i;
    for (i = 0; i < nbPoney; i++) {
      if (poneyArray[i].isUnicorn) {
        if (poneyArray[i].energy >= 2) {
          hasHeFind = true;
          poneyArray[i].isAvailable = false;
          poneyArray[i].energy -= drainEnergyDeadpool;
          poneyArray[i].isUnicorn = false;
          console.log('Deadpool s\'est régénérer sur la licorne ' + i +
            ' donc étant donné qu\'est plus pure elle redevient un poney');
          poneyArray[i].isAvailable = true;
        } else {
          console.log('Il y a une licorne mais elle n\'a pas ' +
            'assez d\'energie pour deadpool');
        }
      }
    }
  } else if (clock > nbTicDay) {
    let i;
    for (i = 0; i < nbPoney; i++) {
      if (poneyArray[i].isUnicorn) {
        if (poneyArray[i].energy >= 4) {
          hasHeFind = true;
          poneyArray[i].isAvailable = false;
          poneyArray[i].energy -= drainEnergyDeadpool * 2;
          poneyArray[i].isUnicorn = false;
          console.log('Deadpool s\'est régénérer sur la licorne ' + i +
            ' donc étant donné qu\'est plus pure elle redevient un poney');
          poneyArray[i].isAvailable = true;
        } else {
          console.log('Il y a une licorne mais ' +
            'elle n\'a pas assez d\'energie pour deadpool');
        }
      }
    }
  }
  if (hasHeFind === false) {
    console.log(clock + ' - Deadpool n\'a pas trouvé de' +
      ' licorne sur lesquels se regenerer');
  }
};
setTimeout(() => {
  setInterval(regenDeadpool, ticTimeDeadpool);
}, 1000);
const chooseSpiderman = () => {
  const randomSpiderman = Math.round(Math.random() * (nbPoney - 1));

  if (poneyArray[randomSpiderman].isUnicorn) {
    console.log('++++++++++++ SPIDER MAN a choisi la licorne ' +
      randomSpiderman + '.');
    poneyArray[randomSpiderman].isUnicorn = false;
    poneyArray[randomSpiderman].energy -= 5;
    if (poneyArray[randomSpiderman].energy < 0) {
      poneyArray[randomSpiderman].energy = 0;
    }
  } else {
    console.log('++++++++++++ SPIDER MAN a choisi le poney ' +
      randomSpiderman + '.');
    poneyArray[randomSpiderman].energy -= 5;
    if (poneyArray[randomSpiderman].energy < 0) {
      poneyArray[randomSpiderman].energy = 0;
    }
  }
};
setTimeout(() => {
  setInterval(chooseSpiderman, ticTimeSpiderman);
}, 2000);
