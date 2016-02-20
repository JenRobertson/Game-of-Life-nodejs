//Jennifer Robertson Game of Life code, 20/02/2016

//Assumptions made: All cells outside the given grid area are empty.

module.exports = function(){
	function underpopulation(cellState, numberOfLiveNeighbours) {
		if(cellState == 1 && numberOfLiveNeighbours >= 2){
			return 1;
		}
		else{
			return 0;
		}
		
	}

	function overcrowding(cellState, numberOfLiveNeighbours) {
		if(cellState == 1 && numberOfLiveNeighbours > 3){
			return 0;
		}
		else{
			return cellState;
		}
		
	}

	function survival(cellState, numberOfLiveNeighbours) {
		if(cellState == 1 && (numberOfLiveNeighbours == 2 || numberOfLiveNeighbours == 3)){
			return 1;
		}
		else{
			return cellState;
		}
				
	}


	function reproduction(cellState, numberOfLiveNeighbours) {
		if(cellState == 0 && numberOfLiveNeighbours == 3){
			return 1;
		}
		else{
			return cellState;
		}
				
	}

	function evolve(gridState){
		//initialise the newState array to be the same size as the gridState
		//(this allows the grid to be rectangular or square of any size)
		var newState = new Array(gridState.length);

	    for (var i = 0; i < gridState.length; i++) {
	       newState[i] = new Array(gridState[0].length);
	    }
	
	    //iterate through each cell of the grid
		for (i = 0; i < gridState.length; i++) { 
			for (a = 0; a < gridState[0].length; a++) { 

				//stores amount of live neighbours
				var amount = 0; 

				//find the number of live neighbours
				//top left
				if (i > 0 && a > 0)
					amount += gridState[i-1][a-1]; 

				//top
				if (i > 0)
					amount += gridState[i-1][a]; 

				//top right
				if (i > 0 && a < gridState[0].length - 1)
					amount += gridState[i-1][a+1]; 

				//left
				if (a > 0)
					amount += gridState[i][a-1];

				//right
				if (a < gridState[0].length - 1)
					amount += gridState[i][a+1];

				//bottom left
				if (i < gridState.length - 1 && a > 0)
					amount += gridState[i+1][a-1];

				//bottom
				if (i < gridState.length - 1)
					amount += gridState[i+1][a];

				//bottom right
				if (i < gridState.length - 1 && a < gridState[0].length - 1)
					amount += gridState[i+1][a+1];

	
				//apply the first function to the grid value
				newState[i][a] = underpopulation(gridState[i][a], amount);
				//now apply the functions to the new value.
				newState[i][a] = overcrowding(newState[i][a], amount);
				newState[i][a] = survival(newState[i][a], amount);
				newState[i][a] = reproduction(newState[i][a], amount);

			}
		}
	
		return newState;
	}

	return {
		underpopulation: underpopulation,
		overcrowding: overcrowding,
		survival: survival,
		reproduction: reproduction,
		evolve: evolve
	};

};