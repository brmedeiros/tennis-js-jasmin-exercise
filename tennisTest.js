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
	var game1 =  new Game('Katarina', 'Garen');
	game1.score('Katarina');
	game1.score('Katarina');
	game1.score('Garen');
	game1.score('Garen');
	game1.score('Katarina');
	game1.score('Garen');
	game1.score('Katarina');
	expect(game1.getPlayerScore('Katarina')['score']).toBe(40);
	expect(game1.getPlayerScore('Garen')['score']).toBe(40);
	expect(game1.getPlayerScore('Katarina')['adv']).toBe(true);
	expect(game1.getPlayerScore('Garen')['adv']).toBe(false);

	var game2 =  new Game('Katarina', 'Garen');
	game2.score('Katarina');
	game2.score('Katarina');
	game2.score('Garen');
	game2.score('Garen');
	game2.score('Garen');	
	game2.score('Katarina');
	game2.score('Garen');
	expect(game2.getPlayerScore('Katarina')['score']).toBe(40);
	expect(game2.getPlayerScore('Garen')['score']).toBe(40);
	expect(game2.getPlayerScore('Katarina')['adv']).toBe(false);
	expect(game2.getPlayerScore('Garen')['adv']).toBe(true);
    });
    
    it("should remove the advantage from a player if the other player has 40 points and scores", function(){
	var game1 =  new Game('Katarina', 'Garen');
	game1.score('Katarina');
	game1.score('Katarina');
	game1.score('Garen');
	game1.score('Garen');
	game1.score('Garen');	
	game1.score('Katarina');
	game1.score('Garen');
	game1.score('Katarina');
	expect(game1.getPlayerScore('Katarina')['score']).toBe(40);
	expect(game1.getPlayerScore('Garen')['score']).toBe(40);
	expect(game1.getPlayerScore('Katarina')['adv']).toBe(false);
	expect(game1.getPlayerScore('Garen')['adv']).toBe(false);

	var game2 =  new Game('Katarina', 'Garen');
	game2.score('Katarina');
	console.log(game2.getGameScore());
	game2.score('Katarina');
	console.log(game2.getGameScore());
	game2.score('Garen');
	console.log(game2.getGameScore());
	game2.score('Garen');
	console.log(game2.getGameScore());
	game2.score('Garen');	
	console.log(game2.getGameScore());
	game2.score('Katarina');
	console.log(game2.getGameScore());
	game2.score('Katarina');
	console.log(game2.getGameScore());
	game2.score('Garen');
	console.log(game2.getGameScore());
	expect(game2.getPlayerScore('Katarina')['score']).toBe(40);
	expect(game2.getPlayerScore('Garen')['score']).toBe(40);
	expect(game2.getPlayerScore('Katarina')['adv']).toBe(false);
	expect(game2.getPlayerScore('Garen')['adv']).toBe(false);
    });

    it("should have a winner when one player has the advantage and scores again", function(){
	var game1 =  new Game('Miss Fortune', 'Azir');
	expect(game1.checkWinner()).toBe(undefined);
	game1.score('Miss Fortune'); //15-0
	game1.score('Azir'); //15-15
	game1.score('Azir'); //15-30
	game1.score('Miss Fortune'); //30-30
	game1.score('Miss Fortune'); //40-30
	expect(game1.checkWinner()).toBe(undefined);
	game1.score('Azir'); //deuce
	expect(game1.checkWinner()).toBe(undefined);
	game1.score('Azir'); // deuce adv Azir
	game1.score('Azir'); // winner Azir
	expect(game1.checkWinner()).toBe('Azir');

	var game2 =  new Game('Miss Fortune', 'Azir');
	expect(game2.checkWinner()).toBe(undefined);
	game2.score('Miss Fortune'); //15-0
	game2.score('Azir'); //15-15
	game2.score('Azir'); //15-30
	game2.score('Miss Fortune'); //30-30
	game2.score('Miss Fortune'); //40-30
	expect(game2.checkWinner()).toBe(undefined);
	game2.score('Azir'); //deuce
	expect(game2.checkWinner()).toBe(undefined);
	game2.score('Miss Fortune'); // deuce adv Miss Fortune
	game2.score('Miss Fortune'); // winner Miss Fortune
	expect(game2.checkWinner()).toBe('Miss Fortune');
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

	var game4 =  new Game('Varus', 'Tristana');
	game4.score('Varus'); //15-0
	game4.score('Tristana'); //15-15
	game4.score('Tristana'); //15-30
	game4.score('Varus'); //30-30
	game4.score('Varus'); //40-30
	game4.score('Tristana'); //deuce
	expect(game4.getPlayerScore('Tristana')['adv']).toBe(false);
	expect(game4.getPlayerScore('Varus')['adv']).toBe(false);
	expect(game4.getGameScore()).toBe('Deuce');
	game4.score('Tristana'); // deuce adv Tristana
	expect(game4.getGameScore()).toBe('Deuce: Advantage ' + 'Tristana');

	var game5 =  new Game('Varus', 'Tristana');
	game5.score('Varus'); //15-0
	game5.score('Tristana'); //15-15
	game5.score('Tristana'); //15-30
	game5.score('Varus'); //30-30
	game5.score('Varus'); //40-30
	game5.score('Tristana'); //deuce
	expect(game5.getGameScore()).toBe('Deuce');
	game5.score('Tristana'); // deuce adv Tristana
	expect(game5.getGameScore()).toBe('Deuce: Advantage ' + 'Tristana');
	game5.score('Varus'); // deuce 
	expect(game5.getPlayerScore('Tristana')['adv']).toBe(false);
	expect(game5.getPlayerScore('Varus')['adv']).toBe(false);
	expect(game5.getGameScore()).toBe('Deuce');
	game5.score('Varus'); // deuce adv Varus
	expect(game5.getPlayerScore('Tristana')['adv']).toBe(false);
	expect(game5.getPlayerScore('Varus')['adv']).toBe(true);
	expect(game5.getGameScore()).toBe('Deuce: Advantage ' + 'Varus');
    });
});
