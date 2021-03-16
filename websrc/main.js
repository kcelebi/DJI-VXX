let dji, vxx;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	createCanvas(1000,700);
	dji_plot = new Plot("DJI", dji, [0, width], [0, height/2]);
	dji_slider = createSlider(1, 100, 300);
	dji_slider.position(width/10, 150);

	vxx_plot = new Plot("VXX", vxx, [0, width], [height/2, height]);
	vxx_slider = createSlider(1, 100, 300);
	vxx_slider.position(width/10, height/2+150);

}

function draw() {
	background(255);
	dji_plot.drawPlot(dji_slider.value()/100);
	vxx_plot.drawPlot(vxx_slider.value()/100);

	stroke(0);
	line(0, height/2, width, height/2);
}