//Jennifer Robertson Game of Life testing code, 20/02/2016

describe('The rules', function(){
	var underpopulation = require('../script/gol')().underpopulation;
	var overcrowding = require('../script/gol')().overcrowding;
	var survival = require('../script/gol')().survival;
	var reproduction = require('../script/gol')().reproduction;

	it('Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', function (){
		expect(underpopulation(0,0)).toBe(0);
		expect(underpopulation(0,1)).toBe(0);
		expect(underpopulation(0,2)).toBe(0);
		expect(underpopulation(1,0)).toBe(0);
		expect(underpopulation(1,1)).toBe(0);
		expect(underpopulation(1,2)).toBe(1);
	});

	it('Any live cell with more than three live neighbours dies, as if by overcrowding.', function (){
		expect(overcrowding(0,0)).toBe(0);
		expect(overcrowding(0,1)).toBe(0);
		expect(overcrowding(0,2)).toBe(0);
		expect(overcrowding(0,3)).toBe(0);
		expect(overcrowding(0,4)).toBe(0);
		expect(overcrowding(1,0)).toBe(1);
		expect(overcrowding(1,1)).toBe(1);
		expect(overcrowding(1,2)).toBe(1);
		expect(overcrowding(1,3)).toBe(1);
		expect(overcrowding(1,4)).toBe(0);
	});


	it('Any live cell with two or three live neighbours lives on to the next generation.', function (){	
		expect(survival(1,2)).toBe(1);
		expect(survival(1,3)).toBe(1);	
	});


	it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function (){
		expect(reproduction(0,0)).toBe(0);
		expect(reproduction(0,1)).toBe(0);
		expect(reproduction(0,2)).toBe(0);
		expect(reproduction(0,3)).toBe(1);
		expect(reproduction(0,4)).toBe(0);
	});

});

describe('Game', function (){
	var evolve = require('../script/gol')().evolve;

	it('can perform a simple evolution', function(){
		var initialState = [
			[0,0,0],
			[0,1,0],
			[0,0,0]
		];

		var resultState = [
			[0,0,0],
			[0,0,0],
			[0,0,0]
		];

		expect(evolve(initialState)).toEqual(resultState);
	});

	it('can perform another simple evolution', function(){
		var initialState = [
			[0,0,0],
			[1,1,1],
			[0,0,0]
		];

		var resultState = [
			[0,1,0],
			[0,1,0],
			[0,1,0]
		];

		expect(evolve(initialState)).toEqual(resultState);
	});

	it('can perform a simple evolution in a rectangle', function(){
		var initialState = [
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0]
		];

		var resultState = [
			[0,1,1,0],
			[0,1,1,0],
			[0,1,1,0]
		];

		expect(evolve(initialState)).toEqual(resultState);
	});


	it('can perform a simple evolution in larger grid', function(){
		var initialState = [
			[0,0,0,0,0],
			[0,1,1,1,0],
			[0,1,0,1,0],
			[0,1,1,1,0],
			[0,0,0,0,0]
		];

		var resultState = [
			[0,0,1,0,0],
			[0,1,0,1,0],
			[1,0,0,0,1],
			[0,1,0,1,0],
			[0,0,1,0,0]
		];

		expect(evolve(initialState)).toEqual(resultState);
	});
});
