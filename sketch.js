let bolas = [];
let origin;
let direction;
let mag;
let users = [];
let manager;
let ballShot;
let holes = [];
let ballTouched;
let firstBall;
let ballPocket;
let blackHole = -1;
let winner = null;

let JSONinfo;

let MAXPOINTS = 7;

function preload(){
  loadJSON("data.json", loadData);
}

function loadData(data){
  console.log(data);

  data.holes.forEach(h => {
    holes.push(new Hole(h.id, h.position, h.opposite));
  });

  data.bolas.forEach(b => {
    bolas.push(new Bola(b.id, b.type, b.color));
    bolas[bolas.length-1].definePos(createVector(b.position[0], b.position[1]));
  });
}

function setup() {
  createCanvas(640, 360);
  rectMode(CORNERS);

  users.push(new User("Player 1"));
  users.push(new User("Player 2"));

  manager = new Manager();

  ballShot = false;
  ballTouched = null;
  firstBall = null;
  ballPocked = null;
}

function draw() {
  background(color("#9dde61"));

  strokeWeight(0);
  fill("#0c6969");
  rect(0, 0, width, 40);
  rect(0, 0, 40, height);
  rect(0, height-40, width, height);
  rect(width-40, 0, width, height);

  if(winner == null){
    fill("#0");
    textSize(24);
    if(manager.turn == 0){
      strokeWeight(5);
    }
    text(users[0].name, 60, 32);
    strokeWeight(0);
    for (let i = 0; i < manager.points[0]; i++) {
      if(manager.ballTypes[0] == 1){
        fill("#F5ABB9");
      } else {
        fill("#5BCFFB");
      }
      rect(160 + 15*i, 15, 170 + 15*i, 25);
    }

    fill("#0");
    if(manager.turn == 1){
      strokeWeight(5);
    }
    text(users[1].name, width/2 + 20, 32);
    strokeWeight(0);
    for (let i = 0; i < manager.points[1]; i++) {
      if(manager.ballTypes[1] == 1){
        fill("#F5ABB9");
      } else {
        fill("#5BCFFB");
      }
      console.log(i);
      rect(width/2 + 120 + 15*i, 15, width/2 + 130 + 15*i, 25);
    }

    holes.forEach((h)=>{
      h.render();
    });

    bolas.forEach((bola)=>{
      ballPocket = bola.pocket(holes, manager.blackHoles[manager.turn]);
      if(ballPocket[0]){
        switch(bola.type){
          case 0: 
            bolas[0].definePos(createVector(width*height,width*height));
            setTimeout(()=>{
              manager.addExtraTurn();
              bolas[0].definePos(createVector(width/2,height/2));
            }, 2000);
            break;
          case 1:
            //color 1
          case 2:
            //color 2
            bolas[bola.id].definePos(createVector(width*height,width*height));
            manager.addPoint(bola.type);
            break;
          case 3:
            //black
            console.log(manager.turn);
            bolas[bola.id].definePos(createVector(width*height,width*height));
            winner = manager.setBlack(MAXPOINTS, ballPocket[1]);
            console.log(winner);
            break;
        }
        manager.blackHoles[manager.turn] = ballPocket[1];
      }
      ballTouched = bola.collide(bolas);
      firstBall = (firstBall == null)? ballTouched : firstBall;

      bola.update();

      bola.render();
    });

    if (mouseIsPressed && !ballShot) {
      let currentMouse = createVector(mouseX, mouseY);
      let billiardPole = currentMouse.copy();
      direction = currentMouse.sub(origin);
      let normDirection = direction.copy().normalize().mult(bolas[0].radius);

      billiardPole.sub(origin).normalize().mult(150);

      fill(0);
      translate(origin);
      strokeWeight(2);
      stroke(125);
      line(0, 0, currentMouse.x, currentMouse.y);

      translate((bolas[0].position).copy().sub(origin).add(normDirection));
      strokeWeight(8);
      stroke(color(43, 29, 20));
      line(0, 0, billiardPole.x, billiardPole.y);

      billiardPole.mult(0.65);

      stroke(color(200, 157, 124));
      line(0, 0, billiardPole.x, billiardPole.y);
    }
  } else {
    fill("#000");
    textSize(48);
    text(users[winner].name + " is the winner!", (width/8), (height/2)+12);
  }
}

function mousePressed() {
  origin = createVector(mouseX, mouseY)
}

function mouseReleased() {
  if(mouseX > 0 && mouseX < width 
    && mouseY > 0 && mouseY < height && !ballShot){
      bolas[0].applyForce(direction.mult(-1*0.2));

      ballShot = true;
      setTimeout(()=>{
        if(firstBall != manager.ballTypes[manager.turn] && manager.ballTypes[manager.turn] != null && manager.points[manager.turn] != MAXPOINTS || firstBall == null) {
          manager.addExtraTurn();
        }
        manager.nextTurn();
        
        ballShot = false;
        firstBall = null;
      }, 3000)
      .catch("Error");
    }
}

