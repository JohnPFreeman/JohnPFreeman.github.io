/*
Name: John Freeman
Date: 5/24/2021
Sources: //https://stackoverflow.com/questions/20762079/moving-an-object-towards-a-point-in-javascript
OMH: I have neither given nor recieved any unautherised aid. 
*/

var enemy = []; // enemies
var turret = []; // your turrets and other towers
var money = 125; // your currency
var health = 20; // your health
var wave = 0; // the wave you are on. This also worked as a game state
var waveBegun = false; // tells weather a wave is in progress, or if a new one should be started
var enemiesLeft; // how many enemies are still alive this wave
var enemyType; // a value that is randomised to set the health of the enemy. The value's range increases over time.
var tooClose = false; // tells weather a tower is too close to another tower
var menu; // the menu image
var lost; // the 'you lost' image
var finalWave; // stores the wave you lost at so it can be printed, even if the wave variable is being used as the gamestate -1

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

class Enemy {
  //the objects going down the path
  constructor() {
    this.x = 162.5;
    this.y = 400;
    this.speed = 0.5;
    this.colorR = 0;
    this.colorG = 0;
    this.colorB = 0;
    this.health = 3;
    this.size = 15;
    this.stage = 1;
    this.hitPrev = [];
    this.alive = true;
    this.slow = false;
    this.slowClock = 0;
  }

  show() {
    noStroke();
    fill(this.colorR, this.colorG, this.colorB);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    if (this.stage == 1) {
      // the stages show the segment of the track you are on
      this.y -= this.speed;
      if (this.y <= 212.5) {
        this.y = 212.5;
        this.stage += 1;
      }
    }
    if (this.stage == 2) {
      this.x -= this.speed;
      if (this.x <= 62.5) {
        this.x = 62.5;
        this.stage += 1;
      }
    }
    if (this.stage == 3) {
      this.y -= this.speed;
      if (this.y <= 37.5) {
        this.y = 37.5;
        this.stage += 1;
      }
    }
    if (this.stage == 4) {
      this.x += this.speed;
      if (this.x >= 237.5) {
        this.x = 237.5;
        this.stage += 1;
      }
    }
    if (this.stage == 5) {
      this.y += this.speed;
      if (this.y >= 187.5) {
        this.y = 187.5;
        this.stage += 1;
      }
    }
    if (this.stage == 6) {
      this.x += this.speed;
      if (this.x >= 337.5) {
        this.x = 337.5;
        this.stage += 1;
      }
    }
    if (this.stage == 7) {
      this.y += this.speed;
      if (this.y >= 400) {
        this.y = 400;
        health -= 1;
        enemiesLeft -= 1;
        this.alive = false
        this.stage = 0
      }
    }
  }
}

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

class Turret {
  //the buildings you place
  constructor() {
    this.x;
    this.y;
    this.size = 15;
    this.health = 1;
    this.color1R = 150;
    this.color1G = 150;
    this.color1B = 150;
    this.color2R = 100;
    this.color2G = 100;
    this.color2B = 100;
    this.targetX = 162.5;
    this.targetY = 400;
    this.shootX;
    this.shootY;
    this.xSpeed = 1;
    this.ySpeed = 1;
    this.shootSpeedMod = 3;
    this.rotation;
    this.range = 100;
    this.closestFoe;
    this.type = 1;
  }

  show() {
    fill(this.color1R, this.color1G, this.color1B);
    ellipse(this.x, this.y, this.size, this.size);
    fill(this.color2R, this.color2G, this.color2B);
    this.targetX = enemy[this.closestFoe].x;
    this.targetY = enemy[this.closestFoe].y;
    if (this.x >= this.targetX) {
      //this is what I used my source for
      this.rotation =
        180 + atan((this.targetY - this.y) / (this.targetX - this.x));
    }
    if (this.x < this.targetX) {
      this.rotation = atan((this.targetY - this.y) / (this.targetX - this.x));
    }
    translate(this.x, this.y);
    rotate(this.rotation);
    rect(0, -this.size / 8, this.size, this.size / 4);
    rotate(-this.rotation);
    translate(-this.x, -this.y);
  }

  shoot() {
    if (dist(this.x, this.y, this.targetX, this.targetY) <= this.range) {
      this.xSpeed = cos(this.rotation);
      this.ySpeed = sin(this.rotation);
      this.shootX += this.xSpeed * this.shootSpeedMod;
      this.shootY += this.ySpeed * this.shootSpeedMod;
      fill(0);
      ellipse(this.shootX, this.shootY, this.size / 5, this.size / 5);
    } else {
      this.shootX = this.x;
      this.shootY = this.y;
    }
  }
}

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

//functions

function preload() {
  menu = loadImage("Start Menu.PNG");
  lost = loadImage("You Lost.PNG");
}

function gameOn() {
  //The gameplay
  newWave();
  textSize(12);

  for (var i = 0; i < enemy.length; i++) {
    if (enemy[i].alive == true) {
      enemy[i].show();
      enemy[i].move();
    }
  }

  tooClose = false;

  for (var i = 0; i < turret.length; i++) {
    if (dist(mouseX, mouseY, turret[i].x, turret[i].y) < 25) {
      tooClose = true;
    }

    if (frameCount % 60 == 1) {
      turret[i].shootX = turret[i].x;
      turret[i].shootY = turret[i].y;
    }
    turret[i].closestFoe = 0;
    for (var j = 0; j < enemy.length; j++) {
      if (
        dist(
          turret[i].x,
          turret[i].y,
          enemy[turret[i].closestFoe].x,
          enemy[turret[i].closestFoe].y
        ) > dist(turret[i].x, turret[i].y, enemy[j].x, enemy[j].y)
      ) {
        turret[i].closestFoe = j;
      }
      if (
        dist(enemy[j].x, enemy[j].y, turret[i].shootX, turret[i].shootY) <
          enemy[j].size + turret[i].size / 5 &&
        enemy[j].hitPrev[i] == false
      ) {
        turret[i].shootX = 10000;
        turret[i].shootY = 10000;
        enemy[j].hitPrev[i] = true;
        enemy[j].health -= 1;
        if (turret[i].type == 2) {
          enemy[j].slow = true;
          enemy[j].slowClock = 600; // this is 10 seconds. It felt like the best time while testing
        }
      }
      
      if (
        dist(enemy[j].x, enemy[j].y, turret[i].shootX, turret[i].shootY) >
        enemy[j].size + turret[i].size / 5
      ) {
        enemy[j].hitPrev[i] = false;
      }
    }
    turret[i].show();
    turret[i].shoot();
  }
  for (var i = 0; i < enemy.length; i++) {
    if (enemy[i].slow == true) {
        enemy[i].slowClock -= 1;
        //print(enemy[j].slowClock)
      }
      if (enemy[i].slowClock <= 0) {
        enemy[i].slow = false;
      }
    enemy[i].speed = 0.5 + enemy[i].health * 0.1;
    if (enemy[i].health > 10) {
      enemy[i].speed = .25;
    }
    if (enemy[i].slow == true) {
      enemy[i].speed *= .7;
    }
    if (enemy[i].health > 10) {
      enemy[i].colorR = 120;
      enemy[i].colorG = 120;
      enemy[i].colorB = 120;
      enemy[i].size = 22;
    }
    if (enemy[i].health == 10) {
      enemy[i].colorR = 255;
      enemy[i].colorG = 255;
      enemy[i].colorB = 255;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 9) {
      enemy[i].colorR = 0;
      enemy[i].colorG = 0;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 8) {
      enemy[i].colorR = 175;
      enemy[i].colorG = 0;
      enemy[i].colorB = 255;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 7) {
      enemy[i].colorR = 255;
      enemy[i].colorG = 175;
      enemy[i].colorB = 175;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 6) {
      enemy[i].colorR = 75;
      enemy[i].colorG = 50;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 5) {
      enemy[i].colorR = 255;
      enemy[i].colorG = 150;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 4) {
      enemy[i].colorR = 0;
      enemy[i].colorG = 0;
      enemy[i].colorB = 255;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 3) {
      enemy[i].colorR = 0;
      enemy[i].colorG = 255;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 2) {
      enemy[i].colorR = 255;
      enemy[i].colorG = 255;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 1) {
      enemy[i].colorR = 255;
      enemy[i].colorG = 0;
      enemy[i].colorB = 0;
      enemy[i].size = 15;
    }
    if (enemy[i].health == 0 && enemy[i].alive == true) {
      enemy[i].alive = false;
      money += 2;
      enemiesLeft -= 1;
      enemy[i].x = 10000;
      enemy[i].y = 10000;
    }
    if (enemy[i].health <= 0) {
      enemy[i].health = 0;
    }
  }
  if (health <= 0) {
    finalWave = wave;
    wave = -1;
    health = 20;
    money = 125;
    turret = [];
    enemy = [];
    var slowClock = [];
  }
  if (enemiesLeft == 0) {
    wave += 1;
    enemiesLeft -= 1;
    enemy = [];
    waveBegun = false;
  }
  fill(0);
  text(health + " lives", 345, 10);
  text("$" + money, 355, 25);
  text("Wave " + wave, 350, 40);
}

function loss() {
  image(lost, 0, 0, 400, 400);
  textSize(75);
  text(finalWave, 225, 235);
}

function start() {
  image(menu, 0, 0, 400, 400);
  text("Hold down 1, 2, or 3",275,350)
  text("    to place a tower",275,365)
}

function newWave() {
  if (wave == 1 && waveBegun == false) {
    waveBegun = true;
    enemiesLeft = 0;
    for (var i = 0; i < 8; i++) {
      enemiesLeft++;
      enemy.push(new Enemy());
      enemy[enemy.length - 1].x = 162.5;
      enemy[enemy.length - 1].y = 450 + enemy.length * 25;
      enemy[enemy.length - 1].health = 1;
    }
  }
  if (wave > 1 && waveBegun == false) {
    waveBegun = true;
    enemiesLeft = 0;
    money += 25;
    for (var i = 0; i < 2 * wave + 6; i++) {
      enemiesLeft++;
      enemy.push(new Enemy());
      enemy[enemy.length - 1].x = 162.5;
      enemy[enemy.length - 1].y = 450 + enemy.length * 25;
      enemyType = random(1);
      enemyType *= (wave - 1) * 10;
      enemy[enemy.length - 1].health = 1;
      if (enemyType > 7) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 17.5) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 35) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 60) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 85) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 115) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 160) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 210) {
        enemy[enemy.length - 1].health++;
      }
      if (enemyType > 300) {
        enemy[enemy.length - 1].health++; //these enemyType values are fairly abuitrary. I tried to make them go up exponentually.
      }
      if (enemyType > 375) {
        enemy[enemy.length - 1].health = wave * 5;
      }
    }
  }
}

function backdrop() {
  //this is everything that makes up the background. It used to be in gameOn, but I moved it here to make things neater
  background(0, 150, 50);
  noStroke();
  fill(99, 67, 0);
  rect(150, 225, 25, 175);
  rect(75, 200, 100, 25);
  rect(50, 25, 25, 200);
  rect(50, 25, 175, 25);
  rect(225, 25, 25, 175);
  rect(225, 175, 100, 25);
  rect(325, 175, 25, 225);

  fill(150, 150, 150);
  ellipse(10, 250, 15, 15);
  fill(100, 100, 100);
  rect(10, 248.125, 15, 3.75);
  fill(0);
  text("Turret  $75  Key: 1", 30, 255);

  fill(50, 50, 255);
  ellipse(10, 275, 15, 15);
  fill(0, 0, 175);
  rect(10, 273.125, 15, 3.75);
  fill(0);
  text("Freezer  $125  Key: 2", 30, 280);

  fill(0, 100, 0);
  ellipse(10, 300, 15, 15);
  fill(0, 50, 0);
  rect(10, 298.125, 15, 3.75);
  fill(0);
  text("Sniper  $275  Key: 3", 30, 305);
}

function range() {
  // this is the ring that shows the range
  if (keyCode == 49 && money >= 75 && tooClose == false) {
    noFill();
    strokeWeight(2);
    stroke(0);
    ellipse(mouseX, mouseY, 200);
  }
  if (keyCode == 50 && money >= 125 && tooClose == false) {
    noFill();
    strokeWeight(2);
    stroke(0);
    ellipse(mouseX, mouseY, 150);
  }
  if (keyCode == 51 && money >= 275 && tooClose == false) {
    noFill();
    strokeWeight(2);
    stroke(0);
    ellipse(mouseX, mouseY, 800);
  }
}

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  textSize(12);
}

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

function draw() {
  if (wave >= 1) {
    backdrop();
    gameOn();
    range();
  }
  if (wave == -1) {
    loss();
  }
  if (wave == 0) {
    start();
  }
}

////////////////////////////////////////////////////////////
//--------------------------------------------------------//
////////////////////////////////////////////////////////////

function keyPressed() {
  //print(key, keyCode);
  if (keyCode == 32) {
    if (wave == 0) {
      wave = 1;
      waveBegun = false;
    }
    if (wave == -1) {
      wave = 0;
    }
  }
}

function keyReleased() {
  //I used 'released' so you can hold it down to see range
  if (keyCode == 49 && money >= 75 && tooClose == false) {
    money -= 75;
    turret.push(new Turret());
    turret[turret.length - 1].x = mouseX;
    turret[turret.length - 1].y = mouseY;
    turret[turret.length - 1].shootX = mouseX;
    turret[turret.length - 1].shootY = mouseY;
  }
  if (keyCode == 50 && money >= 125 && tooClose == false) {
    money -= 125;
    turret.push(new Turret());
    turret[turret.length - 1].x = mouseX;
    turret[turret.length - 1].y = mouseY;
    turret[turret.length - 1].shootX = mouseX;
    turret[turret.length - 1].shootY = mouseY;
    turret[turret.length - 1].color1R = 50;
    turret[turret.length - 1].color1G = 50;
    turret[turret.length - 1].color1B = 255;
    turret[turret.length - 1].color2R = 0;
    turret[turret.length - 1].color2G = 0;
    turret[turret.length - 1].color2B = 175;
    turret[turret.length - 1].range = 75;
    turret[turret.length - 1].type = 2;
  }
  if (keyCode == 51 && money >= 275 && tooClose == false) {
    money -= 275;
    turret.push(new Turret());
    turret[turret.length - 1].x = mouseX;
    turret[turret.length - 1].y = mouseY;
    turret[turret.length - 1].shootX = mouseX;
    turret[turret.length - 1].shootY = mouseY;
    turret[turret.length - 1].color1R = 0;
    turret[turret.length - 1].color1G = 100;
    turret[turret.length - 1].color1B = 0;
    turret[turret.length - 1].color2R = 0;
    turret[turret.length - 1].color2G = 50;
    turret[turret.length - 1].color2B = 0;
    turret[turret.length - 1].range = 400;
    turret[turret.length - 1].type = 3;
    turret[turret.length - 1].shootSpeedMod = 25;
  }
  keyCode = 1;
}

/*
Feedback

Friend: make freezers cheaper (I did)
Fellow Advisee: Add Boss enemies (I might over the summer, don't have the time now)
*/
