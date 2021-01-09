
var monkey , monkey_running
var background,bgImage,invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,score2;
var PLAY = 1;
var END = 0;
var gameState=1;
 
function preload(){ 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   
  bgImage = loadImage("Jungle.jpg");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  jumpSound = loadSound("salamisound-6718888-sfx-jump-2-game-computer.mp3");
  
 
}


function setup() {
  createCanvas(600,550);
  
  bg = createSprite(300,300,600,550);
  bg.addImage(bgImage);
  bg.x=bg.width/2;
  bg.scale = 4;
  
  
  monkey=createSprite(50,480,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.2;
  
  

  invisibleGround = createSprite(100,540,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstaclesGroup = createGroup();
  
    score = 0;
  
  
}


function draw() {
  
//moving background.
  bg.velocityX = -1;
  
  
  if(bg.x < 0){
   bg.x = bg.width/2; 
  }
  
  
  
  if(gameState===PLAY){
    Obstacles();
    Banana();
    
    //monkey movement.
  if(keyDown("space")){
     monkey.velocityY=-15; 
     jumpSound.play();

  }
   monkey.velocityY = monkey.velocityY +0.8;
  
   monkey.collide(invisibleGround)
    
      score = score + Math.round(getFrameRate()/60);

    
   if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
   } 
 }
  else if(gameState===END){
    bg.velocityX =0; 

  }
  
  drawSprites(); 
  stroke("black");
  fill("black");
  textSize(50);
  text("Survival Time:"+ score, 0,50);

}



function Banana() {
  
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,100,10,10);
    banana.y = Math.round(random(500,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
     bananaGroup.add(banana);
  }
}

function Obstacles(){
  
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,500,10,40);
   obstacle.velocityX = -5;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}
