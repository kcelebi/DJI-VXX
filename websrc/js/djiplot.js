let dji, vxx, dji_date, cvpos;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    
    //vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	let cnv = createCanvas(windowWidth*4/5,700);
	
	cvpos = cnv.position();
	dji_date = Object.keys(dji);
	dji_plot = new Plot("DJI", dji, [0, width], [0, height]);
	dji_slider = createSlider(1, 100, 100);
	

	//length of data is 5045, limit to 1000 ~~ 20%, go up by 1% on slider which is 50
	dji_item_slider = createSlider(100, 1000, 250, 50);
	
	/*vxx_plot = new Plot("VXX", vxx, [0, width], [height/2, height]);
	vxx_slider = createSlider(1, 100, 300);
	vxx_slider.position(width/10, height/2+150);*/

}

function draw() {
	background(255);

	dji_slider.position(cvpos.x + 25, cvpos.y + 50);
	dji_item_slider.position(cvpos.x + 25, cvpos.y + 100);

	dji_plot.drawPlot(dji_slider.value()/100, dji_item_slider.value());

	textSize(16);
	stroke(0);
	text("Date Range: " + dji_date[dji_plot.lowerbound] + " to Today", 25, 35);
	text("Data Points Shown: " + dji_item_slider.value()/50 + "%", 25, 95);
	//vxx_plot.drawPlot(vxx_slider.value()/100);

}