let dji, dji_date, cvpos;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
}

function setup() {
	let cnv = createCanvas(windowWidth*4/5,700);
	inconsolata = loadFont('montserrat/Montserrat-Regular.otf');
	
	cvpos = cnv.position();
	dji_date = Object.keys(dji);
	dji_plot = new Plot("DJI", dji, [100, width-100], [100, height], 40000);
	dji_slider = createSlider(1, 100, 100);

	//length of data is 5045, limit to 500 ~~ 10%, go up by 1% on slider which is 50
	dji_item_slider = createSlider(100, 500, 250, 50);
}

function draw() {
	background(255);

	dji_slider.position(cvpos.x + 25, cvpos.y + 50);
	dji_item_slider.position(cvpos.x + 25, cvpos.y + 100);

	dji_plot.drawPlot(dji_slider.value()/100, dji_item_slider.value());
	if(mouseX > 100 && mouseX < width-100){
		dji_plot.drawCursor(dji_slider.value()/100, dji_item_slider.value());
	}

	textSize(16);
	textFont(inconsolata);
	stroke(0);
	fill(0);
	strokeWeight(0.1);
	text("Date Range: " + dji_date[dji_plot.lowerbound] + " to Today", 25, 35);
	text("Data Points Shown: " + dji_item_slider.value()/50 + "%", 25, 95);
	//vxx_plot.drawPlot(vxx_slider.value()/100);

}