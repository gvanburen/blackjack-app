$(document).ready(function(){ 
//Class for Card
//Define the suits of the cards
var Suit = function(name, symbol) {
	this.name = name;
	this.symbol = symbol;
};

//4 suits: spades, clubs, hearts, diamonds]
var suits = {
	spades: new Suit ('Spades', '&spades;'),
	clubs: new Suit ('Clubs', '&clubs;'),
	hearts: new Suit ('Hearts', '&hearts;'),
	diamonds: new Suit ('Diamonds', '&diams;')
};

//Define the card. Each card has a value and a suit
var Card = function(value, suit) {
	this.value = value;
	this.suit = suit;
};

//Determine the card value
Card.prototype.getValue = function(){
	if (this.value > 10) {
		this.value = 10;
		return this.value;
	} else {
		return this.value;
	}
};

//Determine the card name for those values greater than 10
Card.prototype.getName = function(){
	if (this.value > 1 && this.value <= 10) {
		return this.value;
	} else if (this.value == 1) {
		return 'A'
	} else if (this.value == 11) {
		return 'J';
	} else if (this.value == 12) {
		return 'Q';
	} else {
		return 'K';
	}
};

Card.prototype.displayCard = function(){
	return ('<div class="outline ' + this.suit.name + '"><div class="top"><span>' + this.getName() + '</span><span>' + this.suit.symbol + '</span></div><h1>' + this.suit.symbol + '</h1><div class="bottom"><span>' + this.suit.symbol + '</span><span>' + this.getName() + '</span></div></div>')
};

//Class for Deck
var Deck = function(){
	this.deck = [];
};

//Method to build deck
Deck.prototype.build = function(){
	this.deck = [];
	for (var i = 1; i <= 13; i++) {
		this.deck.push(new Card(i, suits.spades));
		this.deck.push(new Card(i, suits.clubs));
		this.deck.push(new Card(i, suits.hearts));
		this.deck.push(new Card(i, suits.diamonds));
	}
};

//Method to shuffle deck
Deck.prototype.shuffle = function(){
	for (var i = this.deck.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this.deck[i];
		this.deck[i] = this.deck[j];
		this.deck[j] = temp;
	}
};

//Method to deal cards
Deck.prototype.deal = function(){
	a = this.deck[this.deck.length - 1].displayCard();
	b = this.deck[this.deck.length - 2].displayCard();
	c = this.deck[this.deck.length - 3].displayCard();
	d = this.deck[this.deck.length - 4].displayCard();
	return a, b, c, d;
};

Deck.prototype.hit = function(){
	a = this.deck[this.deck.length - 1].displayCard();
	return a;
}

//Game Functionality
/*
1. Build Deck
2. Shuffle Deck
3. Deal Player's Hand
4. Deal Dealer's Hand
5. Hit for More Cards to Player
6. Stand will initiate more cards being dealt to dealer (if applicable)
*/

//Game Buttons 
var myDeck = new Deck();
var dealer = $('.dealerCards');
var player = $('.playerCards');

//Build the deck
$('#build').on('click', function(){
	myDeck.build();
	console.log(myDeck.deck.length);
});

//Shuffle the deck
$('#shuffle').on('click', function(){
  	myDeck.shuffle();
});

//Deal the first two cards
$('#deal').on('click', function(){
	myDeck.deal();
	player.append(a);
	dealer.append(b);
	player.append(c);
	dealer.append(d);
	myDeck.deck.pop();
	myDeck.deck.pop();
	myDeck.deck.pop();
	myDeck.deck.pop();
});

//Deal one card at a time
$('#hit').on('click',function(){
	myDeck.hit();
	player.append(a);
	myDeck.deck.pop();
});






//Game Logic


});


















