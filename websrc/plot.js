let dji;
let vxx;

let dji_dates;
let vxx_dates;

let inconsolata;

let djiSlider;
let vxxSlider;

let w = 1000;
let h = 700;

let numVal = 300;

function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
    createCanvas(1000,700);
    dji_dates = Object.keys(dji);
    vxx_dates = Object.keys(vxx);
    
    inconsolata = loadFont('montserrat/Montserrat-Regular.otf');
    
    djiSlider = createSlider(100, dji_dates.length-1, 300);
    djiSlider.position(width/4+w/20, h/3);
    djiSlider.style('width', '80px');
    
    vxxSlider = createSlider(100, vxx_dates.length-1, 300);
    vxxSlider.position(w/20, h/2);
    vxxSlider.style('width', '80px');
}

function draw() {
    background(255);
    drawDJIpred( Math.round(djiSlider.value()/numVal));
    drawDJIPointer( Math.round(djiSlider.value()/numVal));
    drawVXXpred(vxxSlider.value(), 100);
    drawVXXPointer(vxxSlider.value(), 100);
    stroke(0);
    strokeWeight(10);
    line(0,height/2, width,height/2);
}

function drawDJIpred(lim) {
    //var y_max = Math.max.apply(Math, subslice(dji, dji_dates.length-lim, dji_dates.length))+20000;
    var y_max = 40000;
    console.log(lim)
    for(var i=dji_dates.length-1; i > dji_dates.length-numVal; i-= lim){
        stroke(0,155,0);
        strokeWeight(1);
        
        var line_x1 = map(i-lim, dji_dates.length-numVal, dji_dates.length-1, 0, width);
        var line_x2 = map(i,dji_dates.length-numVal, dji_dates.length-1, 0, width);
        
        line( line_x1, map(dji[dji_dates[i-lim]], 0,y_max, height/2, 0), line_x2, map(dji[dji_dates[i]], 0,y_max, height/2, 0));

    }
    
    fill(47,96,162);
    stroke(0);
    textSize(10);
    textFont(inconsolata)
    text(dji_dates[dji_dates.length-1], width-70, height/2 - height/20);
    text(dji_dates[dji_dates.length-numVal], 20, height/2 - height/20);
    
    fill(47,96,162);
    stroke(0);
    textSize(45);
    textFont(inconsolata)
    text("Dow Jones", width/20, height/10);
}

function drawVXXpred(lim, y_max) {
    stroke(0,155,0);
    strokeWeight(1);
    for(var i=vxx_dates.length-1; i > vxx_dates.length-lim; i--){
        var line_x1 = map(i-1, vxx_dates.length-lim, vxx_dates.length-1, 0, width);
        var line_x2 = map(i, vxx_dates.length-lim, vxx_dates.length-1, 0, width);
        line( line_x1, map(vxx[vxx_dates[i-1]], 0,y_max, height, height/2), line_x2, map(vxx[vxx_dates[i]], 0,y_max, height, height/2));
        //line( (i-1)*width/lim, map(vxx[vxx_dates[i-1]], 0,y_max, height, height/2), i*width/lim, map(vxx[vxx_dates[i]], 0,y_max, height, height/2));
    }
    
    fill(47,96,162);
    stroke(0);
    textSize(45);
    textFont(inconsolata)
    text("Volatility Index: VXX", width/20, height/10 + height/2);
    
}

function drawDJIPointer(lim) {
    var y_max = 40000;
    if (mouseX < width && mouseX > 0){
        //var y = map(dji[dji_dates[Math.round(mouseX * lim/width)]], 0, y_max, height/2, 0);x
        var dji_val = dji[dji_dates[ Math.round(map(mouseX, 0, width, dji_dates.length-lim, dji_dates.length))]];
        var y = map( dji_val, 0, y_max, height/2, 0);
        fill(255,0,0);
        ellipse(mouseX, y, 10,10);
    }
    
}

function drawVXXPointer(lim, y_max) {
    if (mouseX < width && mouseX > 0){
        var vxx_val = vxx[vxx_dates[ Math.round(map(mouseX, 0, width, vxx_dates.length-lim, vxx_dates.length))]];
        var y = map( vxx_val, 0, y_max, height, height/2);
        fill(255,0,0);
        ellipse(mouseX, y, 10,10);
    }
}

function subslice(arr, x, y){
    var a = [];
    for (var i=x; i < y; i++){a.push(arr[dji_dates[x]]);}
    return a;
}

function mean(arr){
    var x = 0;
    for(var i=0; i < arr.length; i++){x += arr[i];}
    return x/arr.length;
}