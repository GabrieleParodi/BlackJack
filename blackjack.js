function BlackJack(containerId){
    this.deck = new Deck();
    this.container = document.querySelector(`#${containerId}`);
    this.imagePrefix = "img/carte_francesi/";
    this.playerCards = [];
    this.dealerCards = [];
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
    let c1 = this.deck.getCard();
    let c2 = this.deck.getCard();
    this.playerCards.push(c1);
    this.playerCards.push(c2);
    let d1 = this.deck.getCard();
    let d2 = this.deck.getCard();
    this.dealerCards.push(d1);
    this.dealerCards.push(d2);

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
    dImg1.setAttribute('src', `${this.imagePrefix}${this.dealerCards[0].imageName}`);
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
    img1.setAttribute('src', `${this.imagePrefix}${this.playerCards[0].imageName}`);
    playerTable.appendChild(img1);

    let img2 = document.createElement("img");
    img2.setAttribute('src', `${this.imagePrefix}${this.playerCards[1].imageName}`);
    playerTable.appendChild(img2);
}

BlackJack.prototype.visualizeInitialScore = function(){
    let score = this.playerCards[0].value + this.playerCards[1].value;
    this.playerScore = score;
    let paragraph = document.createElement("p");
    this.output = paragraph;
    this.container.appendChild(paragraph);
    paragraph.innerText = `YOUR SCORE IS: ${score}`;
}

BlackJack.prototype.visualizeScore = function(){
    let sum = 0;
    let pos = -1;
    for(let i = 0; i < this.playerCards.length; i++){
        sum += this.playerCards[i].value;
        if(this.playerCards[i].value == 11){
            pos = i;
        }
    }
    if(sum > 21 && pos == -1){
        this.playerScore = sum;
        this.output.innerText = "You BUSTED :)!"
    }else if(sum > 21 && pos != -1){
        this.playerCards[pos].value = 1;
        this.playerScore = sum - 10;
        this.output.innerText = `Your score is: ${sum-10}`;
    }else{
        this.playerScore = sum;
        this.output.innerText = `Your score is: ${sum}`;
    }
}

BlackJack.prototype.stay = function(){
    this.buttonTray.querySelector("#stay").style.display = "none";
    this.buttonTray.querySelector("#hit").style.display = "none";
    let playAgain = document.createElement("button");
    playAgain.innerText = "Rematch";
    this.buttonTray.appendChild(playAgain);

    let sum = 0;
    let pos = -1;
    for(let i = 0; i < this.dealerCards.length; i++){
        sum += this.dealerCards[i].value;
        if(this.dealerCards[i].value == 11){
            pos = i;
        }
    }
    while(sum < 17 || (sum <= this.playerScore && this.playerScore < 22)){
        let dc = this.deck.getCard();
        this.dealerCards.push(dc);
        let dImg = document.createElement("img");
        dImg.setAttribute('src', `${this.imagePrefix}${dc.imageName}`);
        this.dealerTable.appendChild(dImg);
        sum = 0;
        for(let i = 0; i < this.dealerCards.length; i++){
            sum += this.dealerCards[i].value;
            if(this.dealerCards[i].value == 11){
                pos = i;
            }
        }
    }
    let finalMessage = ""; 
    if(sum > 21){
        finalMessage += "The dealer BUSTED, how lucky! you WON!";
    }else if(sum == this.playerScore){
        finalMessage += "You and the dealer made the same score, it's a DRAW...";
    }else if(sum > this.playerScore){
        finalMessage += "You're a loser! Dealer WON!";
    }
    this.output.innerText = finalMessage;
}

BlackJack.prototype.hit = function(){
    let c = this.deck.getCard();
    this.playerCards.push(c);
    let pImg = document.createElement("img");
    pImg.setAttribute('src', `${this.imagePrefix}${c.imageName}`);
    this.playerTable.appendChild(pImg);
    this.visualizeScore();
}


let game = new BlackJack("container");

game.init();
