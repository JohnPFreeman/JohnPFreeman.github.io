class ArrowToken {
  constructor(pos){
    this.pos = pos;
  }
  
  show(){
    push();
    strokeWeight(2);
    ellipse(this.pos[0], this.pos[1], 25);
    pop();
    image(arrowTokenIMG, this.pos[0]-12.5, this.pos[1]-12.5, 25, 25);
  }
  
  update(){
    if (dist(playerPos[0], playerPos[1], this.pos[0], this.pos[1]) < 25) {
      this.pos = [10000, 10000];
      numArrows++;
    }
  }
}


