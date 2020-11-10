
var monkey , monkey_running, monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground;
var score
var PLAY = 1;
var END = 0;
var gameState = 1;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadImage("sprite_1.png");
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  ground = createSprite(300, 350, 1000, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  monkey = createSprite(50, 320, 10, 10);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
 
  FoodGroup = createGroup();
  obstacleGroup = createGroup(); 
}


function draw() {
createCanvas(400, 400);
 background(255);
  if (gameState === PLAY){
  if (ground.x<0){
    ground.x = ground.width/2;
  }
 
  if(keyDown("space")){
   monkey.velocityY = -15;

  }
  
  survivalTime = Math.ceil(frameCount/frameRate())
    
  monkey.velocityY = monkey.velocityY+0.8;
  
  spawn_food();
  spawn_Obstacles();
  
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.visible = false;
    gameState = END;
    
  }
  }
  if (gameState === END){
    stroke("black");
    fill("black");
    textSize(20);
    text("Game Over", 140, 200);
  }
  
monkey.collide(ground);  
  drawSprites();
  
  stroke("black");
  fill("black")
  textSize(20);
  text ("Survival Time:" + survivalTime, 125, 75);
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  
}

function spawn_food(){
  if (frameCount%80===0){
    banana = createSprite(400, Math.round(random(120, 200)), 10, 10);
    banana.addImage("food", bananaImage);
    banana.velocityX = -4;
    banana.scale = 0.05;
    banana.lifetime = 200
    FoodGroup.add(banana);
  }
}

function spawn_Obstacles(){
  if (frameCount%200===0){
  obstacle = createSprite(400, 315, 10, 10);
  obstacle.addImage("obstacle", obstacleImage);
    obstacle.lifetime = 200;
    obstacle.velocityX = -4;
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}




