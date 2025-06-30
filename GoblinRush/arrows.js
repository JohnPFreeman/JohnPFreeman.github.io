function arrowCheck(){
  for (let i = 0; i < enemy.length; i++){ //this just executes the code for each enemy
    if (enemy[i].arrowIs) {
      enemy[i].arrowIs = arrow(enemy[i].arrowPos, enemy[i].arrowV, enemy[i].arrowIs, (enemy[i].lv == 3));
      hit = false;
      hit = hitCen(enemy[i].arrowPos, [5, 5], playerPos, [25*sqrt(2)/2, 25*sqrt(2)/2]);
      if (hit) {
        outputVolume(0.3);
        gobSplatSND.play();
        gobSplatSND.jump(0.1);
        deaths++;
        buildLevel(level);
        hit = false;
      } else if (dist(enemy[i].arrowPos[0], enemy[i].arrowPos[1], playerPos[0], playerPos[1]) < 30 && !enemy[i].whooshed) {
        enemy[i].whooshed = true;
        whooshSND.play();
        whooshSND.jump(0.5);
        
      }
    }
  }
  
  if (arrowIs) {
    arrowIs = arrow(arrowPos, arrowV, arrowIs);
    for (let i = 0; i < enemy.length; i++) {
      hit = false;
      hit = hitCen(arrowPos, [5, 5], enemy[i].pos, [20 + 25*(enemy[i].weapon == "shield"), 25 + 20*(enemy[i].weapon == "shield")]);
      if (hit) {
        if (enemyleft != 1) enemy[i].splat();
        outputVolume(0.6);
        splatSND.play();
        splatSND.jump(0.7);
        enemy[i].pos = [10000, 10000]; //way easier than figuring out how to kill them. Just vwoop them away and delete every enemy at the end of the level
        enemyleft--;
        arrowIs = false;
        
      }
      hit = false;
    }
  }
}

function arrow(pos, v, is, bolt = false) { //handles movement of arrow
  pos[0] += v[0];
  pos[1] += v[1];
  fill(0);
  if (v[0] >= 0) {
    drawArrow(pos[0], pos[1], 100, atan(v[1]/v[0]), bolt);
  }else {
    drawArrow(pos[0], pos[1], 100, PI + atan(v[1]/v[0]), bolt);
  }
  
  
  if //this all just checks when to delete the arrodw. It checks if it is out of the field, or if it is intersecting the shield while you are blocking
    (pos[0] < 0 || pos[1] < 0 || pos[0] > 500 || pos[1] > 400)
  { 
    return false;
  }else if (hitCen(pos, [5, 5], [playerPos[0] + 9*pointVec[0], playerPos[1] + 9*pointVec[1]], [25, 25]) && block) {
    blockSND.play();
    blockSND.jump(0.1);
    return false;
  } else {
    return true;
  }
  
}

function drawArrow(x, y, length, angle, bolt = false) {
  push();
  translate(x, y);
  scale(0.3);
  rotate(angle);

  //main shaft
  stroke(80);  
  strokeWeight(3);
  line(-10, 0, -length * 0.85, 0); 
  
  //tip 
  fill(0);
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(-20, -8);
  vertex(-10, 0);
  vertex(-20, 8);
  endShape(CLOSE);

  // end of the arrow near the feather
  stroke(120);
  fill(120);
  strokeWeight(1);
  line(-length * 0.75, 0, -length * 0.85, 0); 
  // feathers
  fill(200, 150*bolt, 0)
  stroke(150, 0, 0);
  
  // left feather
  beginShape();
  vertex(-length * 0.85, -5);
  vertex(-length * 0.85 - 20, -20);
  vertex(-length * 0.85 - 10, -5);
  endShape(CLOSE);

  // right feather
  beginShape();
  vertex(-length * 0.85, 5);
  vertex(-length * 0.85 - 20, 20);
  vertex(-length * 0.85 - 10, 5);
  endShape(CLOSE);

  // center feather
  beginShape();
  vertex(-length * 0.85, -5);
  vertex(-length * 0.85 - 20, 0);
  vertex(-length * 0.85, 5);
  endShape(CLOSE);

  pop();
}