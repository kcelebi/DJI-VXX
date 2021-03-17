let vxx, date, cvpos, buttons, num_val;

function preload() {
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
	let cnv = createCanvas(windowWidth*4/5,700);
	inconsolata = loadFont('montserrat/Montserrat-Regular.otf');
	
	cvpos = cnv.position();
	date = Object.keys(vxx);
	vxx_plot = new Plot("VXX", vxx, [100, width-100], [0, height], 100);
	
	//vxx_slider = createSlider(1, date.length-1, date.length-1);
	
	num_val = dji_date.length-1;

	//buttons
	alltime = createButton("All Time");
	alltime.mousePressed(_atime);
	month_ = createButton("1 Month");
	month_.mousePressed(_month);
	threemonths = createButton("3 Months");
	threemonths.mousePressed(_3month);
	year_ = createButton("1 Year");
	year_.mousePressed(_year);
	fiveyear = createButton("5 Years");
	fiveyear.mousePressed(_5year);
	tenyear = createButton("10 Years");
	tenyear.mousePressed(_10year);

	buttons = [alltime, month_, threemonths, year_, fiveyear, tenyear];

	//length of data is 5045, limit to 500 ~~ 10%, go up by 1% on slider which is 50
	vxx_item_slider = createSlider(100, 500, 250, 50);
}

function draw() {
	background(255);

	var buttonsep = width/100; //relative
	var dist = 0;
	for(var i=0; i < buttons.length; i++){
		buttons[i].position(cvpos.x +25 + dist, cvpos.y + 50);
		dist += buttons[i].size().width + buttonsep;
	}

	vxx_item_slider.position(cvpos.x + 25, cvpos.y + 100);

	vxx_plot.drawPlot(num_val, vxx_item_slider.value());
	if(mouseX > 100 && mouseX < width-100 && mouseY>cvpos.y){
		vxx_plot.drawCursor(num_val, dji_item_slider.value());
	}

	textSize(16);
	textFont(inconsolata);
	stroke(0);
	strokeWeight(0.1);
	text("Date Range: " + date[vxx_plot.lowerbound] + " to Today", 25, 35);
	text("Data Points Shown: " + vxx_item_slider.value()/50 + "%", 25, 95);
	//vxx_plot.drawPlot(vxx_slider.value()/100);

}

//button funccs
function _atime(){
	num_val = dji_date.length-1; 
}

function _month(){
	num_val = 31;
}

function _3month(){
	num_val = 93;
}

function _year(){
	num_val = 365;
}

function _5year(){
	num_val = 365*5;
}

function _10year(){
	num_val = 3650;
}