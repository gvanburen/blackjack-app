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
	this.visible = false;
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
	if (this.visible) {
		return ('<div class="outline ' + this.suit.name + '"><div class="top"><span>' + this.getName() + '</span><span>' + this.suit.symbol + '</span></div><div class="middle"><h1>' + this.suit.symbol + '</h1></div><div class="bottom"><span>' + this.suit.symbol + '</span><span>' + this.getName() + '</span></div></div>')
	} else {
		return ('<div class="outline cardBack ' + this.suit.name + '"><div class="top"><span>' + this.getName() + '</span><span>' + this.suit.symbol + '</span></div><div class="middle"><h1>' + this.suit.symbol + '</h1></div><div class="bottom"><span>' + this.suit.symbol + '</span><span>' + this.getName() + '</span></div></div>')
	}
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
Deck.prototype.deal = function(visible){
	visible = visible || false;
	if (visible){
		this.deck[this.deck.length - this.deck.length].visible = true;
	}
	return this.deck.shift();
};

Deck.prototype.hit = function(){
	return this.deck.shift();
}

Deck.prototype.handTotal = function(){
	var total = 0;
  var aces = 0;
	for (var i = 0; i < this.deck.length; i++) {
		if (this.deck[i].getValue() == 1) {
      aces++;
    }
  	total += this.deck[i].getValue();
  }
  if (aces && total < 12){
    total += 10;
  }
  return total;
};

var winLose = function(number){
  if (number >= 21){
		$("div").removeClass("cardBack");
    var dealerTotal = dealerHand.handTotal();
  		while (dealerTotal < 17){
    		dealerHand.deck.push(myDeck.deal(true));
    		var html = dealerHand.deck[dealerHand.deck.length - 1].displayCard();
				dealer.append(html);
    		var dealerTotal = dealerHand.handTotal();
  		}
    whoWon(dealerTotal, number);
  }
};

var whoWon = function(dH, pH){
  var dealer = $('.dealerCards');
	var player = $('.playerCards');
  //dealer hand == player hand
  if (dH > 21 && pH > 21){
    dealer.addClass('tie');
    player.addClass('tie');
  } else if (dH > 21 && pH <= 21){
    dealer.addClass('loser');
    player.addClass('winner');
  } else if (dH == pH) {
    dealer.addClass('tie');
    player.addClass('tie');
  } else if (dH > pH) {
    if (dH <= 21) {
      dealer.addClass('winner');
      player.addClass('loser');
    } else if (pH > 21) {
      dealer.addClass('winner');
    	player.addClass('loser');
    } else {
      dealer.addClass('tie');
    	player.addClass('tie');
    }
  } else if (dH < pH){
  	if (pH <= 21){
      dealer.addClass('loser');
      player.addClass('winner');
    } else if (dH > 21) {
      dealer.addClass('loser');
      player.addClass('winner');
    } else if (dH < 21) {
      dealer.addClass('winner');
      player.addClass('loser');
    } else {
      dealer.addClass('tie');
    	player.addClass('tie');
    }
  }else {
    dealer.addClass('tie');
    player.addClass('tie');
  }
};

//Game Buttons 
var myDeck = new Deck();
var playerHand = new Deck();
var dealerHand = new Deck();
var dealer = $('.dealerCards');
var player = $('.playerCards');

//Build the deck
$('#build').on('click', function(){
	dealer.empty();
	player.empty();
	myDeck.build();
	playerHand.deck = [];
	dealerHand.deck = [];
});

//Shuffle the deck
$('#shuffle').on('click', function(){
  	myDeck.shuffle();
});

//Deal the first two cards
$('#deal').on('click', function(){
	dealer.empty();
  dealer.removeClass('tie winner loser');
	player.empty();
  player.removeClass('tie winner loser');
  playerHand.deck = [];
	dealerHand.deck = [];
  for (var i=0; i < 4; i++) {
		if (i == 0) {
			dealerHand.deck.push(myDeck.deal(true));
		} else if (i == 2) {
			dealerHand.deck.push(myDeck.deal(false));
		} else {
			playerHand.deck.push(myDeck.deal(true));
		}
	}
	for (var i = 0; i < 2; i++) {
		var html = dealerHand.deck[i].displayCard();
		dealer.append(html);
		var html = playerHand.deck[i].displayCard();
		player.append(html);
	}
});

//Deal one card at a time
$('#hit').on('click',function(){		   
  playerHand.deck.push(myDeck.deal(true));
	var html = playerHand.deck[playerHand.deck.length - 1].displayCard();
	player.append(html);
	var playerTotal = playerHand.handTotal();
  winLose(playerTotal);
  console.log(playerTotal);
});

$('#stand').on('click',function(){
  var playerTotal = playerHand.handTotal();
  winLose(playerTotal);
  console.log(playerTotal);
  $("div").removeClass("cardBack");
  var dealerTotal = dealerHand.handTotal();
  while (dealerTotal < 17){
    dealerHand.deck.push(myDeck.deal(true));
    var html = dealerHand.deck[dealerHand.deck.length - 1].displayCard();
		dealer.append(html);
    var dealerTotal = dealerHand.handTotal();
    whoWon(dealerTotal, playerTotal);
  }
});

//Game Logic



});


















