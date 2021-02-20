let dji;
let vxx;
let dji_dates;
let vxx_dates;
let inconsolata;
let djiSlider;
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
    djiSlider.position(width/20+235 , height/7+110);
    djiSlider.style('width', '80px');
}

function draw() {
    background(255);
    drawDJIpred(djiSlider.value());
    drawDJIPointer(djiSlider.value());
    drawVXXpred(500, 100);
    drawVXXPointer(500, 100);
    stroke(0);
    strokeWeight(10);
    line(0,height/2, width,height/2);
}

function drawDJIpred(lim) {
    //var y_max = Math.max.apply(Math, subslice(dji, dji_dates.length-lim, dji_dates.length))+20000;
    var y_max = 40000;
    for(var i=dji_dates.length-1; i > dji_dates.length-lim; i--){
        stroke(0,155,0);
        strokeWeight(1);
        
        var line_x1 = map(i-1, dji_dates.length-lim, dji_dates.length-1, 0, width);
        var line_x2 = map(i,dji_dates.length-lim, dji_dates.length-1, 0, width);
        
        line( line_x1, map(dji[dji_dates[i-1]], 0,y_max, height/2, 0), line_x2, map(dji[dji_dates[i]], 0,y_max, height/2, 0));

    }
    
    fill(47,96,162);
    stroke(0);
    textSize(10);
    textFont(inconsolata)
    text(dji_dates[dji_dates.length-lim], width-70, height/2 - height/20);
    
    fill(47,96,162);
    stroke(0);
    textSize(45);
    textFont(inconsolata)
    text("Dow Jones", width/20, height/10);
}

function drawVXXpred(lim, y_max) {
    stroke(0,155,0);
    strokeWeight(1);
    for(var i=1; i < lim; i++){
        line( (i-1)*width/lim, map(vxx[vxx_dates[i-1]], 0,y_max, height, height/2), i*width/lim, map(vxx[vxx_dates[i]], 0,y_max, height, height/2));
    }
    
}

function drawDJIPointer(lim) {
    var y_max = 40000;
    if (mouseX < width && mouseX > 0){
        //var y = map(dji[dji_dates[Math.round(mouseX * lim/width)]], 0, y_max, height/2, 0);x
        var dji_val = dji[dji_dates[ Math.round(map(mouseX, 0, width, dji_dates.length-lim, dji_dates.length))]];
        var y = map( dji_val, 0, y_max, height/2, 0);
        console.log(y);
        fill(255,0,0);
        ellipse(mouseX, y, 10,10);
    }
    
    fill(47,96,162);
    stroke(0);
    textSize(45);
    textFont(inconsolata)
    text("Volatility Index: VXX", width/20, height/10 + height/2);
}

function drawVXXPointer(lim, y_max) {
    if (mouseX < width && mouseX > 0){
        var y = map(vxx[vxx_dates[Math.round(mouseX * lim/width)]], 0, y_max, height, height/2);
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