let dji;
let vxx;
function preload() {
    dji = loadJSON('prediction_data/dji_data.json')
    vxx = loadJSON('prediction_data/vxx_data.json')
}

function setup() {
    createCanvas(700,700);
    
}

function draw() {
    background(255);
    drawDJI();
}

function drawDJI() {
    var dates = Object.keys(dji);;
    fill(255,0,0);
    
    var y_max = 100000
    for(var i=1; i < dates.length; i++){
        //console.log(dates[i]);
        //console.log(dji[dates[i]]);
        //console.log("----");
        line( (i+1)*10, 700-map(dji[dates[i-1]], 0,y_max, 0, 700), i*10, 700-map(dji[dates[i]], 0,y_max, 0, 700));
    }
}