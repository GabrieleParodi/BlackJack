function BlackJack(containerId){
    this.deck = new Deck();
    this.player = new Player(this.deck);
    this.dealer = new Player(this.deck);
    this.container = document.querySelector(`#${containerId}`);
    this.imagePrefix = "img/carte_francesi/";
}

BlackJack.prototype.init = function(){
    let b = document.createElement("button");
    b.setAttribute('id', "startGame");
    b.innerText = "Start Game!";
    this.container.appendChild(b);
    b.addEventListener("click", this.startGame.bind(this));
} 

BlackJack.prototype.startGame = function(){
    this.deck.shuffle();
    
    this.player.drawCard();
    this.player.drawCard();
    this.dealer.drawCard();
    this.dealer.drawCard();

    this.container.classList.add("flex");
    this.container.style.backgroundImage = "url('img/marco1.jpg')";
    document.getElementById("startGame").style.display = "none";
    
    this.createDealerTable();

    this.createButtonTray();
    
    this.createPlayerTable();

    this.visualizeInitialScore();

}

BlackJack.prototype.createDealerTable = function(){
    let dealerTable = document.createElement("div");
    this.dealerTable = dealerTable;
    dealerTable.setAttribute('id', "dealerTable");
    this.container.appendChild(dealerTable);

    let dImg1 = document.createElement("img");
    dImg1.setAttribute('src', `${this.imagePrefix}${this.dealer.hand[0].imageName}`);
    dealerTable.appendChild(dImg1);
    let dImg2 = document.createElement("img");
    dImg2.setAttribute('src', `${this.imagePrefix}back.png`);
    dealerTable.appendChild(dImg2);
}

BlackJack.prototype.createButtonTray = function(){
    let stay = document.createElement("button");
    stay.setAttribute('id', "stay");
    stay.innerText = "STAY";

    let hit = document.createElement("button");
    hit.setAttribute('id', "hit");
    hit.innerText = "HIT";

    let buttonTray = document.createElement("div");
    this.buttonTray = buttonTray;
    this.container.appendChild(buttonTray);
    buttonTray.appendChild(stay);
    buttonTray.appendChild(hit);

    stay.addEventListener("click", ()=> this.stay());
    hit.addEventListener("click", ()=> this.hit());
}

BlackJack.prototype.createPlayerTable = function(){
    let playerTable = document.createElement("div");
    this.playerTable = playerTable;
    playerTable.setAttribute('id', "playerTable");
    this.container.appendChild(playerTable);

    let img1 = document.createElement("img");
    img1.setAttribute('src', `${this.imagePrefix}${this.player.hand[0].imageName}`);
    playerTable.appendChild(img1);

    let img2 = document.createElement("img");
    img2.setAttribute('src', `${this.imagePrefix}${this.player.hand[1].imageName}`);
    playerTable.appendChild(img2);
}

BlackJack.prototype.visualizeInitialScore = function(){
    let paragraph = document.createElement("p");
    this.output = paragraph;
    this.container.appendChild(paragraph);
    paragraph.innerText = `YOUR SCORE IS: ${this.player.score}`;
}

BlackJack.prototype.visualizeScore = function(){
    let playerScore = this.player.score;
    if(playerScore > 21){
        this.output.innerText = "You BUSTED :)!"
    }else{
        this.output.innerText = `Your score is: ${playerScore}`;
    }
}

BlackJack.prototype.stay = function(){
    let secondCard = document.querySelector("#dealerTable img:nth-of-type(2)");
    secondCard.setAttribute('src', `${this.imagePrefix}${this.dealer.hand[1].imageName}`);

    this.buttonTray.querySelector("#stay").style.display = "none";
    this.buttonTray.querySelector("#hit").style.display = "none";
    let playAgain = document.createElement("button");
    playAgain.innerText = "Rematch";
    this.buttonTray.appendChild(playAgain);

    let dealerScore = this.dealer.score;
    let playerScore = this.player.score;
    while(dealerScore < 17 || (dealerScore <= playerScore && playerScore < 22)){
        this.dealer.drawCard();
        let lastCard = this.dealer.getLastCard();
        let dImg = document.createElement("img");
        dImg.setAttribute('src', `${this.imagePrefix}${lastCard.imageName}`);
        this.dealerTable.appendChild(dImg);
        dealerScore = this.dealer.score;
    }
    let finalMessage = ""; 
    if(dealerScore > 21){
        finalMessage += "The dealer BUSTED, how lucky! you WON!";
    }else if(dealerScore == playerScore){
        finalMessage += "You and the dealer made the same score, it's a DRAW...";
    }else if(dealerScore > playerScore){
        finalMessage += "You're a loser! Dealer WON!";
    }
    this.output.innerText = finalMessage;
}

BlackJack.prototype.hit = function(){
    this.player.drawCard();
    let lastCard = this.player.getLastCard();
    let pImg = document.createElement("img");
    pImg.setAttribute('src', `${this.imagePrefix}${lastCard.imageName}`);
    this.playerTable.appendChild(pImg);
    this.visualizeScore();
}


let game = new BlackJack("container");

game.init();
