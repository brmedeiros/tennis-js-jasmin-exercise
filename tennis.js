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
}

Game.prototype.getPlayers = function() {
    return this.players;
};

Game.prototype.getScore = function(player){
    return this.players[player];
};

Game.prototype.score = function(player){
    if(this.players[player]['score'] < 30){
	this.players[player]['score'] += 15;
    }
    else if (this.players[player]['score'] != 40){
	this.players[player]['score'] = 40;
    }
};

//Game constructor end
