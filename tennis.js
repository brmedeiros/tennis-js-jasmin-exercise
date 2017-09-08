function HelloWorld() {
    return 'Hello Tennis World';
}

document.getElementById("id1").innerHTML = HelloWorld();

// Game constructor start

function Game(player1, player2){
    function gameInit(){
	return {'score': 0, 'adv': false};
    };

    this.players = {[player1]: gameInit(),
		    [player2]: gameInit()};
    // key name strings
    this.p1name = Object.keys(this.players)[0];
    this.p2name = Object.keys(this.players)[1];
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
	if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == false){
	    // if the player has 40 points, scores and no player has
	    // the advantage, give them the advantage
	    this.players[player]['adv'] = true;
	} else if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == true
		  && player == this.p1name){
	    // if the first player scores and the second player has
	    // the advantage, remove the advantage
	    this.players[this.p2name]['adv'] = false;
	} else if(this.players[this.p1name]['adv'] == true && this.players[this.p2name]['adv'] == false
		  && player == this.p2name){
	    // if the second player scores and the first player has
	    // the advantage, remove the advantage
	    this.players[this.p1name]['adv'] = false;
	}
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
	//ternary operators?
	// if both players have 40 points and one of them has the advantage
	return 'Deuce: Advantage ' + this.p1name;
    } else {
	// if both players have 40 points and the other one has the advantage
	return 'Deuce: Advantage ' + this.p2name;
    }
    
};

Game.prototype.checkWinner = function(){
    // should probably use ternary operators
    if(this.players[this.p1name]['score'] == 40 && this.players[this.p2name]['score'] < 40
       && this.players[this.p1name]['adv'] == true){
	// if the first player has 40 points and the advantage and the second player
	// has less then 40 points, the first player is the winner
	return this.p1name;
    } else if(this.players[this.p2name]['score'] == 40 && this.players[this.p1name]['score'] < 40
	      && this.players[this.p2name]['adv'] == true){
	// same thing for the second player
	return this.p2name;
    } else if(this.players[this.p1name]['score'] == 40 && this.players[this.p2name]['score'] == 40){
	if(this.players[this.p1name]['adv'] == true){}
    }
};

//Game constructor end
