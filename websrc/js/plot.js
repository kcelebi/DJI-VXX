class Plot {

	constructor(name, plot_dat, x_lim, y_lim){
		this.name = name;
		this.plot_dat = plot_dat;
		console.log("Initializing data: " + this.name);
		this.dates = Object.keys(this.plot_dat);
		this.length = this.dates.length;
		this.x_lim = x_lim; //array of x lower/upper bound
		this.y_lim = y_lim;

		this.lowerbound = 0;


		this.y_max = 40000;

	}

	//returns ith data point
	getData(i) {
		return this.plot_dat[this.dates[i]];
	}

	getDate(i) {
		return this.dates[i];
	}

	//Returns a range of data from i to jth data point inclusive
	getDataRange(i,j) {
		var arr = []
		for(var k=i; k < j+1; k++){
			arr.push(this.getData(k));
		}
		return arr;
	}

	//Returns a range of dates from i to jth date inclusive
	getDateRange(i,j){
		var arr = []
		for(var k=i; k < j+1; k++){
			arr.push(this.getDate(k));
		}
		return arr;
	}

	//draw the pc percentage of plot
	drawPlot(pc, plotlim) {
		
		var num_data = Math.round(this.length * pc);
		var lb = this.length - num_data;
		this.lowerbound = lb;
		var curr_data = this.getDataRange(lb, this.length-1);

		if(this.name == "VXX"){
			console.log("Drawing plot " + this.name);
        	console.log("Num data points: " + num_data);
        	console.log("LB: " + lb);
    	}
    	
		stroke(0,155,0);
        strokeWeight(1);

        var dx = 0;
        if(num_data > plotlim){
        	dx = Math.round(num_data/plotlim);
        }
        else{
        	dx = 1;
        }//number of items on screen

		for(var i=dx; i < num_data; i+=dx){
			var line1 = [map(i-dx, 0, num_data, this.x_lim[0], this.x_lim[1], true), map(curr_data[i-dx], 0, this.y_max, this.y_lim[1], this.y_lim[0], true) ];
			var line2 = [map(i, 0, num_data, this.x_lim[0], this.x_lim[1], true), map(curr_data[i], 0, this.y_max, this.y_lim[1], this.y_lim[0], true) ];
			line(line1[0], line1[1], line2[0], line2[1]);
		}

	}
}