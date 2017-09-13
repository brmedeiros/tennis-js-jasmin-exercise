function HelloWorld() {
    return 'Hello Tennis World';
}

document.getElementById("id1").innerHTML = HelloWorld();

// Game constructor start

function Game(player1, player2){
    function gameInit(){
	// maybe there is a better solution to finding
	// the winner when the advantage rule applies than
	// adding the winner key here
	return {'score': 0, 'adv': false, 'winner': false};
    };

    this.players = {};
    this.players[player1] = gameInit();
    this.players[player2] = gameInit();
    // key name strings
    this.p1name = player1;
    this.p2name = player2;
}

Game.prototype.getPlayers = function(){
    return this.players;
};

Game.prototype.getPlayerScore = function(player){
    return this.players[player];
};

Game.prototype.score = function(player){
    if(this.players[player]['score'] < 30){
	// if the player has less than 30 points, add 15 to their score
	this.players[player]['score'] += 15;
    } else if (this.players[player]['score'] < 40){
	// if the player has 30 points, make their score 40
	this.players[player]['score'] = 40;
    } else if(this.players[player]['score'] == 40){
	// if the player has 40
	other_player = player == this.p1name ? this.p2name : this.p1name;
	if(this.players[player]['adv'] || this.players[other_player]['score'] < 40) {
	    // and has the advantage or the other player has less than 40, they are the winner
	    this.players[player]['winner'] = true;
	} else if (this.players[other_player]['adv']) {
	    // does not have the advantage and the other player has it
	    // remove the advantage from the other player
	    this.players[other_player]['adv'] = false;
	} else {
	    // no player has the advantage
	    // give the advantage to the player that scored
	    this.players[player]['adv'] = true;
	}
    }
};

Game.prototype.getGameScore = function() {
    if(this.players[this.p1name]['score'] < 40 || this.players[this.p2name]['score'] < 40){
	// if at least 1 player has less than 40 points
	return this.p1name + ' ' + this.players[this.p1name]['score'] + ' vs ' + this.p2name + ' ' + this.players[this.p2name]['score'];
    } else if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == false){
	// if both players have 40 points and no advantages
	return 'Deuce';
    } else if(this.players[this.p1name]['adv'] == true){
	// if both players have 40 points and one of them has the advantage
	return 'Deuce: Advantage ' + this.p1name;
    } else {
	// if both players have 40 points and the other one has the advantage
	return 'Deuce: Advantage ' + this.p2name;
    }
};

Game.prototype.checkWinner = function(){
    var player;
    for(player of Object.keys(this.players)) {
	if( this.players[player]['winner']){
	    return player;
	}
    }
};

//Game constructor end
