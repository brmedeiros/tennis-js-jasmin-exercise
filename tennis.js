function HelloWorld() {
    return 'Hello Tennis World';
}

document.getElementById("id1").innerHTML = HelloWorld();

// Game constructor start

function Game(player1, player2) {
    function gameInit(){
	return {'score': 0, 'adv': false};
    };

    this.players = {[player1]: gameInit(),
		    [player2]: gameInit()};
    this.p1name = Object.keys(this.players)[0];
    this.p2name = Object.keys(this.players)[1];
}

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.getPlayerScore = function(player){
    return this.players[player];
};

Game.prototype.score = function(player){
    if(this.players[player]['score'] < 30){
	// if the player has less than 30 points, add 15 to their score
	this.players[player]['score'] += 15;
    } else if (this.players[player]['score'] < 40) {
	// if the player has 30 points, make their score 40
	this.players[player]['score'] = 40;
    } else if((this.players[player]['score'] == 40) //this if block needs to be fixed
	      && this.players[player]['adv'] == false){
	// if the player has 40 points, scored again, had no previous
	// advantage and the other player also had no advantage
	// give them the advantage
	this.players[player]['adv'] = true;
    }
};

Game.prototype.getGameScore = function(){
    
    if(this.players[this.p1name]['score'] < 40 || this.players[this.p2name]['score'] < 40){
	// if at least 1 player has less than 40 points
	return this.p1name + ' ' + this.players[this.p1name]['score'] + ' vs ' + this.p2name + ' ' + this.players[this.p2name]['score'];
    } else if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == false){
	// if both players have 40 points and no advantages
	return 'Deuce';
    } else if(this.players[this.p1name]['adv'] == true){
	//should probably user ternary operators
	// if both players have 40 points and one of them has the advantage
	return 'Deuce: Advantage ' + this.p1name;
    } else {
	// if both players have 40 points and the other one has the advantage
	return 'Deuce: Advantage ' + this.p2name;
    }
    
};

Game.prototype.checkWinner = function(){
    //should probably user ternary operators
    if(this.players[this.p1name]['score'] == 40 && this.players[this.p2name]['score'] < 40
       && this.players[this.p1name]['adv'] == true){
	return this.p1name;
    } else if(this.players[this.p2name]['score'] == 40 && this.players[this.p1name]['score'] < 40
	      && this.players[this.p2name]['adv'] == true){
	return this.p2name;
    }
};

//Game constructor end
