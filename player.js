function Player(deck){
    this.hand = [];
    this.score = 0;
    this.deck = deck;
}

Player.prototype.drawCard = function(){
    let card = this.deck.getCard();
    this.hand.push(card);
    this.calculateScore();
}

Player.prototype.calculateScore = function(){
    let sum = 0;
    let pos = -1;
    for(let i = 0; i < this.hand.length; i++){
        sum += this.hand[i].value;
        if(this.hand[i].value == 11){
            pos = i;
        }
    }
    if(sum > 21 && pos != -1){
        this.hand[pos].value = 1;
        sum -= 10;
    }
    this.score = sum;
}

Player.prototype.getLastCard = function(){
    return this.hand[this.hand.length-1];
}