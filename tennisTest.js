// describe("HelloWorld()", function() { 

//    it("should Return Hello Tennis world", function() { 
//       expect(HelloWorld()).toBe('Hello Tennis World');
//    });

// });

describe("The Game", function() {

    it("should have two players", function() {
	var game =  new Game('player1', 'player2');
	expect(Object.keys(game.getPlayers()).length).toBe(2);
    });

    it("should start with zero score for both players", function(){
	var game =  new Game('Ahri', 'Nunu');
	expect(game.getPlayerScore('Ahri')['score']).toBe(0);
	expect(game.getPlayerScore('Nunu')['score']).toBe(0);
    });

    it("should start with no advantage to either player", function(){
	var game =  new Game('Shyvana', 'Ezreal');
	expect(game.getPlayerScore('Shyvana')['adv']).toBe(false);
	expect(game.getPlayerScore('Ezreal')['adv']).toBe(false);
    });

    it("should make a player score 15 when a player score for the first time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	expect(game.getPlayerScore('Gnar')['score']).toBe(15);
	expect(game.getPlayerScore('Rakan')['score']).toBe(0);
	expect(game.getPlayerScore('Gnar')['adv']).toBe(false);
	expect(game.getPlayerScore('Rakan')['adv']).toBe(false);
    });

    it("should make a player score 30 when they score a second time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	game.score('Rakan');
	game.score('Rakan');
	expect(game.getPlayerScore('Gnar')['score']).toBe(15);
	expect(game.getPlayerScore('Rakan')['score']).toBe(30);
	expect(game.getPlayerScore('Gnar')['adv']).toBe(false);
	expect(game.getPlayerScore('Rakan')['adv']).toBe(false);
    });

    it("should make a player score 40 when they score a third time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Rakan');
	expect(game.getPlayerScore('Gnar')['score']).toBe(40);
	expect(game.getPlayerScore('Rakan')['score']).toBe(15);
	expect(game.getPlayerScore('Gnar')['adv']).toBe(false);
	expect(game.getPlayerScore('Rakan')['adv']).toBe(false);
	expect(game.checkWinner()).toBe(undefined);
    });

    it("should have a winner when a player has 40 points, scores and the other player has 30 points or less", function(){
	var game1 =  new Game('Gnar', 'Rakan');
	game1.score('Gnar');
	game1.score('Gnar');
	game1.score('Gnar');
	game1.score('Gnar');
	expect(game1.getPlayerScore('Gnar')['score']).toBe(40);
	expect(game1.getPlayerScore('Rakan')['score']).toBe(0);
	expect(game1.checkWinner()).toBe('Gnar');

	var game2 =  new Game('Gnar', 'Rakan');
	game2.score('Rakan');
	game2.score('Rakan');
	game2.score('Gnar');
	game2.score('Gnar');
	game2.score('Rakan');
	game2.score('Rakan');
	expect(game2.getPlayerScore('Gnar')['score']).toBe(30);
	expect(game2.getPlayerScore('Rakan')['score']).toBe(40);
	expect(game2.checkWinner()).toBe('Rakan');
    });

    it("should give a player advantage when they score and both players have 40 points and no advantages", function(){
	var game =  new Game('Katarina', 'Garen');
	game.score('Katarina');
	console.log(game.getGameScore());
	game.score('Katarina');
	console.log(game.getGameScore());
	game.score('Garen');
	console.log(game.getGameScore());
	game.score('Garen');
	console.log(game.getGameScore());
	game.score('Katarina');
	console.log(game.getGameScore());
	game.score('Garen');
	console.log(game.getGameScore());
	game.score('Katarina');
	console.log(game.getGameScore());
	expect(game.getPlayerScore('Katarina')['score']).toBe(40);
	expect(game.getPlayerScore('Garen')['score']).toBe(40);
	expect(game.getPlayerScore('Katarina')['adv']).toBe(true);
	expect(game.getPlayerScore('Garen')['adv']).toBe(false);
    });

    it("should tell the correct score for both players at anytime", function(){
	var game1 =  new Game('Sona', 'Lux');
	game1.score('Lux');
	game1.score('Sona');
	game1.score('Sona');
	game1.score('Lux');
	expect(game1.getGameScore()).toBe('Sona' + ' ' + '30' +' vs ' + 'Lux' + ' ' + '30');
	
	var game2 =  new Game('Varus', 'Tristana');
	game2.score('Tristana');
	game2.score('Tristana');
	game2.score('Tristana');
	expect(game2.getGameScore()).toBe('Varus' + ' ' + '0' +' vs ' + 'Tristana' + ' ' + '40');
    
	var game3 =  new Game('Varus', 'Tristana');
	game3.score('Varus'); //15-0
	game3.score('Tristana'); //15-15
	game3.score('Tristana'); //15-30
	game3.score('Varus'); //30-30
	game3.score('Varus'); //40-30
	game3.score('Tristana'); //deuce
	expect(game3.getPlayerScore('Tristana')['adv']).toBe(false);
	expect(game3.getPlayerScore('Varus')['adv']).toBe(false);
	expect(game3.getGameScore()).toBe('Deuce');
	game3.score('Varus'); // deuce adv Varus
	expect(game3.getGameScore()).toBe('Deuce: Advantage ' + 'Varus');
    });
});
