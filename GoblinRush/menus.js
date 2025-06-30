function menu(page){
  if (page == "main") {
    image(mainPage, 0, 0, 500, 400);
    
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(45);
    //text("Goblin Rush", 250, 100);
    
    push();
    tint(255, 255, 200, 200);
    image(goblinArt, 240, 60, 215, 190);
    pop();
    
    push();
    translate(310, 315);
    if (mouseX >= 270 && mouseX <= 350 && mouseY >= 285 && mouseY <= 345) {
      scale(1.1);
      if (mouseIsPressed){
        level = 1;
        buildLevel(level);
      }
    }
    tint(240, 199, 122);
    image(playButton, -50, -40, 100, 80);
    fill(0);
    pop();
    
    
    push();
    translate(400, 315);
    scale(1, -1);
    if (mouseX >= 360 && mouseX <= 440 && mouseY >= 285 && mouseY <= 345) {
      scale(1.1);
      if (mouseIsPressed){
        menuPage = "select";
      }
    }
    tint(240, 199, 122);
    image(menuButton, -50, -40, 100, 80);
    pop();
    
    pop();
  } else if (page == "select") {
    image(blankPage, 0, 0, 500, 400);
    
    push();
    rotate(PI/185);
    tint(255, 255, 200, 150);
    image(mapRight, 250, 52, 200, 300);
    pop();
    
    push();
    rotate(PI/130);
    tint(255, 255, 200, 150);
    image(mapLeft, 56, 50, 200, 300);
    pop();
    
    
    
    push();
    textAlign(CENTER);
    rectMode(CENTER);
    textSize(45);
    //text("Map", 200, 40);
    
    push(); //Back Icon
    tempX = 75;
    tempY = 25;
    tempSize = 20;
    translate(tempX, tempY);
    if (mouseX >= tempX-tempSize-3 && mouseX <= tempX+tempSize+3 && mouseY >= tempY-(tempSize/2)-2 && mouseY <= tempY+(tempSize/2)) {
      scale(1.1);
      if (mouseIsPressed){
        menuPage = "main";
      }
    }
    tint(240, 199, 122);
    image(backButton, -30, -20, 60, 40);
    pop();
    
    push(); //Level 1-1 Icon
    tempX = 90;
    tempY = 90;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("1-1", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 1;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(1)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 1-2 Icon
    tempX = 160;
    tempY = 105;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("1-2", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 2;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(2)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 1-3 Icon
    tempX = 268;
    tempY = 98;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("1-3", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 3;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(3)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 1-4 Icon
    tempX = 361;
    tempY = 91;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("1-4", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 4;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(4)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 1-5 Icon
    tempX = 409;
    tempY = 121;
    tempSize = 20;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("1-5", 0, 0 - tempSize);
    rotate(PI/4);
    if (mouseX >= tempX-(tempSize/1.5) && mouseX <= tempX+(tempSize/1.5) && mouseY >= tempY-(tempSize/1.5) && mouseY <= tempY+(tempSize/1.5)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 5;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(5)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 2-1 Icon
    tempX = 407;
    tempY = 196;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("2-1", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 6;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(6)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 2-2 Icon
    tempX = 352;
    tempY = 242;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("2-2", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 7;
        buildLevel(level);
      }
    }
   
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(7)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 2-3 Icon
    tempX = 233;
    tempY = 222;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("2-3", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 8;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(8)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
   
    push(); //Level 2-4 Icon
    tempX = 107;
    tempY = 230;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("2-4", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 9;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(9)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 2-5 Icon
    tempX = 70;
    tempY = 298;
    tempSize = 20;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("2-5", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 10;
        buildLevel(level);
      }
    }
    rotate(PI/4)
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(10)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 3-1 Icon
    tempX = 127;
    tempY = 297;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("3-1", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 11;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(11)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 3-2 Icon
    tempX = 172;
    tempY = 332;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("3-2", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 12;
        buildLevel(level);
      }
    }
   
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(12)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 3-3 Icon
    tempX = 223;
    tempY = 284;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("3-3", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 13;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(13)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
   
    push(); //Level 3-4 Icon
    tempX = 299;
    tempY = 326;
    tempSize = 10;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("3-4", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 14;
        buildLevel(level);
      }
    }
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(14)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    push(); //Level 3-5 Icon
    tempX = 366;
    tempY = 341;
    tempSize = 20;
    translate(tempX, tempY);
    textSize(tempSize*1.5);
    text("3-5", 0, 0 - tempSize);
    if (mouseX >= tempX-(tempSize/2) && mouseX <= tempX+(tempSize/2) && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.2);
      if (mouseIsPressed){
        level = 15;
        buildLevel(level);
      }
    }
    rotate(PI/4)
    fill(200);
    rect(0, 0, tempSize);
    if(levelcheck.includes(15)){
      line(-tempSize/2, -tempSize/2, tempSize/2, tempSize/2);
      line(tempSize/2, -tempSize/2, -tempSize/2, tempSize/2);
    }
    pop();
    
    pop();
     
   
  } else if (page == "win") {
    image(blankPage, 0, 0, 500, 400);
      
    push();
    rotate(PI/185);
    tint(255, 255, 200, 150);
    image(winRight, 250, 52, 200, 300);
    pop();

    push();
    rotate(PI/130);
    tint(255, 255, 200, 150);
    image(winLeft, 56, 50, 200, 300);
    pop();
      
    push(); //Back Icon
    rectMode(CENTER);
    textAlign(CENTER);
    tempX = 75;
    tempY = 25;
    tempSize = 20;
    translate(tempX, tempY);
     if (mouseX >= tempX-tempSize && mouseX <= tempX+tempSize && mouseY >= tempY-(tempSize/2) && mouseY <= tempY+(tempSize/2)) {
      scale(1.1);
      if (mouseIsPressed){
        level = 0;
        menuPage = "main";
      }
    }
    fill(111, 78, 55);
    rect(0, 0, tempSize*2, tempSize);
    fill(0);
    textSize(tempSize/1.5);
    text("Back", 0, tempSize/4);
    pop();
    
    textAlign(LEFT);
    let progress = 0;
    for (let i = 1; i <= 15; i++) {
      if (levelcheck.includes(i)) progress++;
    }
    progress  = round((progress/15)*100);
    textSize(17);
    text("Progress: " + progress + "%", 60, 175);
    text("Deaths: " + deaths, 60, 200);
    text("Time: " + time, 60, 225);
    
    
  }
  
}

    