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

function codeHover() {
    randomizeScheme();
}

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

}

function draw() {
    background(currentBGColor[0], currentBGColor[1], currentBGColor[2]);

    orbitControl();

    rotateY(frameCount * 0.002);
    rotateX(frameCount * 0.0015);

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
    toggleGrowing();
});

document.getElementById("codebig").addEventListener("click", function() {
    toggleGrowing();
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