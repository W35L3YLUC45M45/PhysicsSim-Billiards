class Bola {
  constructor(id, type, color) {
    this.id = (id!=undefined)? id : Date.now();
    this.position = createVector(width / 2, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
    this.color = color;
    this.radius = 10;
    this.topSpeed = 15;
    this.cFriction = 0.15;
    this.collisionLoss = 1;
    this.bounceLoss = 0.8;
    this.type = type; //0: white, 1:blue, 2:yellow, 3:black
  }

  applyForce(force) {
    var f = force.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.applyFriction();
    this.checkEdges();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  definePos(pos) {
    this.position = pos;
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyFriction() {
    if (this.velocity.mag() > this.cFriction) {
      let friction = this.velocity.copy();
      friction.mult(-1);
      friction.normalize();
      friction.mult(this.cFriction);
      this.applyForce(friction);
    } else {
      this.velocity = createVector(0, 0);
    }
  }

  collide(others) {
    let first_ball = null;
    others.forEach((other) => {
      if (other.id != this.id) {
        let distance = p5.Vector.sub(other.position, this.position);
        let minDistance = this.radius + other.radius;
        if (distance.mag() < minDistance) {
          //console.log(this.type + " -> " + other.type);
          if(first_ball == null && this.type == 0) first_ball = other.type;
          
          let distanceVect = p5.Vector.sub(other.position, this.position);
          let distanceCorrection = (minDistance - distance.mag()) / 2.0;
          let d = distanceVect.copy();
          let correctionVector = d.normalize().mult(distanceCorrection);

          other.position.add(correctionVector);
          this.position.sub(correctionVector);
          
          let thisVel = this.velocity.mag();
          let otherVel = other.velocity.mag();
          
          let orientation = distance.copy();

          orientation.normalize().mult(thisVel);

          this.applyForce(orientation.copy().mult(-1).mult(0.5));
          other.applyForce(orientation.copy().mult(1).mult(0.5));
        }
      }
    });

    if(first_ball == 3) first_ball = null;
    return first_ball;
  }

  pocket(holes, blackHole){
    let ball_pocket = [false, blackHole];

    holes.forEach((hole) => {
      let distance = p5.Vector.sub(this.position, hole.position);
      let minDistance = hole.radius;
      if (distance.mag() < minDistance) {
        ball_pocket[0] = true;
        if(this.type != 0){
          ball_pocket[1] = hole.opposite;
        }
      }
    });

    return ball_pocket;
  }

  render() {
    stroke(0);
    strokeWeight(1);
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }

  checkEdges() {
    if(this.position.mag() < width*height)
    if (this.position.x + this.radius > width-40) {
      //let currentVelocity = this.velocity.copy();
      this.velocity.x = -this.bounceLoss * this.velocity.x;
      this.position.x = width - this.radius - 40;
    } else if (this.position.x - this.radius < 40) {
      this.velocity.x = -this.bounceLoss * this.velocity.x;
      this.position.x = this.radius + 40;
    }

    if (this.position.y + this.radius > height-40) {
      this.velocity.y = -this.bounceLoss * this.velocity.y;
      this.position.y = height - this.radius - 40;
    } else if (this.position.y - this.radius < 40) {
      this.velocity.y = -this.bounceLoss * this.velocity.y;
      this.position.y = this.radius + 40;
    }
  }
}
