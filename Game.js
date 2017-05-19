var canvas;
var canvasContext;

var ballPosX = 50;  //ball start pos
var ballPosY = 50;
var ballSpeedX = 15;
var ballSpeedY = 15;
var leftPaddleY = 330 ;
var rightPaddleY = 300 ;

const paddleHeight = 160;
const paddleThickness = 15;

var playerScore = 0;
var cpuScore = 0;

function setMousePos(evt){     //nastiest code i've seen till now >,..,<
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

window.onload = function(){  //onload to load after the page fully loads
    console.log('Hello World!');
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var fPs = 30; //frames per second
    setInterval(drawMove, 1000/fPs); //1000ms = 1sec

    canvas.addEventListener('mousemove',
    function(evt){
        var mousePos = setMousePos(evt);
        leftPaddleY = mousePos.y-(paddleHeight/2);
        // rightPaddleY = mousePos.y-(paddleHeight/2);
    });

function drawMove(){
    moveIt();
    drawIt();
}

function resetBall(){
    ballSpeedX = -ballSpeedX; //to reset the ball to diff pos
    ballPosX = canvas.width/2; //to start from middle
    ballPosY = canvas.height/2;
}

function cpuMov(){
    var rightPaddleYCen = rightPaddleY + (paddleHeight/2);
    if(rightPaddleYCen < ballPosY-10){
        rightPaddleY += 12;
    }else if(rightPaddleYCen > ballPosY+10){
        rightPaddleY -= 12;
    }
}

function moveIt(){
         cpuMov();
        ballPosX += ballSpeedX;
        ballPosY += ballSpeedY;

        if(ballPosX < 0){ //creating condition to stop and return the ball  
            if(ballPosY > leftPaddleY && ballPosY < leftPaddleY + paddleHeight){  //to bounce when hitting the paddle
                ballSpeedX = -ballSpeedX; //change ball direction
            }else {
        resetBall();
            }
    }
        if(ballPosX > canvas.width){
            if(ballPosY > rightPaddleY && ballPosY < rightPaddleY + paddleHeight){
                ballSpeedX = -ballSpeedX;
            }else {
        resetBall();
            }
        }
        if(ballPosY > canvas.height){
            ballSpeedY = -ballSpeedY;
        }
        if(ballPosY < 0){
            ballSpeedY = -ballSpeedY; // (-)because its -ballSpeedY from code above so -(-) returns + and will move to oppos. direct.
        }
}
function drawIt(){
    // this will draw the playground
    colorRect(0,0,canvas.width,canvas.height, 'grey');
    colorRect(5,leftPaddleY,paddleThickness,paddleHeight,'orange'); //left player paddle
    colorRect(canvas.width-paddleThickness-5,rightPaddleY,paddleThickness,paddleHeight,'purple'); //CPU player paddle
    colorBall(ballPosX, ballPosY, 13, 'lightgreen');
    canvasContext.fillText('score stuff',100,100);
}

function colorBall(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2, true); // 15 is the circle half radius , Math.PI*2 means 180*2= 360 degree which means circle
    canvasContext.fill();
}

function colorRect(leftX,topY, width,height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY, width,height);
}



};