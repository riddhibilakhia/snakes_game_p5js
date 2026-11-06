let xDirectionsArray = [1, 0, -1, 0];
let yDirectionsArray = [0, 1, 0, -1];
let current_direction = 0;
let diameter = 10;
let foodX;
let foodY;
let cX = []
let cY = []
let body_Length = 1;
let bg;

let ping;
let bgsong;
let gOAudio;

function preload()
{
    ping = loadSound("ping.mp3");
    bgsong = loadSound("background-music.mp3");
    gOAudio = loadSound("game over audio.mp3");
}

function setup() {
  createCanvas(500, 600);
  //bg = loadImage('assets/grass.jpg');
  
  //ping = loadSound("ping.mp3");
  //bgsong = loadSound("background-music.mp3");
  //gOAudio = loadSound("game over audio.mp3")
  noLoop();
  frameRate(12);
  cX[0] = 35;
  cY[0] = 15;

  
  plotFood();
  
  button = createButton("start!");
  button.mouseClicked(strt);
  button.size(100, 50);
  button.position(10, 520);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "28px");
  
  up_button = createButton("▲");
  up_button.mouseClicked(up_buttonPressed);
  up_button.size(55,30);
  up_button.position(300, 505);
  up_button.style("font-size", "23px");
  
  down_button = createButton("▼");
  down_button.mouseClicked(down_buttonPressed);
  down_button.size(55,30);
  down_button.position(300, 565);
  down_button.style("font-size", "23px");
  
  left_button = createButton("◄");
  left_button.mouseClicked(left_buttonPressed);
  left_button.size(55,30);
  left_button.position(245, 535);
  left_button.style("font-size", "23px");
  
  right_button = createButton("►");
  right_button.mouseClicked(right_buttonPressed);
  right_button.size(55,30);
  right_button.position(355, 535);
  right_button.style("font-size", "23px");
}


function draw() 
{
  //background(bg);
  background('green');
  caterpillar();
  fill("red");
  foodX = constrain(foodX, 5, 495);
  foodY = constrain(foodY, 5, 495);
  circle(foodX, foodY, 10);
  fill("beige");
  rect(0, 500, 500, 100);
  crossOver();
  hitWall();
}

function strt() 
{
  loop();
  bgsong.play();
  bgsong.loop();
}

function plotFood() 
{
  let success = false;
  while (!success)
  {
    foodX = round(random(5, 496));
    foodX -= foodX % 10;
    foodX += 5;
    foodY = round(random(5, 496));
    foodY -= foodY % 10;
    foodY += 5;

    for (let i = 0; i < body_Length; i++) 
    {
      if (cX[i] == foodX && cY[i] == foodY)
      {
       success = false;
       break;
      }

      if (i == body_Length - 1)
      {
        success = true;
      }
    }
  }
}


function up_buttonPressed()
{
  if (current_direction != 1)
  {
    current_direction = 3;
  }
}

function down_buttonPressed()
{
  if (current_direction != 3)
  {
    current_direction = 1;
  }
}

function left_buttonPressed()
{
  if (current_direction != 0)
  {
    current_direction = 2;
  }
}

function right_buttonPressed()
{
  if (current_direction != 2)
  {
    current_direction = 0;
  }
}


function keyPressed()
{
  if (current_direction != 2 && keyCode === RIGHT_ARROW)
    {
      current_direction = 0;
    }
  else if (current_direction != 3 && keyCode === DOWN_ARROW)
    {
      current_direction = 1;
    }
  else if (current_direction != 0 && keyCode === LEFT_ARROW)
    {
      current_direction = 2;
    }
  else if (current_direction != 1 && keyCode === UP_ARROW)
    {
      current_direction = 3;
    }
  else
    {
      current_direction = current_direction
      //if any other key is pressed, the direction wouldn't change and the         snake will continue to move in the same direction as before                 (direction wouldn't be updated/ changed)
    }
}

function restartGame()  //?
{
  body_Length = 1;
  button.mouseClicked(strt);
  gOAudio.stop();
  plotFood();
  caterpillar();
  
}


function caterpillar() 
{
  if (cX[0] == foodX && cY[0] == foodY)
  {
    plotFood();
    body_Length += 1;
    ping.play();
  }
  for (let i = body_Length - 1; i > 0; i--)
  {
    cX[i] = cX[i - 1];
    cY[i] = cY[i - 1];
  }
  cX[0] += xDirectionsArray[current_direction] * 10;
  cY[0] += yDirectionsArray[current_direction] * 10;
  for (let i = 0; i < body_Length; i++) {
  fill(247, 216, 0);
  //cX[i] = constrain(cX[i], 10, 490);
  //cY[i] = constrain(cY[i], 10, 490);
  circle(cX[i], cY[i], diameter);
  }
}

function hitWall()
{
  if ((cX[0] < 5 || cX[0] > 495) || (cY[0] < 5 || cY[0] > 495))
  {
    bgsong.stop();
    gOAudio.play();
    textSize(50);
    stroke('white')
    fill('131, 147, 255')
    //textWrap(hitWallGOText);
    text("GAME OVER!", 80, 250);
    text("YOU HIT THE EDGE", 20, 300);
    
    noLoop();
  }
}

function crossOver() {
 if (cX[0] > 5 && cX[0] < 395 && cY[0] >5 && cY[0] < 395 && body_Length > 1) 
 {
   for (let i = 1; i < body_Length; i++)
   {
     if (cX[0] == cX[i] && cY[0] == cY[i])
     {
      //console.log("GAME OVER! YOU HIT YOURSELF");
      bgsong.stop();
      gOAudio.play();
      textSize(50);
      stroke('white')
      fill('131, 147, 255')
      text("GAME OVER!", 80, 250);
      text("YOU HIT YOURSELF", 10, 300);
       
      noLoop();
     }
   }
 } //edge if
} //crossover