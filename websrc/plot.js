class Plot {

	constructor(name, data){
		this.name = name;
		this.data = data;
		this.plot_dat = loadJSON(this.name);
		this.dates = Object.keys(this.plot_dat);
		this.length = this.dates.length;
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
			line(curr_dates[i-1], curr_data[i-1], curr_dates[i], curr_data[i]);
		}

	}
}