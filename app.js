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

//Game Functionality


//Game Buttons 
var myDeck = new Deck();
myDeck.build();
myDeck.shuffle();
console.log(myDeck.deck);
var test = myDeck.deck[1].displayCard();;
$('.displayCards').append(test);


$('#build').on('click', function(){
	alert('you clicked');
	myDeck.build();
});

$('#shuffle').click(function(){
	alert('you clicked');
  	myDeck.shuffle();
 	console.log(myDeck.deck);
});


});


















