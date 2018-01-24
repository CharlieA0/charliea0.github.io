/*
 * Bronxville Programming Club
 * HTML 5 and JavaScript Breakout Game
 * 
 * Copyright November 2015 - MIT License
 */

 
/* VARIABLES */
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


//Store the canvas and it's context so we can draw on it.
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*View Parameters*/
var screenPercentWidthMargin = 10;
var screenPercentHeightMargin = 25;

canvas.width  = window.innerWidth - screenPercentWidthMargin / 100 * window.innerWidth;	//fill the screen with the canvas, minus a margin
canvas.height = window.innerHeight - screenPercentHeightMargin / 100 * window.innerHeight;
 
/*Ball Parameters*/
var ballRadius = 12;							

var ballX = canvas.width/2;						//Start the ball centered in the screen
var ballY = canvas.height-30;						//30 pixels from the bottom

var ballXSpeed = 8;								//Ball's initial movement in the horizontally
var ballYSpeed = -16;							//Ball's movement vertically (permanent)

var angleMin = 2;								//Minimum x speed (horizontally), this keeps the ball moving at an angle
var angleIntensifier = 2;						//What to multiply the ball's speed by when it falls under angleMin

/*Paddle Parameters*/
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;		//Start the paddle centered		

/*Brick Parameters*/
var brickColumnCount = 10;						//How many columns of bricks
var brickRowCount = 9;							//How many rows of bricks

var percentBandWidth = 30;						//The percent of the screen which is  filled with brick
var percentBandGap = 10; 						//The percent of the screen which is left blank at the top
var brickSpacing = 2;							//Determines the amount of spacing between bricks

//The color each row should be, if there are more rows than colors, the extra rows will be colored black
var colors = ["#ff0000", "#d2df00", "#00a513", "#00c4d4", "#643a9a", "#e75cb1", "#e1912e", "#2cf44e", "#0510ae", "#1f002d"];

/*Scoring Parameters*/
var score = 0;		//initial score
var lives = 3;		//number of lives

/*Brick Working Variables*/
var brickWidth = canvas.width / (brickColumnCount + brickSpacing);								//calculate what the width of each brick has to be to fit all of the columns and all the spacing
var brickHeight = (canvas.height * percentBandWidth / 100) / (brickRowCount + brickSpacing);	//calculate what the height of each brick  has to be to fit all of the rows in the percent of the screen specified by percentBandWidth

var brickHorizPadding = brickWidth * brickSpacing / (brickColumnCount + 1);						//calculate the horizontal spacing between each brick
var brickVertPadding = brickHeight * brickSpacing / (brickRowCount + 1);						//calculate the vertical spacing between each brick

/*Create Brick objects*/
var bricks = [];                                        //create an empty array called bricks   

for(c = 0; c < brickRowCount; c++) {                    //For each brick column

    bricks[c] = [];                                     //Create an empty array in the current element of the bricks array.
                                                        //We now have an array filled with other arrays
    
    for(r = 0; r < brickColumnCount; r++) {             //For each brick row
    
        bricks[c][r] = { x: 0, y: 0, visibility: 1 };   //Put a brick object in the current column's position in the first array and in the current row's position in the second array
                                                        //The brick object stores the information x, y, and visibility.
    
    }
}


/* GAME LOOP */
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function draw() {
    resizeCanvas ();								//change canvas size when window resized

    ctx.clearRect(0, 0, canvas.width, canvas.height);		//Clear what was painted last time
    drawBricks();									
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
	//Make the ball bounce off the left and right sides of the canvas
    if(ballX + ballXSpeed > canvas.width-ballRadius || ballX + ballXSpeed < ballRadius) {
        ballXSpeed = -ballXSpeed + Math.random();
    }
	
	//Make the ball bounce off the top of the canvas
    if(ballY + ballYSpeed < ballRadius) {
        ballYSpeed = -ballYSpeed;
        ballXSpeed = ballXSpeed + Math.random();
    }
	
	//Check if the ball is touching the bottom of the canvas or the top of the paddle
    else if(ballY + ballYSpeed > canvas.height - ballRadius || ballY + ballYSpeed > canvas.height - ballRadius - paddleHeight && ballX > paddleX - ballRadius && ballX < paddleX + paddleWidth + ballRadius) {
        
		//If the ball is touching the paddle make it bounce
		if(ballX > paddleX - ballRadius && ballX < paddleX + paddleWidth + ballRadius) {
            ballYSpeed = -ballYSpeed;
            ballXSpeed = ballXSpeed + Math.random();
			
			//Keep a certain amount of angle on the ball
			if (Math.abs(ballXSpeed) < angleMin) {
				ballXSpeed = ballXSpeed * angleIntensifier;
			}
        }
		
		//If the ball isn't touching the paddle
        else {
            lives--;								//Subtract a life
            if(!lives) {
            	 ctx.clearRect(0, 0, canvas.width, canvas.height);	//Clear what was painted last time
			 drawBricks();									
		      drawBall();
	           drawPaddle();
	      	 drawScore();
   			 drawLives();
            	 
                alert("GAME OVER");							//If lives hit 0, end the game
                document.location.reload();
            }
            else {
                ballX = canvas.width/2;				//Otherwise, reset the ball and paddle
                ballY = canvas.height - (paddleHeight + 4 * ballRadius); //Start ball one diameter above the paddle
        		 
        		 ballYSpeed = - ballYSpeed; //Make the ball bounce
            }
        }
    }
    
	//Move the paddle right
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
	
	//Move the paddle left
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
	//Move the ball
    ballX += ballXSpeed;
    ballY += ballYSpeed;
    
    if(score == brickRowCount*brickColumnCount) {			//If they got all the bricks
		console.log("Just cleared\n");
		ctx.clearRect(0, 0, canvas.width, canvas.height);	//Clear the screen
		drawBall();
		drawPaddle();
		drawScore();
		drawLives();				
		
		alert("YOU WIN!");									//end the game
		document.location.reload();
	 }
	
	//Call draw() again
    requestAnimationFrame(draw);
}

//Call draw the first time
draw();


/* Event Listeners */
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

var rightPressed = false;                                       //booleans to test whether or not keys are pressed
var leftPressed = false;

document.addEventListener("keydown", keyDownHandler);       //When a key is pressed, call the function keyDownHandler() 
document.addEventListener("keyup", keyUpHandler);           //When a key is un-pressed call the function key DownHandler()
document.addEventListener("mousemove", mouseMoveHandler);   //When the mouse moves, call mouseMoveHandler()

function keyDownHandler(e) {        //Function that is called when a key is pressed, e is an object that stores information about the key
   
   if(e.keyCode == 39) {            //if the key is the right arrow (the keyCode is 39), make rightPressed true
        rightPressed = true;
    }
    
    else if(e.keyCode == 37) {      //if the key is the left arrow (the keyCode is 37), make leftPressed true
        leftPressed = true;
    }
}

function keyUpHandler(e) {          //Function that is called when a key is un-pressed, e is an object that stores information about the key
    if(e.keyCode == 39) {
        rightPressed = false;           //if the key is the right arrow (the keyCode is 39), make rightPressed true
    }
    else if(e.keyCode == 37) {      //if the key is the left arrow (the keyCode is 37), make leftPressed true
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {                  //Function called when mouse moves, e stores information about the mouse pointer
    var relativeX = e.clientX - canvas.offsetLeft;  //calculate where x position of the mouse pointer is on the canvas
   
    if(relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) { //if it is on the canvas (minus half the paddle's width)
        paddleX = relativeX - paddleWidth/2;            //move the paddle there
    } 
    else if (relativeX < paddleWidth / 2) {         //otherwise set the paddle to one of it's max positionss
           paddleX = 0;
    }
    else if (relativeX > canvas.width - paddleWidth / 2) {
           paddleX = canvas.width - paddleWidth;
    }
}

function touchMoveHandler(e) {
    var touchObject = e.changedTouches[0] //Store information about the first point touching the screen
    
    var relativeX = touchObject.clientX - canvas.offsetLeft; //calculate touch point's x position on the canvas
    
        if(relativeX > paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) { //if it is on the canvas (minus half the paddle's width)
        paddleX = relativeX - paddleWidth/2;            //move the paddle there
    } 
    else if (relativeX < paddleWidth / 2) {         //otherwise set the paddle to one of it's max positionss
           paddleX = 0;
    }
    else if (relativeX > canvas.width - paddleWidth / 2) {
           paddleX = canvas.width - paddleWidth;
    }
}


/* HELPER FUNCTIONS */
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function resizeCanvas () { //When the window's size is changed expand or contract the canvas
    
    //Calculate current desired cavas width and margin for full screen
    var width  = window.innerWidth - screenPercentWidthMargin / 100 * window.innerWidth;
    var height = window.innerHeight - screenPercentHeightMargin / 100 * window.innerHeight;
    
    //Check if the window has been resized 
    if (canvas.width != width || canvas.height != height) {
        //reset canvas width and height apropriately
        canvas.width = width;
        canvas.height = height;
        
        //Recalculate brick sizes
        brickWidth = canvas.width / (brickColumnCount + brickSpacing);  //calculate brick width to fit correct columns and spacing
        brickHeight = (canvas.height * percentBandWidth / 100) / (brickRowCount + brickSpacing);    //calculate brick height to fit all of the rows and spacing in the percent of the screen specified by percentBandWidth
    
        brickHorizPadding = brickWidth * brickSpacing / (brickColumnCount + 1); //calculate the horizontal spacing between each brick
        brickVertPadding = brickHeight * brickSpacing / (brickRowCount + 1);
    }
}

function collisionDetection() {                 //Function that tests if the ball is touching a brick
    for(c=0; c<brickRowCount; c++) {            //For each column of bricks
        
        for(r=0; r<brickColumnCount; r++) {     //And for each brick in each row in the current column
            
            var b = bricks[c][r];               //store the brick object in the current row and column in b
            
            if(b.visibility == 1) {             //if the brick is visible
                
                //Test whether the ball is touching the brick
                if(ballX > b.x - ballRadius && ballX < b.x + brickWidth + ballRadius && ballY > b.y - ballRadius && ballY < b.y + brickHeight + ballRadius) {
                   
                    ballYSpeed = -ballYSpeed;   //if so, make the ball bounce
                    b.visibility = 0;           //make the brick invisible
                    score++;                    //add one to the score
                }
            }
        }
    }
}



function drawBall() {                           
    ctx.beginPath();                                    //Start drawing something on the context
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);    //Draw a full circle at the ball's current (x,y) position
    ctx.fillStyle = "Grey";                             //set the color to Grey
    ctx.fill();                                         //fill the circle with Grey
    ctx.closePath();                                    //Stop drawing
}

function drawPaddle() {
    ctx.beginPath();                                                            //Start drawing something on the context
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);   //Draw a rectangle at the bottom of the canvas at its current x position
    ctx.fillStyle = "Black";                                                    //set the color to black
    ctx.fill();                                                                 //fill the rectangle with Black
    ctx.closePath();                                                            //Stop drawing
}

function drawBricks() {
    for(c=0; c<brickRowCount; c++) {                                            //for each column of bricks
        for(r=0; r<brickColumnCount; r++) {                                     //and for each row
            
            if(bricks[c][r].visibility == 1) {                                  //if the current brick is visible
                
                var brickX = r * brickWidth + (r + 1) * brickHorizPadding;                                  //Calculate the correct x position
                var brickY = c * (brickHeight + brickVertPadding) + canvas.height * percentBandGap / 100;   //Calculate the correct y position
                
                bricks[c][r].x = brickX;                                //Store the correct (x,y) position in the current brick object
                bricks[c][r].y = brickY;
                
                ctx.beginPath();                                        //start drawing something on the context
                ctx.rect(brickX, brickY, brickWidth, brickHeight);      //draw a rectangle
                
                //Change colors
                if (c <= colors.length) {           //if there is a new color in the array of colors, switch to that color
                    ctx.fillStyle = colors[c];
                }
                else {
                    ctx.fillStyle = "Black";        //else use black
                }
                
                ctx.fill();                         //fill the brick
                ctx.closePath();                    //stop drawing
            }
        }
    }
}

function drawScore() {                          //Draw the score
    ctx.font = "25px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Score: "+ score, 8, 40);
}
        
function drawLives() {                          //Draw the lifes
    ctx.font = "25px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText("Lives: "+lives, canvas.width-105, 40);
}
