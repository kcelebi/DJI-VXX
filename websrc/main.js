let dji;

function setup() {
	createCanvas(1000,700);
	dji = new Plot("DJI", "prediction_data/dji_data.json", [0, width], [0, height]);
}

function draw() {
	background(0);
}