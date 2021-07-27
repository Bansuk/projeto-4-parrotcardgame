let numCards;

do{
    numCards = prompt("Com quantas cartas você gostaria de jogar?");
    console.log(numCards)
} while(numCards % 2 !== 0 || numCards < 4 || numCards > 14)