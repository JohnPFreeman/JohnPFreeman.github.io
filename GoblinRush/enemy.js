class Enemy {
  //Class contains all enemy visuals/actions
  constructor(pos, weapon, lv = ceil(level / 5)) {
    this.pos = pos;
    this.vector = [];
    this.weapon = weapon;
    this.rotAngle = pointAt(this.pos, playerPos);
    this.turnBlocked = false;
    this.lv = lv;
    this.arrowPos = [];
    this.arrowV = [];
    this.arrowIs = false;
    this.attackTime = random(0, 1450); //Just randomizes the attack times so they don't all shoot simultaniously
    this.swing = random(-PI, 0);
    this.backHand = random([true, false]);
    this.whooshed = false;
    
    this.splats = [];
    this.splatted = false;

  }

  show() {
    //displays all the enemies
    
    if (this.splatted == true) {
      //console.log("1");
      this.splat();
    }
    
    push();
    translate(this.pos[0], this.pos[1]);

    if (this.weapon == "duelWield") {
      this.slotate();
      this.charge();
      
    } else {
      rotate(pointAt(this.pos, playerPos));
      
    }

    if (this.weapon == "sword") {
      this.sword(this.pos);
    }

    if (this.weapon == "bow") {
      this.bow(this.pos);
    }
    

    this.art();
    pop();

    this.stab();
  }

  bow() {
    //function that draws bow and triggers attacks for enemies that have bows
    push();
    if (
      !this.arrowIs &&
      millis() % 1500 > this.attackTime &&
      millis() % 1500 < this.attackTime + 50 &&
      this.pos[0] < 1000
    ) {
      outputVolume(0.25);
      shootSND.play();
      shootSND.jump(0.2);
      this.whooshed = false;

      this.arrowIs = true;
      this.arrowPos = [this.pos[0] + 15 * cos(pointAt(this.pos, playerPos)), this.pos[1] + 15 * sin(pointAt(this.pos, playerPos))]
      this.arrowV = [playerPos[0] - this.pos[0], playerPos[1] - this.pos[1]];
      this.arrowV = nor(this.arrowV, 2 + this.lv * 2);
    }

    //draws bow
    stroke(92, 64, 51);
    strokeWeight(5);
    noFill();
    if (this.lv == 3){
      rotate(PI/2);
      image(crossbowIMG, -19, -24, 40, 35);
      
    } else {
      rotate(PI);
      image(bowIMG, -21, -18, 20, 35);
      
    }
    
    pop();
  }

  sword() {
    this.chase();

    push();
    //rotate(-PI/2);

    rotate(this.swing);
    //image(stick, 0, 0, 10, 10);
    push();
    switch (this.lv) {
      case 1:
        scale(1, -1);
        image(forkIMG, -10, -50, 20, 50);
        break;

      case 2:
        scale(1, -1);
        translate(1, 0);
        image(swordIMG, -10, -55, 20, 50);
        break;
        
      case 3:
        scale(1 - !this.backHand*2, -1);
        translate(1, 0);
        image(halbardIMG, -19, -62, 35, 65);
        //this.swing = -PI/2;
        break;
    }
    pop();
    if (!this.backHand) {
      this.swing -= PI / (64 - 16*(this.lv-1));
    } else {
      this.swing += PI / (64 - 16*(this.lv-1));
    }

    pop();
  }
  
  slotate() { // slow rotation

   // Get the angle between the enemy and the player
    let targetAngle = pointAt(this.pos, playerPos);

    // Find the shortest angle difference (to handle angle wrapping)
    let angleDiff = targetAngle - this.rotAngle;

    // Normalize the angle difference to the range [-PI, PI]
    if (angleDiff > 2*PI){
      angleDiff -= 2*PI
    }

    if (this.rotAngle < -2.5*PI) {
      this.rotAngle += 2*PI
    }
    
    if (angleDiff < -1.5*PI) {
      this.rotAngle -= 2*PI
    }
    
    let rotSpeed = PI/150;
    // Rotate gradually towards the target angle
    if (abs(angleDiff) > rotSpeed && abs(angleDiff < PI)) { // Check if there's a significant difference
      if (angleDiff > 0) {
      this.rotAngle += rotSpeed / (this.turnBlocked + 1);  // Rotate clockwise
      } else {
      this.rotAngle -= rotSpeed / (this.turnBlocked + 1);  // Rotate counterclockwise
      }
    } else if (abs(angleDiff) > rotSpeed && abs(angleDiff > PI)) {
        if (angleDiff > 0) {
          this.rotAngle -= rotSpeed / (this.turnBlocked + 1);
      } else {
          this.rotAngle += rotSpeed / (this.turnBlocked + 1);
      }
    }
    // Apply the rotation to the enemy (rotate around its position)
    
    rotate(this.rotAngle);
  }
 
  charge() {
	push();
	let dx = cos(this.rotAngle) * 0.5;
	let dy = sin(this.rotAngle) * 0.5;
	this.pos[0] += dx;
	this.pos[1] += dy;
	pop();
  }

  chase() {
    push();
    this.vector = [playerPos[0] - this.pos[0], playerPos[1] - this.pos[1]];
    this.vector = nor(this.vector, 2);
    this.pos[0] += this.vector[0] * (0.5 + 0.1 * this.lv);
    this.pos[1] += this.vector[1] * (0.5 + 0.1 * this.lv);
    pop();
  }

  stab() {
    hit = false;

    if (hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], this.pos, [15 + 15*(this.weapon == "duelWield"),15 + 15*(this.weapon == "duelWield")])) hit = true;

    if (this.weapon == "sword" ) {
      if (this.lv == 1) {
        if (hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], [this.pos[0] + 40 * cos(this.swing + PI / 2 + pointAt(this.pos, playerPos)), this.pos[1] + 40 * sin(this.swing + PI / 2 + pointAt(this.pos, playerPos))],[15, 15]))
          hit = true;
      } else if (this.lv == 2){
        for (let j = 15; j <= 40; j += 5) {
          if(hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], [(this.pos[0] + j*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + j*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [6, 6]))
            hit = true;

        }
      } else if (this.lv == 3){
        for (let j = 15; j <= 30; j += 5) {
          if(hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], [(this.pos[0] + j*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + j*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [6, 6]))
            hit = true;

        }
        if(hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], [(this.pos[0] + 45*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + 45*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [18, 18]))
            hit = true;
      }

      if (this.swing <= -PI || this.swing >= 0) {
        if (!this.backHand) {
          this.swing += PI / 8;
          this.backHand = !this.backHand;
        } else {
          this.swing -= PI / 8;
          this.backHand = !this.backHand;
        }
      }
      
      if (this.lv == 1 && block) {
        if (hitCen([this.pos[0] + 40 * cos(this.swing + PI / 2 + pointAt(this.pos, playerPos)),this.pos[1] + 40 * sin(this.swing + PI / 2 + pointAt(this.pos, playerPos))],[15, 15], [playerPos[0] + 9 * pointVec[0], playerPos[1] + 9 * pointVec[1]], [25, 25])) {
          this.shieldBump();
        }
      } else if (this.lv == 2 && block){
        for (let j = 15; j <= 40; j += 5) {
          if(hitCen([(this.pos[0] + j*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + j*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [6, 6], [playerPos[0] + 9 * pointVec[0], playerPos[1] + 9 * pointVec[1]], [25, 25]))
            this.shieldBump();

        }
      }  else if (this.lv == 3 && block){
        for (let j = 15; j <= 35; j += 5) {
          if(hitCen([playerPos[0] + 9 * pointVec[0], playerPos[1] + 9 * pointVec[1]], [25, 25], [(this.pos[0] + j*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + j*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [6, 6]))
            this.shieldBump();

        }
        if(hitCen([playerPos[0] + 9 * pointVec[0], playerPos[1] + 9 * pointVec[1]], [25, 25], [(this.pos[0] + 40*cos(this.swing + pointAt(this.pos, playerPos) + PI/2)), (this.pos[1] + 40*sin(this.swing + pointAt(this.pos, playerPos) + PI/2))], [16, 16]))
            this.shieldBump();
      }
      
    } else if (this.weapon == "duelWield") {
        this.turnBlocked = false;
        for (let j = 26; j <= 80; j += 12) {
          if(hitCen(playerPos, [(25 * sqrt(2)) / 2, (25 * sqrt(2)) / 2], [(this.pos[0] + j*cos(this.rotAngle)), (this.pos[1] + j*sin(this.rotAngle))], [55-(j/2), 55-(j/2)]))
            hit = true;
         
          if(hitCen([playerPos[0] + 9 * pointVec[0], playerPos[1] + 9 * pointVec[1]], [25, 25], [(this.pos[0] + j*cos(this.rotAngle)), (this.pos[1] + j*sin(this.rotAngle))], [55-(j/2), 55-(j/2)]) && block)
            this.turnBlocked = true;

        }
      
    }
    
    if (hit) {
      outputVolume(0.3);
      gobSplatSND.play();
      gobSplatSND.jump(0.1);
      deaths++;
      buildLevel(level);
      hit = false;
    }
  }
  
  shieldBump(){
    blockSND.play();
    blockSND.jump(0.1);

    if (!this.backHand) {
      this.swing += PI / 8;
      this.backHand = !this.backHand;
    } else {
      this.swing -= PI / 8;
      this.backHand = !this.backHand;
    }
  }

  art() {
    switch (this.lv) {
      case 1:
        push();
        // head
        scale(0.15);
        if (this.weapon == "duelWield") scale(1.7);
        rotate(-PI / 2);
        strokeWeight(5);
        fill(244, 194, 144); // Skin color
        ellipse(0, 0, 180, 180); // Head shape

        // hat draw
        push();
        translate(30, -90);
        rotate(PI / 9);

        // Hat brim
        fill(194, 178, 128);
        ellipse(0, 20, 140, 35);

        if (this.weapon == "bow") {
          push();
          strokeWeight(2);
          translate(-130, -90);
          scale(2);
          rotate((5 * PI) / 5.5);
          //red feather
          fill(255, 0, 0);
          ellipse(-30, -30, 15, 50);
          stroke(200, 0, 0);
          strokeWeight(1);

          //feather texture
          for (let i = -20; i < 25; i += 5) {
            line(-30, -30, -30 + i / 2, -55 + i);
          }
          pop();
        }

        // top of hat
        fill(210, 180, 140);
        rectMode(CENTER);
        rect(1, -15, 70, 80, 10);
        pop();

        // eyes
        fill(0);
        ellipse(-30, -10, 15, 15); // Left eye
        ellipse(30, -10, 15, 15); // Right eye

        //eyebrows
        stroke(100);
        strokeWeight(4);
        line(-45, -25, -15, -15); // Left eyebrow
        line(15, -15, 45, -25); // Right eyebrow
        // mouth
        strokeWeight(2);
        line(-15, 30, 15, 30);

        //wheat
        stroke(194, 178, 128);
        strokeWeight(4);
        line(15, 30, 60, 50);

        //grains of wheat
        strokeWeight(2);
        for (let i = 0; i < 5; i++) {
          line(60, 50, 60 + i * 5, 45 - i * 5);
          ellipse(60 + i * 5, 45 - i * 5, 5, 5);
        }
        pop();

        break;

      case 2:
        push();
        scale(0.15);
        rotate(-PI / 2);
        strokeWeight(5);
        // head
        fill(244, 194, 144); // Skin color
        ellipse(0, 0, 190); // Head shape

        // eyes
        fill(0);
        ellipse(-30, -10, 15, 15); // Left eye
        ellipse(30, -10, 15, 15); // Right eye

        // eyebrows
        stroke(100);
        strokeWeight(4);
        line(-45, -25, -15, -15); // Left eyebrow
        line(15, -15, 45, -25); // Right eyebrow

        // mouth
        strokeWeight(2);
        line(-15, 30, 15, 30);

        if (this.weapon == "sword") {
          // helmet base
          fill(100, 50, 0);
          noStroke();
          push();
          scale(1.05);
          arc(0, -20, 180, 150, PI, 2 * PI); // Base arc of the helmet
          pop();

          // helmet details
          fill(244, 194, 144);
          beginShape();
          vertex(-90, -20);
          vertex(-50, -50);
          vertex(0, -60);
          vertex(50, -50);
          vertex(90, -20);
          endShape(CLOSE);

          // top leather texture lines
          stroke(100, 50, 0);
          strokeWeight(2);
          line(-50, -50, -10, -45);
          line(-10, -45, 0, -60);
          line(0, -60, 10, -45);
          line(10, -45, 50, -50);
        } else if (this.weapon == "bow") {
          // hat draw
          push();
          translate(25, -115);
          rotate(19);

          //brim
          fill(21, 71, 52);
          ellipse(0, 20, 140, 35);

          // Top of hat
          fill(21, 80, 52);
          triangle(-40, 15, 50, 10, 10, -50);
          //red feather

          push();
          scale(1.1);
          translate(40, 10);
          rotate(PI / 8);
          fill(255, 0, 0);
          ellipse(-30, -30, 15, 50);
          stroke(200, 0, 0);
          strokeWeight(1);

          //feather texture
          for (let i = -20; i < 25; i += 5) {
            line(-30, -30, -30 + i / 2, -55 + i);
          }
          noStroke();
          pop();
          pop();
        }

        pop();
        break
        
      case 3:
        push();
        
        noStroke();
        rotate(-PI/2);
        scale(0.15);
        
        if (this.weapon == "duelWield") {
          push();
          scale(1.5);
          
          push();
          scale(5, -5);
          rotate(-PI/24);
          image(swordIMG, 4, -75, 30, 75);
          rotate(PI/12);
          image(swordIMG, -36, -75, 30, 75);
          pop();
          
          push(); //1

          translate(-95, 470);
          scale(1.5, 1.1)
          rotate(-PI/1.9);

          translate(180,80); 
          scale(1.4);
          push(); //2

          push(); //3


          fill("magenta")
          rotate(PI/6)
          rect(150,-119,120,65)
          pop(); //3

          push(); //3
          translate(89,-9)
          fill("purple");
          arc(90,51,30,30,-5*PI/6,PI/6)
          arc(115,65,30,30,-5*PI/6,PI/6)
          arc(136,77,30,30,-5*PI/6,PI/6);
          arc(160,90.5,30,30,-5*PI/6,PI/6);
          pop(); //3

          push(); //3
          translate(124,-80)
          fill("purple");
          arc(87,63,30,30,PI/6,-5*PI/6);
          arc(111,77,30,30,PI/6,-5*PI/6);
          arc(134,90,30,30,PI/6,-5*PI/6);
          arc(157,103,30,30,PI/6,-5*PI/6);
          pop(); //3

          fill("purple");
          translate(125,-74);
          arc(161,120,35,30,-4*PI/3,-PI/3)
          arc(147,145,35,30,-4*PI/3,-PI/3)  
          pop(); //2

          pop(); //1

          //mask area
          push();
          stroke("grey");
          fill("grey");
          quad(100-200,210-200,130-200,110-200,270-200,110-200,300-200,210-200);
          quad(100-200,210-200,120-200,230-200,280-200,230-200,300-200,210-200);
          quad(120-200,230-200,110-200,280-200,290-200,280-200,280-200,230-200);
          triangle(110-200,280-200,200-200,340-200,290-200,280-200)

          fill(240,230,140);
          //eye area 
          push(); //1
          //eyes
          fill(0); 
          ellipse(-35, -15, 20); // Left eye
          ellipse(35, -15, 20);  // Right eye
          pop(); //1
          //cross area
          rect(190-200,130-200,20,150);
          rect(120-200,170-200,160,10);
          rect(120-200,190-200,160,10);  
          triangle(120-200,170-200,110-200,185-200,120-200,200-200);
          triangle(120-200,170-200,130-200,185-200,120-200,200-200);
          triangle(280-200,170-200,270-200,185-200,280-200,200-200);
          triangle(280-200,170-200,290-200,185-200,280-200,200-200);
          triangle(190-200,130-200,200-200,120-200,210-200,130-200);
          triangle(190-200,280-200,200-200,290-200,210-200,280-200);
          pop();
          
          pop();
          
        } else {
          push();
          
          scale(1.2);
          translate(-200, -200);
  
          fill(245, 184, 138); // Skin tone
          noStroke();
          ellipse(200, 200, 150, 150);
          push();
          translate(200,200)
          // eyes
          fill(0); 
          ellipse(-30, -10, 15, 15); // Left eye
          ellipse(30, -10, 15, 15);  // Right eye

          // eyebrows
          fill(101,73,33);
          stroke(101,73,33); 

          strokeWeight(4);
          line(-45, -25, -15, -15); // Left eyebrow
          line(15, -15, 45, -25);   // Right eyebrow

          // mouth
          stroke(0)
          strokeWeight(2);
          line(-15, 40, 15, 40); 
          pop();

          //mustache code
          fill(101,73,33);
          // Left side of mustache
          arc(180, 227, 40, 20, PI, 0);

          // Right side of mustache
          arc(220, 227, 40, 20, PI,0);

          if (this.weapon == "bow") {
            push();
            strokeWeight(2);
            translate(300, 60);
            scale(-1.35, 1.35);
            rotate((5 * PI) / 5.5);
            //red feather
            fill(255, 0, 0);
            ellipse(-30, -30, 15, 50);
            stroke(200, 0, 0);
            strokeWeight(1);

            //feather texture
            for (let i = -20; i < 25; i += 5) {
              line(-30, -30, -30 + i / 2, -55 + i);
            }
            pop();
          }
          
          //helmet code
          push();
          strokeWeight(3);
          stroke(75);
          fill(75,75,75)
          arc(155,210,60,135,PI,-PI/2)
          arc(245,210,60,135,-PI/2,0)  
          arc(200,150,100,53,-PI,0)
          rect(150,150,100,20)
          rect(190,150,20,55)
          pop();
          
          
          pop();
          
        }
        
        
        pop();
        break
    }
  }
  
  splat() {
    //console.log("2");
    if (!this.splatted) {
      for (let i = 0; i < 100 + 200*(this.weapon == "duelWield"); i++){
        let splatAngle = random(PI);
        let splatV = random(-1 - (this.weapon == "duelWield"), 6 + 4*(this.weapon == "duelWield"));
        this.splats[i] = [random(this.pos[0]-3, this.pos[0]+3), random(this.pos[1]-3, this.pos[1]+3), splatV/1.5*cos(splatAngle), -splatV*sin(splatAngle), random(1, 5), random(5, 15)];
        this.splatted = true;
      }
    }
    //console.log(this.splats[1][0], this.splats[1][1]);
    push();
    noStroke();
    for (let i = 0; i < this.splats.length; i++){
      if (this.splats[i][5] > 0) {
        this.splats[i][0] += this.splats[i][2];
        this.splats[i][1] += this.splats[i][3];
        this.splats[i][3] += 0.75;
        fill(255, 0, 0);
        ellipse(this.splats[i][0], this.splats[i][1], this.splats[i][4]);
        this.splats[i][5]--;
      }
    }
    pop();
    
  }
}
