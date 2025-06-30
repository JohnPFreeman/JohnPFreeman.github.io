function hitCen([x1, y1], [w1, h1], [x2, y2], [w2, h2]){ //hitbox using rectangle in center mode. Found it was easier than corner mode in most cases. 
  push();
  rectMode(CENTER);
  fill(255, 0, 0, 150);
  
  TL1 = [x1 - w1/2, y1 - h1/2];
  BR1 = [x1 + w1/2, y1 + h1/2];
  TL2 = [x2 - w2/2, y2 - h2/2];
  BR2 = [x2 + w2/2, y2 + h2/2];
  
  if (TL1[0] < BR2[0] && TL1[1] < BR2[1] && TL2[0] < BR1[0] && TL2[1] < BR1[1]) {
    if (DEBUG) {
      fill(0, 255, 0);
      rect(x1, y1, w1, h1);
      rect(x2, y2, w2, h2);
    }
    pop();
    return true;
  }
  if (DEBUG) {
      rect(x1, y1, w1, h1);
      //console.log(x2, y2);
      rect(x2, y2, w2, h2);
    }
  pop();
  return false;
  
}

function nor(vec, mult = 1){ //wonky math for normalizing
  return [mult*vec[0]/sqrt(vec[0]*vec[0] + vec[1]*vec[1]), mult*vec[1]/sqrt(vec[0]*vec[0] + vec[1]*vec[1])];
  
}

function pointAt(obj1, obj2) { //wonkier math for pointing at things
  if (obj2[0] >= obj1[0]) {
    return atan((obj2[1] - obj1[1])/(obj2[0] - obj1[0]));
  } else{
    return PI + atan((obj2[1] - obj1[1])/(obj2[0] - obj1[0]));
  }
  
}