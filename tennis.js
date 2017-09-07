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
	this.players[player]['score'] += 15;
    } else if (this.players[player]['score'] < 40) {
	this.players[player]['score'] = 40;
    } else if((this.players[player]['score'] == 40) //this will need to be fixed
	      && this.players[player]['adv'] == false){
	this.players[player]['adv'] = true;
    }
};

Game.prototype.getGameScore = function(){
    if(this.players[this.p1name]['score'] < 40 || this.players[this.p2name]['score'] < 40){
	return this.p1name + ' ' + this.players[this.p1name]['score'] + ' vs ' + this.p2name + ' ' + this.players[this.p2name]['score'];
    } else if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == false){
	return 'Deuce';
    } else{
	return 'Deuce: Advantage ' + this.p1name; //this will need to be fixed
    }
    
};

Game.prototype.checkWinner = function(){
    if(this.players[this.p1name]['score'] == 40 && this.players[this.p2name]['score'] < 40
       && this.players[this.p1name]['adv'] == true){
	return this.p1name;
    } else if(this.players[this.p2name]['score'] == 40 && this.players[this.p1name]['score'] < 40
	      && this.players[this.p2name]['adv'] == true){
	return this.p2name;
    }
};

//Game constructor end
