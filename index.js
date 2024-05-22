function r(f) {
    /in/.test(document.readyState) ? setTimeout('r(' + f + ')', 9) : f()
}
r(function () {
    document.documentElement.style.setProperty('--coverOpacity', '0');
});

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}

var wasDragged = false;
var lastx = 0;
var lasty = 0;

var growing = false;

var currentParticleColor = [0, 0, 0];
var currentBGColor = [255, 255, 255];

function convertHex(hex) {
    // handle shorthand
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    // parsing master
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function normalTheme() {
    currentParticleColor = [0, 0, 0];
    currentBGColor = [255, 255, 255];
    document.documentElement.style.setProperty('--BGFill', '#ffffff');
    document.documentElement.style.setProperty('--logoFill', '#000');
    document.documentElement.style.setProperty('--UIFill', '#000');
    document.documentElement.style.setProperty('--altFill', '#000');
}

function filmHover() {
    currentParticleColor = convertHex('d81a49');
    currentBGColor = convertHex('030009');
    // currentAltColor = [ 35,207,176 ];
    document.documentElement.style.setProperty('--BGFill', '#030009');
    document.documentElement.style.setProperty('--logoFill', '#b0145a');
    document.documentElement.style.setProperty('--UIFill', '#b0145a');
    // document.documentElement.style.setProperty('--UIFill', 'rgb(' + currentAltColor[0] + ',' + currentAltColor[1] + ',' + currentAltColor[2] + ')');
    document.documentElement.style.setProperty('--altFill', '#fff');
}

function codeHover() {
    currentParticleColor = convertHex('c0636c');
    currentBGColor = convertHex('4b233e');

    document.documentElement.style.setProperty('--BGFill', '#4b233e');

    document.documentElement.style.setProperty('--logoFill', '#e6cec2');
    // document.documentElement.style.setProperty('--UIFill', 'rgb(255,102,206)');
    document.documentElement.style.setProperty('--UIFill', '#e6cec2');
    document.documentElement.style.setProperty('--altFill', '#c0636c');
}

function musicHover() {
    currentParticleColor = [175, 195, 255];
    // currentBGColor = [ 28,56,28 ];
    // currentBGColor = [ 50,22,31 ];
    currentBGColor = convertHex('185738');

    document.documentElement.style.setProperty('--BGFill', '#185738');

    document.documentElement.style.setProperty('--logoFill', '#b9ba6c');
    // document.documentElement.style.setProperty('--UIFill', 'rgb(255,102,206)');
    document.documentElement.style.setProperty('--UIFill', '#b9ba6c');
    document.documentElement.style.setProperty('--altFill', '#b3ae88');
}
//function tiaraHover(){
//    currentParticleColor = [175,195,255];
//    currentBGColor = [ 47,45,66 ];
//    document.documentElement.style.setProperty('--BGFill', '#2f2d42');
//    document.documentElement.style.setProperty('--logoFill', 'rgb(217,212,219)');
//    document.documentElement.style.setProperty('--UIFill', 'rgb(217,212,219)');
//    document.documentElement.style.setProperty('--altFill', '#acaab5');
//}
//
//function rockHover(){
//    currentParticleColor = [74,200,74];
//    // currentBGColor = [ 28,56,28 ];
//    // currentBGColor = [ 50,22,31 ];
//    currentBGColor = [ 74,51,37 ];
//
//    document.documentElement.style.setProperty('--BGFill', '#4a3325');
//
//    document.documentElement.style.setProperty('--logoFill', '#fff');
//    document.documentElement.style.setProperty('--UIFill', 'rgb(243,202,146)');
//    document.documentElement.style.setProperty('--altFill', '#fff');
//}
//
//function mittsHover(){
//    currentParticleColor = [254,124,4];
//    // currentBGColor = [ 28,56,28 ];
//    // currentBGColor = [ 50,22,31 ];
//    currentBGColor = [ 20,20,20 ];
//
//    document.documentElement.style.setProperty('--BGFill', '#141414');
//
//    document.documentElement.style.setProperty('--logoFill', 'rgb(90,90,90)');
//    // document.documentElement.style.setProperty('--UIFill', 'rgb(255,102,206)');
//    document.documentElement.style.setProperty('--UIFill', 'rgb(254,124,4)');
//    document.documentElement.style.setProperty('--altFill', 'rgb(90,90,90)');
//}
//
//function mcHover(){
//    currentParticleColor = convertHex('5c7241');
//    // currentBGColor = [ 28,56,28 ];
//    // currentBGColor = [ 50,22,31 ];
//    currentBGColor = convertHex('185738');
//
//    document.documentElement.style.setProperty('--BGFill', '#185738');
//
//    document.documentElement.style.setProperty('--logoFill', '#b9ba6c');
//    // document.documentElement.style.setProperty('--UIFill', 'rgb(255,102,206)');
//    document.documentElement.style.setProperty('--UIFill', '#b9ba6c');
//    document.documentElement.style.setProperty('--altFill', '#b3ae88');
//}
//
//function pepperHover(){
//    currentParticleColor = convertHex('c0636c');
//    currentBGColor = convertHex('4b233e');
//
//    document.documentElement.style.setProperty('--BGFill', '#4b233e');
//
//    document.documentElement.style.setProperty('--logoFill', '#e6cec2');
//    // document.documentElement.style.setProperty('--UIFill', 'rgb(255,102,206)');
//    document.documentElement.style.setProperty('--UIFill', '#e6cec2');
//    document.documentElement.style.setProperty('--altFill', '#c0636c');
//}

function toggleGrowing() {
    growing = !growing;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    document.getElementById("defaultCanvas0").onmouseup = function () {
        if (lastx == event.clientX && lasty == event.clientY) {
            wasDragged = false;
        }
        if (!wasDragged) {
            randomizeScheme();
        }
        wasDragged = false;
        document.getElementById("defaultCanvas0").style.cursor = "auto";
    }

    window.scrollTo(0, 0);

    /*
    eventFire(document.getElementById('defaultCanvas0'), 'click');
    normalTheme();
    window.scrollTo(0,0);
    */

}

function draw() {
    background(currentBGColor[0], currentBGColor[1], currentBGColor[2]);

    orbitControl();

    rotateY(frameCount * 0.002);
    rotateX(frameCount * 0.0015);

    // pointLight(255, 255, 255, 0, 0, 3030);
    // pointLight(255, 255, 255, 500, 0, 20540);

    for (let j = -12; j < 12; j++) {
        push();
        for (let i = 0; i < 50; i++) {
            translate(
                cos(frameCount * 0.00001 + j) * 200,
                sin(frameCount * 0.0001 + j) * 200,
                j * 20
            );
            rotateZ(frameCount * 0.0001);
            push();
            noStroke();
            fill(currentParticleColor[0], currentParticleColor[1], currentParticleColor[2]);
            sphere(10, 10);
            pop();
        }
        pop();
    }
    if (frameCount > 4700) {
        growing = false;
    } else if (frameCount < -4700) {
        growing = true;
    }
    if (!growing) {
        frameCount -= 2;
    }

    // window.scrollTo(0,0);

}

function randomizeScheme() {
    var scheme = new ColorScheme;
    var typesArr = ['mono', 'contrast', 'triade', 'tetrade']
    var variArr = ['default', 'soft', 'hard']
    scheme.from_hue(Math.floor(Math.random() * 360))
        .scheme(typesArr[Math.floor(Math.random() * typesArr.length)])
        .variation(variArr[Math.floor(Math.random() * variArr.length)]);

    var colors = scheme.colors();

    console.log(scheme.colors());

    var indexArr = [0, 1, 2, 3];
    indexArr = shuffle(indexArr);

    var newColors = [];

    for (var x in colors) {
        newColors.push(convertHex(colors[x]));
    }

    var logoIndex = Math.floor(Math.random() * 4) + 2;
    if (logoIndex == 3) {
        logoIndex = 0;
    } else if (logoIndex >= 4) {
        logoIndex = 2;
    }

    var tempbg = convertHex(colors[3]);
    document.documentElement.style.setProperty('--logoFill', 'rgb(' + newColors[indexArr[logoIndex]][0] + ',' + newColors[indexArr[logoIndex]][1] + ',' + newColors[indexArr[logoIndex]][2] + ')');
    document.documentElement.style.setProperty('--UIFill', 'rgb(' + newColors[indexArr[2]][0] + ',' + newColors[indexArr[2]][1] + ',' + newColors[indexArr[2]][2] + ')');
    document.documentElement.style.setProperty('--altFill', 'rgb(' + newColors[indexArr[0]][0] + ',' + newColors[indexArr[0]][1] + ',' + newColors[indexArr[0]][2] + ')');
    currentParticleColor = [newColors[indexArr[1]][0], newColors[indexArr[1]][1], newColors[indexArr[1]][2]];
    currentBGColor = [newColors[indexArr[3]][0], newColors[indexArr[3]][1], newColors[indexArr[3]][2]];

    document.documentElement.style.setProperty('--BGFill', 'rgb(' + newColors[indexArr[3]][0] + ',' + newColors[indexArr[3]][1] + ',' + newColors[indexArr[3]][2] + ')');
}

window.addEventListener("keydown", function (e) {
    randomizeScheme();
});

function preventBehavior(e) {
    e.preventDefault();
};


var infoOpen = false;

function toggleInfo() {
    if (infoOpen) {
        document.getElementById("WRAPPER").style.left = "0vw";
        infoOpen = false;
    } else {
        document.getElementById("WRAPPER").style.left = "27.5vw";
        infoOpen = true;
    }
}

document.addEventListener("touchmove", preventBehavior, {
    passive: false
});

document.addEventListener("mousedown", function (event) {
    wasDragged = true;
    lastx = event.clientX;
    lasty = event.clientY;
    document.getElementById("defaultCanvas0").style.cursor = "grabbing";
}, false);

/*
document.addEventListener("touchstart", function(event) {
    randomizeScheme();
}, false);
*/