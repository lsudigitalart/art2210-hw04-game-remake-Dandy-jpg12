
let creepyImage;
let creepyAlpha = 0;

let gameDuration = 15;
let gameStartTime;
let SpawningEnabled = true;

let playerX = 200;
let playerY = 300;
let playerSize = 50;
let speed = 15;
let enemySize = 60

let enemyX = 90
let enemyY= 10
let enemySpeed = 5
let enemySpeedX = 7

let enemybY = 600
let enemybX = 0
let enemybSpeed = 3.5
let enemybSpeedX = -5

let enemycY = -600
let enemycX = 0
let enemycSpeed = -4.5
let enemycSpeedX = -5

let enemydY = -600
let enemydX = 0
let enemydSpeed = -5.5
let enemydSpeedX = 5

let bigboyX;
let bigboyY;
let bigboySize = 800
let bigboySpeed = 3
let bigboyActive = false
let bigboyCollided = false



let isGameOver = false;

var whichscreen = "start"

function setup() {
  createCanvas(800, 600);

  InitializeEnemies();

  gameStartTime = millis()  

}

function preload() {
    creepyImage = loadImage("for game.png");

  }

function draw(){
    if (isGameOver) {
        endScreen();
        return;
    }


if (whichscreen === "start") {
    startScreen();
    } else if (whichscreen === "maingame"){
    mainGame();
    } else if (whichscreen === "end"){
    endScreen();
    } else if (whichscreen === "Creepy") {
    creepyEndScreen();
    }
}

    
function startScreen() {
    background("blue");
    textSize(40);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Press Any Button to Start", width / 2, height / 1.5);
    text("Avoid the Circles!", width / 2, height / 2.5);



    if (keyIsPressed) {
        whichscreen = "maingame";
        gameStartTime = millis();
        isGameOver = false;
        SpawningEnabled = true;
        bigboyActive = false;
        bigboyX = undefined;
        InitializeEnemies();

    }
}


function mainGame() {
    
    background(200);

let timePassed = (millis() - gameStartTime) / 1000;

if (timePassed >= gameDuration) {
    SpawningEnabled = false;
    bigboyActive = true;
    }   



    if (bigboyActive && bigboyX === undefined){
        bigboyX = -bigboySize;
        bigboyY = height / 2;
    }

    if (keyIsDown(LEFT_ARROW)) 
        {playerX -= speed;
        }

    if (keyIsDown(RIGHT_ARROW)) 
        {playerX += speed;
        }

    if (keyIsDown(UP_ARROW)) 
        {playerY -= speed; 
        }

    if (keyIsDown(DOWN_ARROW)) {
        playerY += speed;
    }

    playerX = constrain(playerX, playerSize/2, width - playerSize/2);
    playerY = constrain(playerY, playerSize/2, height - playerSize/2);

    if (enemyY > height + enemySize) { enemyY = -enemySize;
    enemyX = random(enemySize, width / 2 - enemySize);

    }
    
     fill(255, 200, 100);
        circle(playerX, playerY, playerSize);
    
    if (SpawningEnabled) {

     fill(155, 20, 10);
        

        circle(enemydX, enemydY, enemySize);

        circle(enemycX, enemycY, enemySize);
        
        circle(enemybX, enemybY, enemySize);
        
        circle(enemyX, enemyY, enemySize);
    }

    if (bigboyActive) {
        fill("black");
        circle(bigboyX, bigboyY, bigboySize);
        bigboyX += bigboySpeed;

        let bigboyDistance = dist(playerX, playerY, bigboyX, bigboyY);
        if (bigboyDistance < (playerSize + bigboySize) / 2) {
            bigboyCollided = true;
            whichscreen = "Creepy";
            return;
        }
    }

    enemyY += enemySpeed
    enemyX += enemySpeedX
    enemybY += enemybSpeed
    enemybX += enemybSpeedX
    enemycY += enemycSpeed
    enemycX += enemycSpeedX
    enemydY += enemydSpeed
    enemydX += enemydSpeedX



    if (enemybY > height + enemySize) { enemybY = -enemySize; enemybX = random
        (width / 2 + enemySize, width - enemySize)}

     if (enemycY + enemySize < 0 ) { enemycY = height + enemySize; enemycX = random
        (enemySize, width - enemySize)}   

    if (enemydY < -enemySize) { enemydX > width + enemySize; enemydX = random
        (enemySize, enemySize * 2); enemydY = height + enemySize}  

    let distance = dist(playerX, playerY, enemyX + enemySize/2, enemyY + enemySize/2);
    if (distance < (playerSize + enemySize) / 2) {isGameOver = true;
        whichscreen = "end";

    }
     
if (SpawningEnabled) {
    let distance2 = dist(playerX, playerY, enemybX + enemySize / 2, enemybY + enemySize/2);
    if (distance2 < (playerSize + enemySize) / 2) {isGameOver = true;
        whichscreen = "end";
    }

    let distance3 = dist(playerX, playerY, enemycX + enemySize / 2, enemycY + enemySize/2);
    if (distance3 < (playerSize + enemySize) / 2) {isGameOver = true;
        whichscreen = "end";
    }

    let distance4 = dist(playerX, playerY, enemydX + enemySize / 2, enemydY + enemySize/2);
    if (distance4 < (playerSize + enemySize) / 2) {isGameOver = true;
        whichscreen = "end";
    }
    }
}  


   function endScreen() {
    background("pink")
    
    fill("red")
    textAlign(CENTER, CENTER);
    textSize(50)
    text("Try Again!", width / 2, height / 2 )
    
    textSize(20)
    text("Click to Restart", width / 2, 400)
   }

     function creepyEndScreen() {
        
        background("black");
        if (creepyAlpha < 255){
            creepyAlpha += 1
        }
        tint(255, creepyAlpha);
        image(creepyImage, 0 ,0, width, height);
        

        textSize(32)
        fill(255, creepyAlpha);
        

        for (let i = 0; i < 20; i++){
            let x = random(width);
            let y = random(height);
            fill("red")
            text("YOU LOSE", x, y);
        }
     }

function restartGame() {
    whichscreen = "start"
    isGameOver = false;
    SpawningEnabled = true;
    bigboyActive = false;
    bigboyX = undefined;
    creepyAlpha = 0;
    InitializeEnemies();
    gameStartTime = millis();
}

function mousePressed(){
    if (whichscreen === "end" || whichscreen === "Creepy") {restartGame();

    }
}

     function InitializeEnemies() {
        enemyX = random(enemySize, width / 2 - enemySize);
    enemyY = random(-300,0);

    enemybX = random(width / 2 + enemySize, width - enemySize);
    enemybY = random(-300,0);

    enemycX = random(enemySize, width - enemySize);
    enemycY = (height + enemySize);

    enemydX = random(enemySize, enemySize * 2);
    enemydY = (height + enemySize);
     }
    
