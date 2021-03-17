let dji, dji_date, cvpos, buttons, num_val;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
}

function setup() {
	let cnv = createCanvas(windowWidth*4/5,700);
	inconsolata = loadFont('montserrat/Montserrat-Regular.otf');
	
	cvpos = cnv.position(); //canvas position
	dji_date = Object.keys(dji); //date list
	dji_plot = new Plot("DJI", dji, [100, width-100], [100, height], 40000); //Plot object

	//set to max initially
	num_val = dji_date.length-1;

	//minimum of 100 days max of date length, start at max, increase by 1
	//dji_slider = createSlider(100, dji_date.length-1, dji_date.length-1, 100);

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
	dji_item_slider = createSlider(100, 500, 250, 50);

}

function draw() {
	background(255);

	//dji_slider.position(cvpos.x + 25, cvpos.y + 50);
	var buttonsep = width/100; //relative
	var dist = 0;
	for(var i=0; i < buttons.length; i++){
		buttons[i].position(cvpos.x +25 + dist, cvpos.y + 50);
		dist += buttons[i].size().width + buttonsep;
	}

	dji_item_slider.position(cvpos.x + 25, cvpos.y + 100);

	dji_plot.drawPlot(num_val, dji_item_slider.value());
	if(mouseX > 100 && mouseX < width-100 && mouseY>cvpos.y){
		dji_plot.drawCursor(num_val, dji_item_slider.value());
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