/*
 * Serve this directory with:
 * python -mSimpleHTTPServer 8000
 */
let planets;
let fps = 60;
let dist_scale = 0.3e-6; // barely keep neptune on screen
let rad_scale = 1e-3; // mercury will be a few pixels
let step = 100;

function setup()
{
	createCanvas(windowWidth-10, windowHeight-10);
	//createCanvas(windowWidth-10, windowHeight-10, WEBGL);
	background(0);
	frameRate(fps);

	// planet data from https://nssdc.gsfc.nasa.gov/planetary/factsheet/
	let sun = new Body();
	sun.mass = 1.989e30; // kg
	sun.radius = 6960; // 696000; // km
	sun.p.y = 0; // km
	sun.v.x = 0; // km/s

	let mercury = new Body();
	mercury.mass = 3.301e23;
	mercury.radius = 2439.7;
	mercury.p.y = 57.9e6;
	mercury.v.x = 47870;

	let venus = new Body();
	venus.mass = 4.867e24;
	venus.radius = 6051.8;
	venus.p.y = 108.2e6;
	venus.v.x = 35020;

	let earth = new Body();
	earth.mass = 5.972e24;
	earth.radius = 6378.1;
	earth.p.y = 149.6e6;
	earth.v.x = 29780;

	let moon = new Body();
	moon.mass = 7.346e22;
	moon.radius = 1738.1;
	moon.p.y = earth.p.y + 0.363e6;
	moon.v.x = earth.v.x + 1.0;

	let mars = new Body();
	mars.mass = 6.417e23;
	mars.radius = 3396.2;
	mars.p.y = 227.9e6;
	mars.v.x = 24077;

	let jupiter = new Body();
	jupiter.mass = 1.899e27;
	jupiter.radius = 71492;
	jupiter.p.y = 778.6e6;
	jupiter.v.x = 13070;

	let saturn = new Body();
	saturn.mass = 5.685e26;
	saturn.radius = 60268;
	saturn.p.y = 1433.5e6;
	saturn.v.x = 9690;

	let uranus = new Body();
	uranus.mass = 8.682e25;
	uranus.radius = 25559;
	uranus.p.y = 2872.5e6;
	uranus.v.x = 6810;

	let neptune = new Body();
	neptune.mass = 1.024e26;
	neptune.radius = 24764;
	neptune.p.y = 4495.1e6;
	neptune.v.x = 5430;

	planets = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];
}

//function keyReleased() { }
//function keyPressed() { }
//function mousePressed() { }

function update_planets()
{
	for(p of planets)
	{
		p.a = createVector(0,0,0);

		for(p2 of planets)
		{
			if(p2 === p)
				continue;

			p.a.add(p.force(p2));
		}
	}
}

function draw()
{
	update_planets();

	background(0);

	push();
	// translate so that the sun is always at the center
	translate(windowWidth/2, windowHeight/2);
	translate(-planets[0].p.x*dist_scale, -planets[0].p.y*dist_scale);

if(mouseIsPressed) console.log(planets[0]);

	for(p of planets)
	{
		p.move(step);

		noStroke();
		fill(255,0,0);

		ellipse(
			p.p.x * dist_scale,
			p.p.y * dist_scale,
			2 * p.radius * rad_scale,
			2 * p.radius * rad_scale
		);

		stroke(255,255,255);
		strokeWeight(1);

		let ox = p.p.x * dist_scale;
		let oy = p.p.y * dist_scale;
		let bright = 255;

		for(o of p.old)
		{
			let nx = o.x * dist_scale;
			let ny = o.y * dist_scale;

			stroke(bright -= 2);
			line(ox, oy, nx, ny);
			ox = nx;
			oy = ny;
		}
	}

	pop();
}
