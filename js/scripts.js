let numPlays = 0;
let previousCardFrontImage;
let previousCardBackImage;
let timeElapsed = 0;
let stopTimerd;

startGame();

function startGame(){
    let numCards;

    do{
        numCards = prompt("Com quantas cartas você gostaria de jogar?");
    } while(numCards % 2 !== 0 || numCards < 4 || numCards > 14);

    const cardBackOptionsArray = initializeCardBackOptions();
    shuffleDeck(cardBackOptionsArray, numCards);
    stopTimerId = setInterval(runTimer, 1000);
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
        cardBack = document.querySelector(".card__number" + i + " > .card__back > img");
        cardBack.setAttribute("src", "assets/" + cardArray[i]);
        card.classList.remove("card__number" + i);
    }
}

function createCard(card, cardBackOptionsArray, numCards){
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    const cardFrontImage = document.createElement("img");
    const cardBackImage = document.createElement("img");

    card.classList.add("deck__card");
    card.setAttribute("onclick", "selectedCard(this);")
    
    cardFront.classList.add("card__front", "card__face");

    cardFrontImage.setAttribute("src", "assets/front.png");
    cardFrontImage.classList.add("card__img");

    cardBack.classList.add("card__back", "card__face");
    cardBack.classList.add("hidden");

    cardBackImage.classList.add("card__img");

    card.appendChild(cardFront);
    card.appendChild(cardBack);
    cardFront.appendChild(cardFrontImage);
    cardBack.appendChild(cardBackImage);

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
    const cardFrontImage = card.children.item(0);
    const cardBackImage = card.children.item(1);
    
    cardFrontImage.classList.add("hidden");
    cardBackImage.classList.remove("hidden");
    numPlays++;

    if(numPlays % 2 === 0){
        if(previousCardBackImage.firstChild.getAttribute("src") !== cardBackImage.firstChild.getAttribute("src")){
            setTimeout(function (){
                previousCardBackImage.classList.add("hidden");
                previousCardFrontImage.classList.remove("hidden");
                cardBackImage.classList.add("hidden");
                cardFrontImage.classList.remove("hidden");
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
        previousCardFrontImage = cardFrontImage;
        previousCardBackImage = cardBackImage;
    }
}

function endGame(){
    stopTimer();
    setTimeout(function () {alert(`Você ganhou em ${numPlays} jogadas e em ${timeElapsed} segundos!`)}, 1500);
    setTimeout(function () {if(prompt("Gostaria de jogar novamente?") === "Sim"){
        resetGame();
    }}, 2000);
}

function resetGame(){
    const listCards = document.querySelector("ul");

    while (listCards.firstChild) {
        listCards.removeChild(listCards.firstChild);
      }

      numPlays = 0;
      timeElapsed = 0;
      stopTimerkId = 0;
      startGame();
}

function runTimer(){
    const seconds = document.querySelector(".header__timer-seconds");
    
    timeElapsed++;
    seconds.innerHTML = timeElapsed;
}

function stopTimer(){
    clearInterval(stopTimerId);
}

//support functions
function randomNumber(min, max){
    return parseInt(Math.random() * (max - min) + min);
}

function randomCards(){
    return Math.random() - 0.5;
}