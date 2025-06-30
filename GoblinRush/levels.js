function buildLevel(lv) {
  //funtion that builds whatever level we're on.
  //console.log(lv);
  enemy = [];
  arrowToken = [];
  tutorialText = [];
  arrowIs = false;
  weapon = "sword";
  
  numArrows = 0;
  playerPos = [250, 300];
  
  switch (lv) {
    case 1:
      //The first parameter is the location, the second is the weapon
      enemy[0] = new Enemy([250, 100], "bow");

      tutorialText[0] = ["WASD to Move Around", 270, 285];
      tutorialText[1] = ["Dodge the Arrows!", 120, 190];
      tutorialText[2] = ["Or use Space to Block Them", 120, 205];
      tutorialText[3] = ["Click to Stab", 270, 95];
      
      break;

    case 2:
      enemy[0] = new Enemy([100, 75], "bow");
      enemy[1] = new Enemy([400, 75], "bow");

      arrowToken[0] = new ArrowToken([250, 250]);

      tutorialText[0] = ["Pick Up to Get an Arrow", 183, 233];
      tutorialText[1] = ["2 Swaps to Bow", 60, 105];
      tutorialText[2] = ["1 Swaps Back", 60, 120];
      
      break;

    case 3:
      enemy[0] = new Enemy([250, 100], "sword");

      tutorialText[0] = ["Pitchforks Bounce", 125, 205];
      tutorialText[1] = ["off Shields", 125, 220];
      
      break;

    case 4:
      enemy[0] = new Enemy([100, 75], "bow");
      enemy[1] = new Enemy([400, 75], "bow");
      enemy[2] = new Enemy([150, 125], "sword");
      enemy[3] = new Enemy([350, 125], "sword");

      arrowToken[0] = new ArrowToken([50, 350]);
      arrowToken[1] = new ArrowToken([450, 350]);

      tutorialText[0] = ["Good Luck!", 220, 115];
      
      break;

    case 5:
      enemy[0] = new Enemy([50, 100], "bow");
      enemy[1] = new Enemy([450, 100], "bow");
      enemy[2] = new Enemy([250, 50], "bow");

      enemy[3] = new Enemy([250, 125], "sword");
      enemy[4] = new Enemy([450, 225], "sword");
      enemy[5] = new Enemy([50, 225], "sword");

      arrowToken[0] = new ArrowToken([175, 300]);
      arrowToken[1] = new ArrowToken([325, 300]);
      
      break;
      
    case 6:
      
      enemy[0] = new Enemy([100, 75], "bow");
      enemy[1] = new Enemy([400, 75], "bow");
      enemy[2] = new Enemy([250, 125], "sword");

      tutorialText[0] = ["Enemies in the City", 202, 65];
      tutorialText[1] = ["are Slightly Stronger", 200, 75];
      
      break;
    
    case 7:
      
      enemy[0] = new Enemy([50, 50], "sword");
      enemy[1] = new Enemy([50, 350], "sword");
      enemy[2] = new Enemy([450, 50], "sword");
      enemy[3] = new Enemy([450, 350], "sword");
      
      break;
      
    case 8:
      
      enemy[0] = new Enemy([50, 100], "bow");
      enemy[1] = new Enemy([450, 100], "bow");
      enemy[2] = new Enemy([250, 50], "bow");
      enemy[3] = new Enemy([75, 325], "sword");
      enemy[4] = new Enemy([425, 325], "sword");
      
      arrowToken[0] = new ArrowToken([250, 200]);
      
      break;
      
    case 9:
      
      enemy[0] = new Enemy([50, 50], "bow");
      enemy[1] = new Enemy([50, 200], "bow");
      enemy[2] = new Enemy([50, 350], "bow");
      enemy[3] = new Enemy([450, 50], "bow");
      enemy[4] = new Enemy([450, 200], "bow");
      enemy[5] = new Enemy([450, 350], "bow");
      enemy[6] = new Enemy([250, 75], "sword");
      
      arrowToken[0] = new ArrowToken([250, 200]);
      arrowToken[1] = new ArrowToken([225, 100]);
      arrowToken[2] = new ArrowToken([275, 100]);
      
      break;
      
    case 10:
      
      enemy[0] = new Enemy([50, 50], "bow");
      enemy[1] = new Enemy([50, 350], "bow");
      enemy[2] = new Enemy([450, 50], "bow");
      enemy[3] = new Enemy([450, 350], "bow");
      enemy[4] = new Enemy([250, 75], "sword");
      enemy[5] = new Enemy([75, 200], "sword");
      enemy[6] = new Enemy([425, 200], "sword");
      enemy[7] = new Enemy([250, 375], "sword");
      
      arrowToken[0] = new ArrowToken([225, 175]);
      arrowToken[1] = new ArrowToken([225, 225]);
      arrowToken[2] = new ArrowToken([275, 175]);
      arrowToken[3] = new ArrowToken([275, 225]);
      
      break;
      
    case 11:
      
      enemy[0] = new Enemy([250, 100], "duelWield");

      tutorialText[0] = ["Knights turn Slow,", 294, 85];
      tutorialText[1] = ["Stab Them in the Back!", 280, 100];
      tutorialText[2] = ["Their Big Swords", 120, 190];
      tutorialText[3] = ["can Push through Shields", 92, 205];
      break;
      
    case 12:
      
      enemy[0] = new Enemy([100, 75], "bow");
      enemy[1] = new Enemy([400, 75], "bow");
      enemy[2] = new Enemy([150, 125], "sword");
      enemy[3] = new Enemy([350, 125], "sword");

      arrowToken[0] = new ArrowToken([50, 350]);
      arrowToken[1] = new ArrowToken([450, 350]);

      tutorialText[0] = ["Other Enemies in", 205, 65];
      tutorialText[1] = ["Castle are Even Stronger", 190, 75];
      
      break;
      
    case 13:
      
      enemy[0] = new Enemy([50, 75], "bow");
      enemy[1] = new Enemy([450, 75], "bow");
      enemy[2] = new Enemy([250, 50], "bow");
      
      enemy[3] = new Enemy([150, 125], "duelWield");
      enemy[4] = new Enemy([350, 125], "duelWield");
      
      arrowToken[0] = new ArrowToken([250, 225]);
      
      break;
      
    case 14:
      
      enemy[0] = new Enemy([50, 50], "sword");
      enemy[1] = new Enemy([50, 350], "sword");
      enemy[2] = new Enemy([450, 50], "sword");
      enemy[3] = new Enemy([450, 350], "sword");
      enemy[4] = new Enemy([50, 200], "sword");
      enemy[5] = new Enemy([450, 200], "sword");
      enemy[6] = new Enemy([250, 50], "bow");
      
      enemy[7] = new Enemy([150, 150], "duelWield");
      enemy[8] = new Enemy([350, 150], "duelWield");
      
      arrowToken[0] = new ArrowToken([250, 265]); 
      arrowToken[1] = new ArrowToken([225, 325]);
      arrowToken[2] = new ArrowToken([275, 325]); //At this point I'm making the levels hard out of spite for the people that keep beating them
      
      break;
      
    case 15:
      
      enemy[0] = new Enemy([250, 100], "duelWield");
      enemy[1] = new Enemy([75, 300], "duelWield");
      enemy[2] = new Enemy([425, 300], "duelWield");
      
      enemy[3] = new Enemy([50, 50], "bow");
      enemy[4] = new Enemy([50, 350], "bow");
      enemy[5] = new Enemy([450, 50], "bow");
      enemy[6] = new Enemy([450, 350], "bow");
      
      enemy[7] = new Enemy([125, 50], "sword");
      enemy[8] = new Enemy([375, 50], "sword");
      enemy[9] = new Enemy([50, 150], "sword");
      enemy[10] = new Enemy([450, 150], "sword");
      enemy[11] = new Enemy([125, 125], "sword");
      enemy[12] = new Enemy([375, 125], "sword");
      
      arrowToken[0] = new ArrowToken([175, 250]); 
      arrowToken[1] = new ArrowToken([325, 250]);
      arrowToken[2] = new ArrowToken([75, 200]);
      arrowToken[3] = new ArrowToken([200, 350]); 
      arrowToken[4] = new ArrowToken([300, 350]);
      arrowToken[5] = new ArrowToken([425, 200]);
      
      tutorialText[0] = ["And Gobby Wept,", 200, 20];
      tutorialText[1] = ["Seeing as he had", 200, 35];
      tutorialText[2] = ["No More Levels to Conquer", 175, 50];
      
      break;
      
    case 16:
      
      time = round(millis()/1000, 1);
      menuPage = "win";
      level = 0;
      menu(menuPage);
      
      
  } 
  
  
  // for (let i = 0; i < enemy.length; i++){
  //   console.log(enemy[i].lv);
  // }
  if (lv != 16) enemyleft = enemy.length;
}

function manageLevel() {
  if (enemyleft == 0 && level != 0) {
    levelcheck.push(level)
    level++;
    
    buildLevel(level);
  }

  if ([1, 2, 3, 4, 5].includes(level)) {
    image(bg1, 0, 0, 500, 400);
    background(0, 100, 0, 80);
    
  } else if ([6, 7, 8, 9, 10].includes(level)) {
    image(bg2, 0, 0, 500, 400);
    background(0, 60);
    
  } else if ([11, 12, 13, 14, 15].includes(level)) {
    image(bg3, 0, 0, 500, 400);
    background(0, 0, 60, 40);
    
  }

  text("Arrows: ", 445, 15);
  text(numArrows, 487, 15);

  for (let i = 0; i < tutorialText.length; i++) {
    text(tutorialText[i][0], tutorialText[i][1], tutorialText[i][2]);
  }

  push(); //Back Icon
    tempX = 30;
    tempY = 20;
    tempSize = 20;
    translate(tempX, tempY);
    if (mouseX >= tempX-tempSize-3 && mouseX <= tempX+tempSize+3 && mouseY >= tempY-(tempSize/2)-2 && mouseY <= tempY+(tempSize/2)) {
      scale(1.1);
      if (mouseIsPressed){
        menuPage = "main";
        level = 0;
      }
    }
    tint(240, 199, 122);
    image(backButton, -30, -20, 60, 40);
    pop();
  
}
