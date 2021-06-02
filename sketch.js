var coinImg,SofiaImg,stoneImg,treeImg,backgroundImg,gameOverImg,restartImg;
var Sofia;
var bg;
var stoneGrp;
var treeGroup;
var coinGroup;
var gameStates="play";
var gameOver;
var restart;
var distance, CoinCount;
var invisibleGround;

function preload(){
  coinImg=loadImage("Images/coinImg.png");
  SofiaImg=loadImage("Images/SofiaImg.png");
  stoneImg=loadImage("Images/stoneImg.png");
  treeImg=loadImage("Images/treeImg.png");
  backgroundImg=loadImage("Images/backgroundImg.jpg");
  gameOverImg=loadImage("Images/gameOver.png");
  restartImg=loadImage("Images/restartImg (1).png");
}

function setup(){
  createCanvas(DisplayWidth,500);

  distance=0;
  CoinCount=0;


  bg=createSprite(WindowWidth,100,width,height);
  bg.addImage(backgroundImg);
  bg.x=bg.width+1000;
  bg.velocityX=-2;
  bg.scale=10;

  invisibleGround=createSprite(400,height-10,width,10);
  invisibleGround.visible=false;

  Sofia=createSprite(150,480);
  Sofia.addImage(SofiaImg);
  Sofia.scale=0.5;
  Sofia.setCollider("circle",0,-10,80);
  Sofia.debug=false;

gameOver=createSprite(400,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;

  restart=createSprite(400,400);
  restart.addImage(restartImg);
  restart.scale=0.5;

  stoneGrp=new Group();
  treeGroup=new Group();
  coinGroup=new Group();
}

function draw(){
  background(0);

  if(gameStates === "play"){
    gameOver.visible=false;
    restart.visible=false;
    bg.velocityX=-2;
    distance= distance + Math.round(getFrameRate() / 60.5);
  
  if(bg.x <20){
     bg.x=bg.width+1000; 
    }
    stones();
    trees();
    coins();

    if(keyDown("space") && Sofia.y >= 100) {
      Sofia.velocityY=-10;
  }
    Sofia.velocityY=Sofia.velocityY+1;
    Sofia.collide(invisibleGround);

  if(coinGroup.isTouching(Sofia)){
    CoinCount=CoinCount+1;
    coinGroup.destroyEach();
  }

  if(stoneGrp.isTouching(Sofia) || treeGroup.isTouching(Sofia)){
   gameStates="end";
  }

  

}

  if(gameStates === "end"){
    gameOver.visible=true;
    restart.visible=true;
    coinGroup.setVelocityXEach(0);
    stoneGrp.setVelocityXEach(0);
    treeGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);
    stoneGrp.setLifetimeEach(-1);
    treeGroup.setLifetimeEach(-1);
    Sofia.setVelocity(0,0);
    bg.velocityX=0;
    if(mousePressedOver(restart)){
      reset();
    }
}
drawSprites();
textSize(20);
fill("red");
text("Distance travelled :"+ distance + "m",600,50);
text("Coins earned:"+ CoinCount,600,80);
}

  function reset(){
    gameStates="play";
    stoneGrp.destroyEach();
    treeGroup.destroyEach();
    coinGroup.destroyEach();
    CoinCount=0;
    distance=0;
    Sofia.visible=true;
  }



function stones(){
  if(frameCount % 120 === 0){
    var stone=createSprite(800,480);
    stone.addImage(stoneImg);
    stone.velocityX=-4;
    stone.scale=0.2;
    stone.lifetime=800;
    stoneGrp.add(stone);
    Sofia.depth=stone.depth;
    Sofia.depth=Sofia.depth+1;
}
}

function trees(){
  if(frameCount % 200 === 0){
    var tree=createSprite(800,440);
    tree.addImage(treeImg);
   tree.velocityX=-4;
    tree.scale=0.6;
    tree.lifetime=800;
    treeGroup.add(tree);
    Sofia.depth=tree.depth;
    Sofia.depth=Sofia.depth+1;
}
}

function coins(){
  if(frameCount % 300 === 0){
    var coin=createSprite(800,random(250,400));
    coin.addImage(coinImg);
   coin.velocityX=-4;
    coin.scale=0.2;
    coin.lifetime=800;
    coinGroup.add(coin);
    Sofia.depth=coin.depth;
    Sofia.depth=Sofia.depth+1;
}
}