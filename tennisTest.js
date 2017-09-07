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
	expect(game.getScore('Ahri')['score']).toBe(0);
	expect(game.getScore('Nunu')['score']).toBe(0);
    });

    it("should start with no advantage to either player", function(){
	var game =  new Game('Shyvana', 'Ezreal');
	expect(game.getScore('Shyvana')['adv']).toBe(false);
	expect(game.getScore('Ezreal')['adv']).toBe(false);
    });

    it("should make a player score 15 when a player score for the first time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	expect(game.getScore('Gnar')['score']).toBe(15);
	expect(game.getScore('Rakan')['score']).toBe(0);
	expect(game.getScore('Gnar')['adv']).toBe(false);
	expect(game.getScore('Rakan')['adv']).toBe(false);
    });

    it("should make a player score 30 when they score a second time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	game.score('Rakan');
	game.score('Rakan');
	expect(game.getScore('Gnar')['score']).toBe(15);
	expect(game.getScore('Rakan')['score']).toBe(30);
	expect(game.getScore('Gnar')['adv']).toBe(false);
	expect(game.getScore('Rakan')['adv']).toBe(false);
    });

    it("should make a player score 40 when they score a second time", function(){
	var game =  new Game('Gnar', 'Rakan');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Gnar');
	game.score('Rakan');
	expect(game.getScore('Gnar')['score']).toBe(40);
	expect(game.getScore('Rakan')['score']).toBe(15);
	expect(game.getScore('Gnar')['adv']).toBe(false);
	expect(game.getScore('Rakan')['adv']).toBe(false);
    });
});
