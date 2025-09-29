
let creepyImage;
let creepyAlpha = 0;

let playerX = 200;
let playerY = 300;
let playerSize = 50;
let speed = 15;
let enemySize = 60

let pinkX = 300
let pinkY = 200
let PinkSize = 20

let orangeX = 300
let orangeY = 200
let orangeSize = 30

let Enemy1X = 0
let Enemy1Y = 0
let Enemy1Speed = 25
let Enemy1Size = 50

let Enemy2X = 0
let Enemy2Y = 0
let Enemy2Speed = 15
let Enemy2Size = 50

let score = 0
let gametime = 0
let timelimit = 1800

let enemyVisibility = true;
let enemyVisibility2 = true;


let blackorbX = 0 - 700
let blackorbY = 260
let blackorbSize = 700
let blackorbSpeed = 3

let blackorbSPAWN = false;
let Orbtime = 0
let SPAWNDELAY = 16000

let enemyRespawn = 0
let enemyRespawn2 = 0

let isGameOver = false;

//Evil image
let Spooky
let SpookyAlpha = 0
function preload() {Spooky = loadImage("for game.png");

}

var whichscreen = "start"

function setup() {
  createCanvas(800, 600);

    Orbtime = millis() + SPAWNDELAY;

  }


  
function draw(){
   
    background(10, 70, 150)
    
    
    
    if (keyIsDown(LEFT_ARROW) && playerX > playerSize/2)
        {playerX -= speed;
        }

    if (keyIsDown(RIGHT_ARROW) && playerX < width - playerSize/2) 
        {playerX += speed;
        }

    if (keyIsDown(UP_ARROW) && playerY > playerSize/2) 
        {playerY -= speed; 
        }

    if (keyIsDown(DOWN_ARROW) && playerY < height - playerSize/2) {
        playerY += speed;
    }

    // Player Constraints
    playerX = constrain(playerX, playerSize/2, width - playerSize/2);
    playerY = constrain(playerY, playerSize/2, height - playerSize/2);

    let distance = dist(playerX, playerY, pinkX, pinkY);
    if (distance < (playerSize + PinkSize) / 2) {score += 50;
 
    // Collectibles :D
        pinkX = random(PinkSize, width - PinkSize);
    pinkY = random(PinkSize, height - PinkSize);
    }
    
    let distance2 = dist(playerX, playerY, orangeX, orangeY);
    if (distance2 < (playerSize + orangeSize) / 2) {score += 20

        orangeX = random(orangeSize, width - orangeSize);
        orangeY = random(orangeSize, height - orangeSize);
    }

    // Enemy
    if (enemyVisibility) {
    Enemy1X += Enemy1Speed;

    fill("black")
    square(Enemy1X, Enemy1Y, Enemy1Size);
    
    if (Enemy1X > width + Enemy1Size) {
        enemyVisibility = false;
        enemyRespawn = millis() + 2000
    }
    

    let distance3 = dist(playerX, playerY, Enemy1X + Enemy1Size/ 2, Enemy1Y + enemySize/2);
    if (enemyVisibility && distance3 < (playerSize + enemySize)/2) {score -= 20;
        enemyVisibility = false;
    }
    } else {
        if (millis() >= enemyRespawn) {
        Enemy1X = -Enemy1Size;
        Enemy1Y = random(Enemy1Size, height - Enemy1Size);
        enemyVisibility = true;
        }

    }

    //Enemy 2
if (enemyVisibility2) {
    Enemy2X += Enemy2Speed;

    fill("black")
    square(Enemy2X, Enemy2Y, Enemy2Size);
    
    if (Enemy2X > width + Enemy2Size) {
        enemyVisibility2 = false;
        enemyRespawn2 = millis() + 2000
    }
    

    let distance4 = dist(playerX, playerY, Enemy2X + Enemy2Size/ 2, Enemy2Y + Enemy2Size/2);
    if (enemyVisibility2 && distance4 < (playerSize + Enemy2Size)/2) {score -= 20;
        enemyVisibility2 = false;
    }
    } else {
        if (millis() >= enemyRespawn2) {
        Enemy2X = -Enemy2Size;
        Enemy2Y = random(Enemy2Size, height - Enemy2Size);
        enemyVisibility2 = true;
        }

    }

    //black Orb of despair

    if (millis() >= Orbtime && !blackorbSPAWN) {
        blackorbSPAWN = true
    }
    if (blackorbSPAWN){
        blackorbX += blackorbSpeed; 
    }

    circle(blackorbX, blackorbY, blackorbSize);

   

    if (blackorbX > width + blackorbSize);

    let distance5 = dist(playerX, playerY, blackorbX + blackorbSize/
        2, blackorbY + blackorbSize/2);

    if (distance5 < (playerSize + blackorbSize)/2) {
        isGameOver = true;
    }

    if (isGameOver) {
        drawGameOver();
        return;
   }

    //Shapes
    fill(200)
    circle(playerX, playerY, playerSize);
    
    fill("pink")
    circle(pinkX, pinkY, PinkSize)

    fill("orange")
    circle(orangeX, orangeY, orangeSize)

    fill(255);
    textSize(20);
    text("Score: " + score, 20, 30);
    
  
    function drawGameOver() {

        background(0);
        if (creepyAlpha < 255){
            creepyAlpha += 1
        }
        tint(255, creepyAlpha);
        image(Spooky, 0, 0, width, height);

        textSize(25);
        fill(255, creepyAlpha);

        for (let i = 0; i < 30; i++){
            let x = random(width);
            let y = random (height);
        text("YOU LOSE", x, y)
        fill("red");


        }
        
    }

}
