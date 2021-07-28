let numCards;

do{
    numCards = prompt("Com quantas cartas você gostaria de jogar?");
} while(numCards % 2 !== 0 || numCards < 4 || numCards > 14);

startGame();

function startGame(){
    const cardBackOptionsArray = initializeCardBackOptions();
    shuffleDeck(cardBackOptionsArray);
}

function initializeCardBackOptions(){
    return cardBackOptionsArray = ["bobrossparrot.gif", "explodyparrot.gif", "fiestaparrot.gif", "metalparrot.gif", "revertitparrot.gif", "tripletsparrot.gif", "unicornparrot.gif"];
}
function shuffleDeck(cardBackOptionsArray){
    const deck = document.querySelector(".deck");
    const card = document.createElement("li");
    let cardBack;

    let cardArray = createCard(card, cardBackOptionsArray);
    cardArray.sort(randomCards);

    for(let i = 0; i < numCards; i++){
        card.classList.add("card__number" + i);
        deck.appendChild(card.cloneNode(true));
        cardBack = document.querySelector(".card__number" + i + " > .card__back");
        cardBack.setAttribute("src", "assets/" + cardArray[i]);
        card.classList.remove("card__number" + i);
    }
}

function createCard(card, cardBackOptionsArray){
    const cardFront = document.createElement("img");
    const cardBack = document.createElement("img");

    card.classList.add("deck__card");
    cardFront.setAttribute("src", "assets/front.png");
    cardFront.classList.add("card__img");
    cardBack.classList.add("card__img");
    cardBack.classList.add("card__back");
    cardBack.classList.add("hidden");
    card.appendChild(cardFront);
    card.appendChild(cardBack);
    return randomCardBackImage(cardBackOptionsArray);
}

function randomCardBackImage(cardBackOptionsArray){
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

//support functions
function randomNumber(min, max){
    return parseInt(Math.random() * (max - min) + min);
}

function randomCards(){
    return Math.random() - 0.5;
}