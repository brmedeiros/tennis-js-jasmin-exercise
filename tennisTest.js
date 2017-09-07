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

    it("should make a player score 40 when they score a second time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Rakan');
	expect(game.getPlayerScore('Gnar')['score']).toBe(40);
	expect(game.getPlayerScore('Rakan')['score']).toBe(15);
	expect(game.getPlayerScore('Gnar')['adv']).toBe(false);
	expect(game.getPlayerScore('Rakan')['adv']).toBe(false);
    });
});
