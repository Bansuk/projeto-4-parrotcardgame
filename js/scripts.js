let numJogadas = 0;
let fstCard;

startGame();

function startGame(){
    let numCards;

    do{
        numCards = prompt("Com quantas cartas você gostaria de jogar?");
    } while(numCards % 2 !== 0 || numCards < 4 || numCards > 14);

    const cardBackOptionsArray = initializeCardBackOptions();
    shuffleDeck(cardBackOptionsArray, numCards);
}

function initializeCardBackOptions(){
    return cardBackOptionsArray = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
}
function shuffleDeck(cardBackOptionsArray, numCards){
    const deck = document.querySelector(".deck");
    const card = document.createElement("li");
    let cardBack;

    let cardArray = createCard(card, cardBackOptionsArray, numCards);
    cardArray.sort(randomCards);

    for(let i = 0; i < numCards; i++){
        card.classList.add("card__number" + i);
        deck.appendChild(card.cloneNode(true));
        cardBack = document.querySelector(".card__number" + i + " > .card__back");
        cardBack.setAttribute("src", "assets/" + cardArray[i]);
        card.classList.remove("card__number" + i);
    }
}

function createCard(card, cardBackOptionsArray, numCards){
    const cardFront = document.createElement("img");
    const cardBack = document.createElement("img");

    card.classList.add("deck__card");
    card.setAttribute("onclick", "selectedCard(this);")
    cardFront.setAttribute("src", "assets/front.png");
    cardFront.classList.add("card__img");
    cardFront.classList.add("card__front");
    cardBack.classList.add("card__img");
    cardBack.classList.add("card__back");
    cardBack.classList.add("hidden");
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    return randomCardBackImage(cardBackOptionsArray, numCards);
}

function randomCardBackImage(cardBackOptionsArray, numCards){
    const numImages = numCards/2;
    const imagesArray = [];
    let numOptions;
    let contador = 0;
    let img;
    let i = 0;
    let j = 1;

    while(contador < numImages){
        numOptions = cardBackOptionsArray.length;
        img = randomNumber(0, numOptions);
        imagesArray[i] = cardBackOptionsArray[img];
        imagesArray[j] = cardBackOptionsArray[img];
        i += 2;
        j += 2;
        contador++;
        cardBackOptionsArray.splice(img, 1);
    }
    
    return imagesArray;
}

function selectedCard(card){
    const listFrontCards = document.querySelectorAll(".card__front");
    card.children.item(0).classList.add("hidden");
    card.children.item(1).classList.remove("hidden");
    numJogadas++;
    if(numJogadas % 2 === 0){
        if(fstCard.children.item(1).getAttribute("src") !== card.children.item(1).getAttribute("src")){
            setTimeout(function (){
                fstCard.children.item(1).classList.add("hidden");
                fstCard.children.item(0).classList.remove("hidden");
                card.children.item(1).classList.add("hidden");
                card.children.item(0).classList.remove("hidden");
            }, 1000);
        } else{
            let i = 0;
            while(listFrontCards[i].classList.contains("hidden") && i < listFrontCards.length - 1){
                i++;
            }

            if(i === listFrontCards.length - 1){
                endGame();
            }
        }
    } else{
        fstCard = card;
    }
}

function endGame(){
    setTimeout(function () {alert("Você ganhou em " + numJogadas + " jogadas!")}, 1500);
    setTimeout(function () {if(prompt("Gostaria de jogar novamente?") === "Sim"){
        resetGame();
    }}, 2000);
}

function resetGame(){
    const listCards = document.querySelector("ul");

    while (listCards.firstChild) {
        listCards.removeChild(listCards.firstChild);
      }

      numJogadas = 0;
      startGame();
}

//support functions
function randomNumber(min, max){
    return parseInt(Math.random() * (max - min) + min);
}

function randomCards(){
    return Math.random() - 0.5;
}