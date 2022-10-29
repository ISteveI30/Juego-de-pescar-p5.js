//canvas
const WIDTH = 600;
const HEIGHT = 600;
//rod configuration
var posX = WIDTH / 2; //posicion X
var posY = 25; //posicion Y
var sizeW = 0; //aumento lateral
var rodH = 10; //alto
var rodW = 1; //ancho
var sizeH = 0; //aumento vertical
//fish configuration
var fishWidth = 20; //ancho del pez
var fishHeight = 10; //alto del pez
var animals = [];
//extras
var score = 0;
let img;
let dory;
function preload() {
  img = loadImage("fisherman.png");
  dory = loadImage("nemo.png");
}
function setup() {
  createCanvas(WIDTH, HEIGHT);
  noStroke();
  addFish();
}
function draw() {
  //noLoop()
  fondo();
  bridge(0, 100);
  fisherman(50, 27);
  for (let i = 0; i < animals.length; i++) {
    animals[i].draw();
    if (animals[i].catch === true) {
      animals.splice(i, 1);
      score++;
    }
  }

  textSize(22);
  fill(/*243, 156, 18*/ 10);
  text("Puntaje: " + score, WIDTH - 180, 50);
  image(dory, WIDTH - 70, 25, 50, 45);
  rod(posX, sizeW, posY, rodW, rodH, sizeH);
  moveRod();
  //console.log("array: " + animals.length);
  //console.log('tamaño: '+size);
  //console.log("x r: " + (posX + sizeW));
  //console.log("Y r: " + (posY + sizeH));
}
function fondo() {
  fill(15, 212, 203);
  rect(0, 0, WIDTH, 100);
  fill(56, 132, 207);
  //15,212,203
  //56,132,207
  //103,210,158
  rect(0, 100, WIDTH, HEIGHT);
}
function bridge(x, y) {
  fill("brown");
  rect(x, y, 150, 10);
}

function fisherman(x, y) {
  image(img, x, y, 80, 80);
}

function rod(posX, sizeW, posY, rodW, rodH, sizeH) {
  fill(1);
  rect(posX + sizeW, posY, rodW, rodH + sizeH);
  //rect(80, 75, posX+sizeW, posY);
  quad(80, 75, posX + sizeW, posY, posX + sizeW, posY + 1, 80, 78);
}

function moveRod() {
  let a = 2; //aumento vertical de la caña
  var rx = 3; //aumento horizontal
  if (keyIsPressed == true) {
    if (keyCode === DOWN_ARROW) {
      sizeH += a;
    } else if (keyCode === UP_ARROW) {
      sizeH > 0 ? (sizeH += -a) : (sizeH += 0);
    }
    if (keyCode === RIGHT_ARROW) {
      sizeW += rx;
    } else if (keyCode === LEFT_ARROW) {
      sizeW += -rx;
    }
  }
}
function addFish() {
  for (let i = 0; i < 16; i++) {
    animals.push(new Fish());
  }
  console.log("array:" + animals.length);
}
class Fish {
  constructor() {
    this.fishX = Math.floor(random(0, WIDTH - fishWidth * 2));
    this.fishY = Math.floor(random(150, HEIGHT - fishHeight * 2));
    this.dx = 1;
    this.catch = false;
    //this.fishX=40, this.fishY=120
    this.dir = Math.floor(random(2));
  }
  drawRight() {
    fill(39, 71, 144);
    rect(this.fishX, this.fishY, fishWidth, fishHeight);
    triangle(
      this.fishX,
      this.fishY + fishHeight / 2,
      this.fishX - fishHeight,
      this.fishY,
      this.fishX - fishHeight,
      this.fishY + fishHeight
    );
  }
  drawLeft() {
    fill(39, 71, 144);
    rect(this.fishX, this.fishY, fishWidth, fishHeight);
    triangle(
      this.fishX + fishWidth, //centro
      this.fishY + fishHeight / 2,
      this.fishX + fishWidth + fishHeight, //arriba
      this.fishY,
      this.fishX + fishWidth + fishHeight, //abajo
      this.fishY + fishHeight
    );
  }
  draw() {
    this.dir === 0 ? this.drawRight() : this.drawLeft();
    this.move();
    this.colision();
  }
  move() {
    if (this.dir === 0) {
      this.fishX += this.dx;
      if (this.fishX + (fishWidth + fishWidth / 2) >= WIDTH) this.dir = 1;
    } else {
      this.fishX += -this.dx;
      if (this.fishX - fishWidth / 2 <= 0) this.dir = 0;
    }
  }
  colision() {
    //la caña debe de tocar el rectangulo
    if (
      posY + sizeH + rodH >= this.fishY &&
      posY + sizeH + rodH <= this.fishY + fishHeight &&
      posX + sizeW >= this.fishX &&
      posX + sizeW + rodW <= this.fishX + fishWidth
    ) {
      console.log("atrapado");
      this.fishX = posX - fishWidth / 2 + sizeW;
      this.fishY = posY /*- (fishHeight * 1) /1 */+ sizeH;
      this.dx = 0;
      this.fishY <= 110 ? (this.catch = true) : (this.catch = false);
    }
  }
}
