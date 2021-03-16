let dji, vxx;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	createCanvas(1000,700);
	dji_plot = new Plot("DJI", dji, [0, width], [0, height]);
}

function draw() {
	background(255);
	dji_plot.drawPlot(0.1);

}