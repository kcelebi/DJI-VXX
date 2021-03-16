class Plot {

	constructor(name, fname, x_lim, y_lim, ){
		this.name = name;
		this.fname = fname
		this.plot_dat = loadJSON(this.fname);
		this.dates = Object.keys(this.plot_dat);
		this.length = this.dates.length;
		this.x_lim = x_lim; //array of x lower/upper bound
		this.y_lim = y_lim;

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
	drawPlot(pc) {
		var num_data = Math.round(this.length * pc);
		var lb = (this.length-1) - num_data;
		var curr_dates = getDateRange(lb,this.length-1);
		var curr_data = getDataRange(lb, this.length-1);

		for(var i=1; i < num_data; i++){
			var line1 = [map(i-1, lb, this.length-1,this.x_lim[0], this.x_lim[1]), map(curr_data[i-1], 0, this.y_max, this.y_lim[0], this.y_lim[1]) ];
			var line2 = [map(i, lb, this.length-1,this.x_lim[0], this.x_lim[1]), map(curr_data[i], 0, this.y_max, this.y_lim[0], this.y_lim[1]) ];
			line(line1[0], line1[1], line2[0], line2[1]);
		}

	}
}