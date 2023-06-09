function Deck(){
    let cards = [];
    let types = ['hearts', 'clubs', 'diamonds', 'spades'];
    for(let i = 1; i < 14; i++){
        for(let t of types){
            let c = new Card(i, t);
            cards.push(c);
        }
    }
    this.cards =  cards;
}

Deck.prototype.shuffle = function(){
    //creiamo due numeri random e inverto la loro posizione per 1000 volte
    for(let i = 0; i < 1000; i++){
        let r1 = Math.floor(Math.random()*this.cards.length);
        let r2 = Math.floor(Math.random()*this.cards.length);
        let copia = this.cards[r1];
        this.cards[r1] = this.cards[r2];
        this.cards[r2] = copia;
    }
};

Deck.prototype.getCard = function(){
    let c = this.cards.pop();
    return c;
    //return this.cards.pop();
};