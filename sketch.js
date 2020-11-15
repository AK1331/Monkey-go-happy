
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0
var PLAY=1;
var END=0;
var gamestate=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(50,350,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  monkey.debug=true;
  
  ground=createSprite(200,360,400,5);
 // ground.velocityX=-4;
  ground.x=ground.width/2;
  
  obstacleGroup=createGroup();
  FoodGroup=createGroup();
  survivalTime=0;

}


function draw() {
background("lightblue");
  
 if (gamestate===PLAY){
   
 Bananas();
  Obstacles();
  
  stroke("black");
  strokeWeight(3);
  textSize(20);
  text("Survival Time: "+survivalTime,150,40);
  
  survivalTime = survivalTime+Math.ceil(getFrameRate()/400)

 
  if (keyDown("space") && monkey.y>200){
   monkey.velocityY=-10;
 }
  
  monkey.velocityY=monkey.velocityY + 0.8;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
  if (obstacleGroup.isTouching(monkey)){
   gamestate=END;

  }
 }else if (gamestate===END){
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
      
  stroke("black");
  strokeWeight(3);
  textSize(20);
  text("Survival Time: "+survivalTime,150,40);

 }
  

  
  
  
  monkey.collide(ground)
  
  drawSprites(); 
}

function Bananas(){
  if (frameCount%80===0){
   banana=createSprite(400,100,10,10);
   banana.addImage(bananaImage);
   banana.scale=0.1;
   banana.y=Math.round(random(100,200));
   banana.velocityX=-4;
   banana.lifetime=100;
    
    FoodGroup.add(banana);
  
  }
}

function Obstacles(){
  if (frameCount%100===0){
   obstacle=createSprite(400,348,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.1;
   obstacle.velocityX=-4;
   obstacle.lifetime=100;
  
  obstacleGroup.add(obstacle);
  
  }
}



