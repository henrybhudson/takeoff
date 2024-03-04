function drawStar() {

    const canvas = document.getElementById("star");

    if (canvas.getContext) {

        const ctx = canvas.getContext("2d");

        const star_colours = ["#9db4ff", "#a2b9ff", "#a7bcff", "#aabfff", "#afc3ff", "#baccff", "#c0d1ff", "#cad8ff", "#e4e8ff", "#edeeff", "#fbf8ff", "#fff9f9", "#fff5ec", "#fff4e8", "#fff1df", "#ffebd1", "#ffd7ae", "#ffc690", "#ffbe7f", "#ffbb7b", "#ffbb7b", "#ffc100", "#ff9a00", "#ff7400"];
        var colour = star_colours[Math.floor(Math.random() * star_colours.length)];

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //set the center of the canvas as the center of the planet
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        //generate random radius between 35 and 70
        const radius = Math.floor(Math.random() * (70 - 35 + 1)) + 35;

        //create a radial gradient
        //https://www.w3schools.com/jsref/canvas_createradialgradient.asp
        const grd = ctx.createRadialGradient(centerX, centerY, radius / 2, centerX, centerY, radius);
        grd.addColorStop(0, colour);
        grd.addColorStop(0.5, "transparent");

        ctx.beginPath();
        //outer circle
        ctx.arc(75, 75, radius, 0, Math.PI * 2, true);
        //fill with gradient
        ctx.fillStyle = grd;
        ctx.fill();

    }
}


function drawMoon() {

    const canvas = document.getElementById("moon");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        moon_colours = ["#b3b3b3", "#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373"]
        colour = moon_colours[Math.floor(Math.random() * moon_colours.length)];

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //set the center of the canvas as the center of the planet
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        //generate random radius between 35 and 70
        const radius = Math.floor(Math.random() * (70 - 35 + 1)) + 35;

        //function to create a texture pattern
        function createTexture(radius) {
            var textureCanvas = document.createElement('canvas');
            var textureCtx = textureCanvas.getContext('2d');
            textureCanvas.width = radius * 5;
            textureCanvas.height = radius * 5;

            //draw texture pattern (e.g., noise)
            textureCtx.fillStyle = colour;
            textureCtx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
            textureCtx.fillStyle = "#585858";

            for (var i = 0; i < 200; i++) {
                var x = Math.random() * textureCanvas.width;
                var y = Math.random() * textureCanvas.height;
                var texture_radius = Math.random() * 10;
                textureCtx.beginPath();
                textureCtx.arc(x, y, texture_radius, 0, Math.PI * 2);
                textureCtx.fill();
            }

            return ctx.createPattern(textureCanvas, 'repeat');
        }

        //create a texture pattern
        var texture = createTexture(radius);

        ctx.beginPath();
        //outer circle
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.strokeStyle = "black";
        ctx.stroke();
        //fill with gradient
        ctx.fillStyle = texture;
        ctx.fill();
    }
}


function drawPlanet() {

    const canvas = document.getElementById("planet");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        planet_colours = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "white", "grey", "brown"]
        colour = planet_colours[Math.floor(Math.random() * planet_colours.length)];

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //generate random radius between 35 and 70
        const radius = Math.floor(Math.random() * (70 - 35 + 1)) + 35;


        //create a radial gradient
        //https://www.w3schools.com/jsref/canvas_createradialgradient.asp
        const grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, radius - 2.5, canvas.width / 2, canvas.height / 2, radius);
        grd.addColorStop(0, colour);
        grd.addColorStop(1, "transparent");

        ctx.beginPath();
        //outer circle
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        //fill with gradient
        ctx.fillStyle = grd;
        ctx.fill();
    }
}


function drawTest() {
    var canvas = document.getElementById('test');
    var ctx = canvas.getContext('2d');

    function mkGradient(opts) {
        opts.ctx.rect(0, 0, opts.r2 * 2, opts.r2 * 2);

        var g = opts.ctx.createRadialGradient(opts.x || opts.r2, opts.x || opts.r2, opts.r1, opts.x || opts.r2, opts.x || opts.r2, opts.r2);

        g.addColorStop(0, opts.c1);
        g.addColorStop(1, opts.c2);


        opts.ctx.fillStyle = g;
        opts.ctx.fill();
    }

    var seede = 999;
    var lastVal = 2;
    var pRand = function () {
        var thisVal = String(Math.round(Math.pow(seede++, lastVal)));
        lastVal = (Number(thisVal.substr(-1, 1)) + Number(thisVal.substr(1, 1))) / 2;
        if (isNaN(lastVal)) {
            lastVal = 2;
        }
        return Math.abs(Math.sin(thisVal));
    }


    function mkPlanet(opts) {
        var pad = 1.8;
        seede = 1999889;
        var canvas = document.createElement('canvas');
        canvas.width = opts.r * (pad * 2);
        canvas.height = opts.r * (pad * 2);
        var ctx = canvas.getContext('2d');

        // Halo
        mkGradient({
            ctx: ctx,
            r1: opts.r,
            r2: opts.r * pad,
            c1: opts.h1,
            c2: opts.h2
        });

        // Translate to edge of halo.
        var offset = opts.r * pad - opts.r;
        ctx.translate(offset, offset);

        ctx.save();
        /// Create planet outline clip
        ctx.beginPath();
        ctx.arc(opts.r, opts.r, opts.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();

        // Fill the ocean
        mkGradient({
            ctx: ctx,
            r1: 0,
            r2: opts.r,
            c1: opts.o2,
            c2: opts.o1
        });

        // Add some continents
        for (var i = 0; i < opts.r * 10; i++) {
            ctx.globalAlpha = pRand() * .8;
            var x = pRand() * opts.r * 2;
            var y = pRand() * opts.r * 2
            ctx.beginPath();
            ctx.arc(x, y, pRand() * (opts.r / 10), 0, 2 * Math.PI);
            ctx.fillStyle = i > opts.r / 2 ? opts.c3 : opts.c2;
            ctx.fill();
        }


        ctx.globalAlpha = 1;
        // Add some atmosphere
        mkGradient({
            ctx: ctx,
            r1: opts.r / 2,
            r2: opts.r,
            c1: 'rgba(255,255,255,0)',
            c2: 'rgba(255,255,255,.5)'
        });


        if (!opts.radiant) {
            mkGradient({
                ctx: ctx,
                r1: opts.r * 1.3,
                r2: opts.r * 2,
                c1: 'rgba(0,0,0,0)',
                c2: 'rgba(0,0,0,.8)',
                x: -opts.r / 8
            });
        }

        ctx.restore();


        // Rings
        for (var i = 0; i < 100; i++) {
            ctx.globalAlpha = .5;
            var seed = i * i + opts.time / 100;
            var sinPt = Math.sin(seed);
            var y = opts.r + pRand() * opts.r / 5;
            var x = opts.r + sinPt * (opts.r * (pad * 0.75));
            var size = (Math.sin(i) + 1) * (opts.r / 100);
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fillStyle = sinPt < .75 && sinPt > -0.75 ? '#00f' : '#0f0';
            ctx.fill();
        }
        return canvas;
    }


    var p = 3;
    function drawFrame() {
        var sun = mkPlanet({
            r: 75,
            o1: '#FFF500',
            o2: '#FFE300',
            c2: '#FFC700',
            c3: '#FFAF00',
            h1: 'rgba(255,122,0,1)',
            h2: 'rgba(255,12,0,0)',
            radiant: false,
            time: p++
        });

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sun, 0, 0);
        requestAnimationFrame(drawFrame);
    }

    drawFrame();
}

function drawPlanet2() {
    // Get the canvas element
    var canvas = document.getElementById("planet");

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        planet_colours = ["#2E8B57", "#8B4513", "#D2B48C", "#778899", "#800080", "#8B0000", "#CD853F", "#ADD8E6", "#D8BFD8"]
        colour = planet_colours[Math.floor(Math.random() * planet_colours.length)];

        //clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //set the center of the canvas as the center of the planet
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        //generate random radius between 35 and 70
        const radius = Math.floor(Math.random() * (70 - 35 + 1)) + 35;

        //create a radial gradient
        //https://www.w3schools.com/jsref/canvas_createradialgradient.asp
        const grd = ctx.createRadialGradient(centerX, centerY, radius - (radius / 6), centerX, centerY, radius);
        grd.addColorStop(0, colour);
        grd.addColorStop(0.3, "rgb(0, 0, 0, 0.1)");

        //function to create a texture pattern
        function createTexture(radius) {
            var textureCanvas = document.createElement('canvas');
            var textureCtx = textureCanvas.getContext('2d');
            textureCanvas.width = radius;
            textureCanvas.height = radius;

            //draw texture pattern (e.g., noise)
            textureCtx.fillStyle = "transparent";
            textureCtx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);
            textureCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            for (var i = 0; i < 200; i++) {
                var x = Math.random() * textureCanvas.width;
                var y = Math.random() * textureCanvas.height;
                var radius = Math.random() * 6;
                textureCtx.beginPath();
                textureCtx.arc(x, y, radius, 0, Math.PI * 2);
                textureCtx.fill();
            }

            return ctx.createPattern(textureCanvas, 'repeat');
        }

        //create a texture pattern
        var texture = createTexture(radius);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.fillStyle = texture;
        ctx.fill();
        ctx.closePath();
    }
}