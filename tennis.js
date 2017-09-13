function HelloWorld() {
    return 'Hello Tennis World';
}

document.getElementById("id1").innerHTML = HelloWorld();

// Game constructor start
function Game(player1, player2){
    this.p1name = player1;
    this.p2name = player2;

    function gameInit(){
	return {'score': 0, 'adv': false, 'winner': false};
    };

    this.players = {};
    this.players[this.p1name] = gameInit();
    this.players[this.p2name] = gameInit();
}
// Game constructor end

// Game methods start
Game.prototype.getPlayers = function(){
    return this.players;
};

Game.prototype.getPlayerScore = function(player){
    return this.players[player];
};

Game.prototype.score = function(player){
    if(this.players[player]['score'] < 30){
	this.players[player]['score'] += 15;
    } else if (this.players[player]['score'] < 40){
	this.players[player]['score'] = 40;
    } else if(this.players[player]['score'] == 40){
	other_player = player == this.p1name ? this.p2name : this.p1name;
	if(this.players[player]['adv'] || this.players[other_player]['score'] < 40) {
	    this.players[player]['winner'] = true;
	} else if (this.players[other_player]['adv']) {
	    this.players[other_player]['adv'] = false;
	} else {
	    this.players[player]['adv'] = true;
	}
    }
};

Game.prototype.getGameScore = function() {
    if(this.players[this.p1name]['score'] < 40 || this.players[this.p2name]['score'] < 40){
	return this.p1name + ' ' + this.players[this.p1name]['score'] + ' vs ' + this.p2name + ' ' + this.players[this.p2name]['score'];
    } else if(this.players[this.p1name]['adv'] == false && this.players[this.p2name]['adv'] == false){
	return 'Deuce';
    } else if(this.players[this.p1name]['adv']){
	return 'Deuce: Advantage ' + this.p1name;
    } else {
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
// Game methods end
