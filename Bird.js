/*
 * Something that moves in 2D or 3D, avoiding other objects
 * and acting like an acceleration-limited bird.
 */
class Bird
{
	constructor() {
		// for 2d the z term is 0
		this.a_max = createVector(20,20,0);
		this.v_max = createVector(50,50,0);

		this.old = [];
		this.p = createVector(0,0,0);
		this.v = createVector(0,0,0);
		this.a = createVector(0,0,0);
	}

	static limit(x, m)
	{
		if (x.x > m.x)
			x.x = m.x;
		else
		if (x.x < -m.x)
			x.x = -m.x;

		if (x.y > m.y)
			x.y = m.y;
		else
		if (x.y < -m.y)
			x.y = -m.y;

		if (x.z > m.z)
			x.z = m.z;
		else
		if (x.z < -m.z)
			x.z = -m.z;
	}

	move(dt) {
		// limit our maximum acceleration
		Bird.limit(this.a, this.a_max);

		// update our velocity for this time step
		this.v.add(p5.Vector.mult(this.a, dt));

		// limit our maximum velocity
		Bird.limit(this.v, this.v_max);

		this.v.setMag(50);

		// update our position
		this.p.add(p5.Vector.mult(this.v, dt));

		// store our old history
		if (this.old.unshift(this.p.copy()) > 100)
			this.old.pop();
	}
}
