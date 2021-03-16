let dji, vxx, dji_date, cvpos;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    
    //vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	let cnv = createCanvas(1000,700);

	
	cvpos = cnv.position();
	dji_date = Object.keys(dji);
	dji_plot = new Plot("DJI", dji, [0, width], [0, height], 250);
	dji_slider = createSlider(1, 100, 300);
	dji_slider.position(cvpos.x + 25, cvpos.y + 50);

	/*vxx_plot = new Plot("VXX", vxx, [0, width], [height/2, height]);
	vxx_slider = createSlider(1, 100, 300);
	vxx_slider.position(width/10, height/2+150);*/

}

function draw() {
	background(255);
	dji_plot.drawPlot(dji_slider.value()/100);

	textSize(16);
	stroke(0);
	text("Date Range: " + dji_date[dji_plot.lowerbound] + " to Today", 25, 35);
	//vxx_plot.drawPlot(vxx_slider.value()/100);

}