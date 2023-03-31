function Card(number, type){
    this.number = number;
    this.type = type;
    if(this.number == 1){
        this.value = 11;
    }
    else if(this.number > 1 && this.number < 11){
        this.value = this.number;
    }else{
        this.value = 10;
    }
    this.imageName = this.loadImage();
};

Card.prototype.toString = function(){
    let cardName = `${this.number}`;
    // let string = "ciao" + this.number + "mi chiamo" + this.value;
    // let string2 =  `ciao ${this.number} mi chiamo ${this.value}`;

    if(this.number == 11){
        cardName = 'Jack';
    }
    else if(this.number == 12){
        cardName = 'Queen';
    }
    else if(this.number == 13){
        cardName = 'King';
    }
    return `${cardName} of ${this.type}`;
};

Card.prototype.getCardnameForImage = function(){
    if(this.number == 1){
        return 'asso';
    }
    else if(this.number > 1 && this.number < 11){
        return `${this.number}`;
    }
    else if(this.number == 11){
        return 'j';
    }
    else if(this.number == 12){
        return 'q';
    }
    else if(this.number == 13){
        return 'k';
    }
};

Card.prototype.getSuitForImage = function(){
    if(this.type == 'hearts'){
        return 'c';
    }else if(this.type == 'clubs'){
        return 'f';
    }else if(this.type == 'diamonds'){
        return 'q';
    }else if(this.type == 'spades'){
        return 'p';
    }
};

Card.prototype.loadImage = function(){
    return `${this.getSuitForImage()}${this.getCardnameForImage()}.png`;
};