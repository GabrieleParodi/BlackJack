function BlackJack(containerId){
    this.deck = new Deck();
    this.player = new Player(this.deck);
    this.dealer = new Player(this.deck),
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
    if(this.deck.cards.length < 4 ){
        console.log("ciao");
    }else{
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

        this.visualizeMoney();
    }
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

    let playAgain = document.createElement("button");
    playAgain.setAttribute('id', "playAgain");
    playAgain.style.display = "none";
    playAgain.innerText = "Rematch";

    let buttonTray = document.createElement("div");
    buttonTray.setAttribute('id', "buttonTray");
    this.buttonTray = buttonTray;
    this.container.appendChild(buttonTray);
    buttonTray.appendChild(stay);
    buttonTray.appendChild(hit);
    buttonTray.appendChild(playAgain);

    stay.addEventListener("click", ()=> this.stay());
    hit.addEventListener("click", ()=> this.hit());
    playAgain.addEventListener("click", () =>this.resetGame());
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
    paragraph.setAttribute('id', "score");
    this.output = paragraph;
    this.container.appendChild(paragraph);
    paragraph.innerText = `YOUR SCORE IS: ${this.player.score}`;
}

BlackJack.prototype.visualizeScore = function(){
    let playerScore = this.player.score;
    if(playerScore > 21){
        this.output.innerText = "You BUSTED :)!";
        this.buttonTray.querySelector("#stay").style.display = "none";
        this.buttonTray.querySelector("#hit").style.display = "none";
        this.buttonTray.querySelector("#playAgain").style.display = "block";
    }else{
        this.output.innerText = `Your score is: ${playerScore}`;
    }
}

BlackJack.prototype.visualizeMoney = function(){
    let money = document.createElement("p");
    money.setAttribute('id', "money");
    this.container.appendChild(money);
    money.innerText = `MONEY : ${this.player.money}$`;
}

BlackJack.prototype.stay = function(){
    this.buttonTray.querySelector("#playAgain").style.display = "block";
    let secondCard = document.querySelector("#dealerTable img:nth-of-type(2)");
    secondCard.setAttribute('src', `${this.imagePrefix}${this.dealer.hand[1].imageName}`);
    this.buttonTray.querySelector("#stay").style.display = "none";
    this.buttonTray.querySelector("#hit").style.display = "none";

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
    this.player.askMoney();
    this.player.drawCard();
    let lastCard = this.player.getLastCard();;
    let pImg = document.createElement("img");
    pImg.setAttribute('src', `${this.imagePrefix}${lastCard.imageName}`);
    this.playerTable.appendChild(pImg);
    this.visualizeScore();
}

BlackJack.prototype.resetGame = function(){
    this.player.resetHand();
    this.dealer.resetHand();
    let remove1 = document.getElementById("dealerTable");
    remove1.parentNode.removeChild(remove1);
    let remove2 = document.getElementById("playerTable");
    remove2.parentNode.removeChild(remove2);
    let remove3 = document.getElementById("score");
    remove3.parentNode.removeChild(remove3);
    let remove4 = document.getElementById("buttonTray");
    remove4.parentNode.removeChild(remove4);
    let remove5 = document.getElementById("money");
    remove5.parentNode.removeChild(remove5);
    this.startGame();
}

let game = new BlackJack("container");

game.init();
