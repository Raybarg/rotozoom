var logo;
var firsttime;
var angle = 0;

function preload() {
    logo = loadImage("assets/raybarg-profiilikuva.png");
}

function setup() {
    createCanvas(800, 600);
    pixelDensity(1);
    firsttime = 1;
}

function draw() {
    DrawLogoEffectPixels();
}

function DrawLogoEffectPixels() {
    if(firsttime) {
        //image(logo, 50,50);
        firsttime = 0;
    }
    logo.loadPixels();
    loadPixels();

    angle++;
    angle %= 360;
    var c = Math.cos(angle * Math.PI / 180);
    var s = Math.sin(angle * Math.PI / 180);
    var destOffs = 0;
    var u = 0;
    var v = 0;
    var srcOffs = 0;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            u = Math.floor((x * c - y * s) * (s + 1));
            v = Math.floor((x * s + y * c) * (s + 1 ) % logo.height);
            while (v < 0) {
                v += logo.height;
            }
            //srcOffs = (u + (v << 8)) << 2;
            srcOffs = (u + v * 1080) << 2;
            pixels[destOffs++] = logo.pixels[srcOffs++];
            pixels[destOffs++] = logo.pixels[srcOffs++];
            pixels[destOffs++] = logo.pixels[srcOffs++];
            pixels[destOffs++] = logo.pixels[srcOffs++];
        }
    }

    /*
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var index2 = ((x+3) + (y+3) * width) * 4;
            var index3 = ((x+3) + (y) * width) * 4;

            pixels[index2+0] -= (pixels[index+0]/50 + pixels[index3+0]/50) / 2;
            pixels[index2+1] -= (pixels[index+1]/50 + pixels[index3+1]/50) / 2;
            pixels[index2+2] += 1;
        }
    }
    */
    updatePixels();    
}

