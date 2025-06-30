function player(pos, weapon, block) { //player function. Handles displays/actions
  push();
  translate(pos[0], pos[1]);
  rotate(pointAt(pos, [mouseX, mouseY]));
  
  if (weapon == "sword" && block == false) {
    sword(pos);
  }
  
  if (weapon == "bow" && block == false) {
    bow(pos);
  }
  
  drawPlayer();
  
  if (block == true) {
    shield(pos);
  }
  
  if(keyIsDown(87) && pos[1] > 12){
    pos[1] -= !block*2.25 + 0.5; //java script stores a true boolean as 1, and a false as 0. So I used that to change the movement speed when blocking
  }
  if(keyIsDown(83) && pos[1] < 388){
    pos[1] += !block*2.25 + 0.5;
  }
  if(keyIsDown(65) && pos[0] > 12){
    pos[0] -= !block*2.25 + 0.5;
  }
  if(keyIsDown(68) && pos[0] < 488){
    pos[0] += !block*2.25 + 0.5;
  }
  
  //this maintains total velocity lower if you hold down two keys 
  if(keyIsDown(87) && pos[1] > 12 && keyIsDown(65) && pos[0] > 12) {
    pos[1] += (!block*2.25 + 0.5)*(0.29289); //0.29289 = (1 - (sqrt(2)/2))
    pos[0] += (!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(87) && pos[1] > 12 && keyIsDown(68) && pos[0] < 488) {
    pos[1] += (!block*2.25 + 0.5)*(0.29289);
    pos[0] -= (!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(83) && pos[1] < 388 && keyIsDown(65) && pos[0] > 12) {
    pos[1] -= (!block*2.25 + 0.5)*(0.29289);
    pos[0] += (!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(83) && pos[1] < 388 && keyIsDown(68) && pos[0] < 488) {
    pos[1] -= (!block*2.25 + 0.5)*(0.29289);
    pos[0] -= (!block*2.25 + 0.5)*(0.29289);
  }
  
  //this maintains total velocity lower if you hold down three keys 
  if(keyIsDown(87) && pos[1] > 12 && keyIsDown(65) && keyIsDown(68)) {
    pos[1] -= 2*(!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(87) && keyIsDown(83) && keyIsDown(68) && pos[0] < 488) {
    pos[0] += 2*(!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(87) && keyIsDown(83) && keyIsDown(65) && pos[0] < 488) {
    pos[0] -= 2*(!block*2.25 + 0.5)*(0.29289);
  }
  if(keyIsDown(83) && pos[1] > 12 && keyIsDown(65) && keyIsDown(68)) {
    pos[1] += 2*(!block*2.25 + 0.5)*(0.29289);
  }
  
  pop();
}

function drawPlayer() {
  
  push();
  scale(0.15);
  strokeWeight(5);
  rotate(-PI/2);
  
  fill(139, 69, 19); 
  ellipse(100, -40, 120, 140);

  // Draw gold coins spilling from the bag
  fill(255, 223, 0); 
  ellipse(100 + -20, -40 + -20, 15, 15); 
  ellipse(100 + 11, -40 + -10, 15, 15);
  ellipse(100 + 0, -40 + 8, 15, 15);
  ellipse(100 + -3, -40 + 1, 15, 15);
  ellipse(100 + 18, -40 + 1, 15, 15);
  ellipse(100 + 11, -40 + 06, 15, 15);
  ellipse(100 + 12, -40 + 03, 15, 15);
  ellipse(100 + 20, -40 + 17, 15, 15);
  ellipse(100 + 7, -40 + -12, 15, 15);
  ellipse(100 + 9, -40 + -9, 15, 15);

  fill(34, 139, 34);
  triangle(-60, -40, -80, -130, -30, -90); // Left ear
  triangle(60, -40, 80, -130, 30, -90);    // Right ear

  // Draw head 
  fill(34, 139, 34); // Goblin green
  ellipse(0, 0, 180, 180);

  // Draw eyes
  fill(0);
  ellipse(-30, 10, 20, 20); // Left eye, moved down
  ellipse(30, 10, 20, 20);  // Right eye, moved down

  // Draw eyebrows
  stroke(0);
  strokeWeight(3);
  line(-40, -5, -20, 5); // Left eyebrow 
  line(20, 5, 40, -5);   // Right eyebrow 
 //scales
  fill(34, 100, 34); 
  noStroke();
  for (let i = -60; i <= -40; i += 10) { // Left cheek scales
    ellipse(i, 30, 10, 10);
    ellipse(i + 10, 40, 10, 10);
  }
  for (let i = 40; i <= 60; i += 10) { // Right cheek scales
    ellipse(i, 30, 10, 10);
    ellipse(i - 10, 40, 10, 10);
  }
  
  pop();
}


function sword(pos, weapon) {
  
  push();
  if (swing != 0) {
    //rotate(-PI/2);
    
    rotate(swing);
    //image(stickIMG, 0, 0, 10, 10);
    push();
    scale(1, -1);
    image(stickIMG, -7, -40, 20, 40);
    pop();
    //triangle(-4, 0, 4, 0, 0, 30);
    swing -= PI/6;
      }
  if (swing <= -5*PI/6){
    swing = 0;
  }
  
  pop();
}

function bow(pos) { //handles the setup of the bow shooting, not the arrow motion
  push();
  
  if (mouseIsPressed && !arrowIs && numArrows > 0) {
    outputVolume(0.25);
    shootSND.play();
    shootSND.jump(0.2);    
    
    numArrows--;
    arrowIs = true;
    arrowPos[0] = pos[0];
    arrowPos[1] = pos[1];
    arrowV = [mouseX - pos[0], mouseY - pos[1]];
    arrowV = nor(arrowV, 10); //sets arrow V to be normalized and in the direction of the player
  }
  
  stroke(92, 64, 51);
  strokeWeight(5);
  noFill();
  rotate(PI);
  image(bowIMG, -21, -18, 20, 35);
  //arc(0, 0, 35, 35, -PI/4, PI/4);
  pop();
}


function shield(pos) { //does shield
  push();
  stroke(100);
  fill(100);
  rotate(-PI/2);
  image(shieldIMG, -15, 8, 30, 13);
  //ellipse(15, 0, 7, 25);
  pop();
}

function swordCheck(){
  if (swing != 0 && weapon == "sword" && !block) {
    for (let i = 0; i < enemy.length; i++) { //I need to test the hit box overlap between every enemy and for  box in the sword. If this gets too resource intensive I can probably find a different way
      for (let j = 15; j <= 35; j += 5) {
        hit = false;
        hit = hitCen(enemy[i].pos, [25 + 20*(enemy[i].weapon == "shield"), 25 + 20*(enemy[i].weapon == "shield")], [(playerPos[0] + j*cos(swing + pointAt(playerPos, [mouseX, mouseY]) + PI/2 + PI/6)), (playerPos[1] + j*sin(swing + pointAt(playerPos, [mouseX, mouseY]) + PI/2 + PI/6))], [5, 5]);

      }
      if (hit){ 
        if (enemyleft != 1) enemy[i].splat();
        outputVolume(0.8);
        splatSND.play();
        splatSND.jump(0.7);
        enemy[i].pos = [10000, 10000];
        enemyleft--;
      }
      hit = false;
    }
  }
}