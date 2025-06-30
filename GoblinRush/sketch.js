let DEBUG = false;

let level = 0;

let playerPos = [200, 200];
let weapon = "sword";
let block = false;
let arrowIs = false;
let arrowPos = [];    
let arrowV = [];
let numArrows;
let enemy = []; 
let levelcheck = [];
let enemyleft;

let deaths = 0;
let time;

let pointVec = []; //normalized vector from goblin to mouseaw
let hit = false; //used for checking hitboxes
let swing = 0;

let arrowToken = [];

let tutorialText = [];

let menuPage = "main";

let bg1;
let bg2;
let bg3;
let mainPage;
let blankPage;
let mapLeft;
let mapRight;
let goblinArt;
let winLeft;
let winRight;

let playButton;
let menuButton;
let backButton;


let stickIMG;
let forkIMG;
let shieldIMG;
let bowIMG;
let arrowTokenIMG;
let swordIMG;
let halbardIMG;
let crossbowIMG;

let sliceSND;
let shootSND;
let whooshSND;
let stepSND;
let blockSND;
let splatSND;
let gobSplatSND;
let dryFireSND;

function preload() {
  bg1 = loadImage("JL_Level_ Farmlands.jpg");
  bg2 = loadImage("JL_City.jpg");
  bg3 = loadImage("JL_Castle.png");
  
  blankPage = loadImage("BlankPage.jpg");
  mainPage = loadImage("LogInFINAL.png");
  mapLeft = loadImage("JL_MapLeft.jpg");
  mapRight = loadImage("JL_MapRight.jpg");
  goblinArt = loadImage("JL_TitleArt.png");
  winLeft = loadImage("JL_YouWinLeft.png");
  winRight = loadImage("JL_YouWinRight.png");
  
  playButton = loadImage("PlayButton.png");
  menuButton = loadImage("levelSelectButton.png");
  backButton = loadImage("backButton.png");
   
  stickIMG = loadImage("JL_Stick.png");
  forkIMG = loadImage("JL_Pitchfork.png");
  shieldIMG = loadImage("JL_Shield.png");
  bowIMG = loadImage("JL_Bow.png");
  arrowTokenIMG = loadImage("JL_ArrowToken.png");
  swordIMG = loadImage("JL_Sword.png");
  halbardIMG = loadImage("JL_Halberd.png");
  crossbowIMG = loadImage("JL_Crossbow.png");
  
  sliceSND = loadSound("SND_slice.m4a");
  shootSND = loadSound("SND_shoot.m4a");
  whooshSND = loadSound("SND_whoosh.m4a");
  stepSND = loadSound("SND_footstep.m4a");
  blockSND = loadSound("SND_block.m4a");
  splatSND = loadSound("SND_splat.m4a");
  gobSplatSND = loadSound("SND_gobSplat.m4a");
  dryFireSND = loadSound("SND_dryFire.m4a");
  
}

function setup() {
  createCanvas(500, 400);
  frameRate(30);
  buildLevel(level);
  //background(176, 144, 112);
  
  //console.log(getOutputVolume());
}

function draw() {
  
  pointVec = [mouseX - playerPos[0], mouseY - playerPos[1]];
  pointVec = nor(pointVec); //sets up the vector that points from the player to the mouse, and then normalizes it
  
  if (level != 0 && level != 16){
    gameOn();
  }else if(level == 0) {
    menu(menuPage);
  }
  
}

function gameOn() {
  manageLevel();
  
  block = keyIsDown(32); 
  
  arrowCheck();
  
  player(playerPos, weapon, block);
  
  for (let i = 0; i < enemy.length; i++){
    enemy[i].show();
  }
  
  for (let i = 0; i < arrowToken.length; i++){
    arrowToken[i].show();
    arrowToken[i].update();
  }
  
  
  swordCheck();
}

function keyPressed() {
  if (key == '1' && level != 0){
    weapon = "sword";
  }
  
  if (key == '2' && level != 0){
    weapon = "bow";
  }

}

function mousePressed() {
  
  if (weapon == "sword" && level != 0 && !block){
    swing = -PI/6;
    outputVolume(0.3);
    sliceSND.play();
    sliceSND.jump(0.4);
    
    
  } else if (weapon == "bow" && numArrows == 0 && level != 0 && !block){
    dryFireSND.play();
    dryFireSND.jump(1.1);
  }
  
  if (keyIsDown(46)) {
    level++;
    buildLevel(level);
  }
}
