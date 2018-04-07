/*
 * Serve this directory with:
 * python -mSimpleHTTPServer 8000
 */
let birds;
let dest;
let a_scale = 30;
let fps = 60;

function setup()
{
	createCanvas(windowWidth-10, windowHeight-10);
	//createCanvas(windowWidth-10, windowHeight-10, WEBGL);
	background(0);
	frameRate(fps);

	// create some random birds
	birds = [];
	for(let i = 0 ; i < 40 ; i++)
	{
		let b = new Bird();
		b.p.x = random(windowWidth);
		b.p.y = random(windowHeight);
		birds.push(b);
	}

	dest = createVector(0, 0, 0);
}

//function keyReleased() { }
//function keyPressed() { }
//function mousePressed() { }

function update_birds()
{
	for(b of birds)
	{
		// the main acceleration component is linear to
		// the destination target
		b.a = p5.Vector.sub(dest, b.p).setMag(a_scale);

		// there is an inverse square repelling force to
		// try to avoid crashing together (skip self computation)
		for(b2 of birds)
		{
			if(b2 === b)
				continue;

			let d = p5.Vector.sub(b2.p, b.p);
			let r2 = d.mag();
			b.a.add(d.setMag(-500/r2));
		}
	}
}

function draw()
{
	dest.x = mouseX;
	dest.y = mouseY;
	update_birds();

	background(0);

if(mouseIsPressed) console.log(birds[0]);

	for(b of birds)
	{
		b.move(1.0 / 10);
		noStroke();
		fill(255,0,0);
		ellipse(b.p.x, b.p.y, 8, 8);

		stroke(255,255,255);
		strokeWeight(1);
		let ox = b.p.x;
		let oy = b.p.y;
		let bright = 255;
		for(p of b.old)
		{
			stroke(bright -= 2);
			line(ox, oy, p.x, p.y);
			ox = p.x;
			oy = p.y;
		}
	}

	stroke(255,0,0);
	ellipse(dest.x, dest.y, 5, 5);
}
