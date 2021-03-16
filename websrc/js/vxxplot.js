let vxx, date, cvpos;

function preload() {
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	let cnv = createCanvas(windowWidth*4/5,700);
	
	cvpos = cnv.position();
	date = Object.keys(vxx);
	vxx_plot = new Plot("VXX", vxx, [0, width], [0, height]);
	vxx_slider = createSlider(1, 100, 100);
	

	//length of data is 5045, limit to 1000 ~~ 20%, go up by 1% on slider which is 50
	vxx_item_slider = createSlider(100, 1000, 250, 50);
}

function draw() {
	background(255);

	vxx_slider.position(cvpos.x + 25, cvpos.y + 50);
	vxx_item_slider.position(cvpos.x + 25, cvpos.y + 100);

	vxx_plot.drawPlot(vxx_slider.value()/100, vxx_item_slider.value());

	textSize(16);
	stroke(0);
	text("Date Range: " + date[vxx_plot.lowerbound] + " to Today", 25, 35);
	text("Data Points Shown: " + vxx_item_slider.value()/50 + "%", 25, 95);
	//vxx_plot.drawPlot(vxx_slider.value()/100);

}