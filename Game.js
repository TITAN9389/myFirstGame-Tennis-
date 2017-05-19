var canvas;
var ctx;

var ballPosX = 250;  //ball start pos
var ballPosY = 300;
var ballSpeedX = 15;
var ballSpeedY = 15;
var leftPaddleY = 330 ;
var rightPaddleY = 300 ;

const PADDLE_HEIGHT = 160;
const PADDLE_THICKNESS = 15;

var playerScore = 0;
var cpuScore = 0;
const WIN_SCORE = 1;
var winScreen = false;

function setMousePos(evt){     //nastiest code i've seen till now (._.')
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    }
}

function handleMouseClick(evt){
    if(winScreen){
        playerScore = 0;
        cpuScore = 0;
        winScreen = false;
    }
}

window.onload = function(){  //onload to load after the page fully loads
    console.log('Hello World!');
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    var fPs = 30; //frames per second
    setInterval(drawMove, 1000/fPs); //1000ms = 1sec

    canvas.addEventListener('mousedown', handleMouseClick);

    canvas.addEventListener('mousemove',
    function(evt){
        var mousePos = setMousePos(evt);
        leftPaddleY = mousePos.y-(PADDLE_HEIGHT/2);
        // rightPaddleY = mousePos.y-(PADDLE_HEIGHT/2);
    });

function drawMove(){
    moveIt();
    drawIt();
}

function resetBall(){
    if(playerScore >= WIN_SCORE || cpuScore >= WIN_SCORE) {
        // alert('GameOver');
        winScreen = true;
    }

    ballSpeedX = -ballSpeedX; //to reset the ball to diff pos
    ballPosX = canvas.width/2; //to start from middle
    ballPosY = canvas.height/2;
}

function cpuMov(){
    var rightPaddleYCen = rightPaddleY + (PADDLE_HEIGHT/2);
    if(rightPaddleYCen < ballPosY-12){
        rightPaddleY += 12;
    }else if(rightPaddleYCen > ballPosY+12){
        rightPaddleY -= 12;
    }
}

function moveIt(){
            if(winScreen){
                return;
            }
         cpuMov();
        ballPosX += ballSpeedX;
        ballPosY += ballSpeedY;

        if(ballPosX < 28){ //creating condition to stop and return the ball     28 to be more accurate with the paddle hit
            if(ballPosY > leftPaddleY && ballPosY < leftPaddleY + PADDLE_HEIGHT){  //to bounce when hitting the paddle
                ballSpeedX = -ballSpeedX; //change ball direction
                
                var deltaY = ballPosY-(leftPaddleY+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;

            }else {
                cpuScore++; // must be Before resetBall()
                resetBall();
            }
    }
        if(ballPosX > canvas.width-25){ // 25 to be more accurate with the paddle hit
            if(ballPosY > rightPaddleY && ballPosY < rightPaddleY + PADDLE_HEIGHT){
                ballSpeedX = -ballSpeedX;

                var deltaY = ballPosY-(rightPaddleY+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35;

            }else {
                playerScore++;
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
    colorRect(0,0,canvas.width,canvas.height, '#33cc33');
    // ctx.fillRect(50,50,canvas.width-50,canvas.height-50, 'white');
    // ctx.clearRect(70,70,canvas.width-150,canvas.height-150, 'white');
    // ctx.fillRect(50,70,,, 'white');
    // ctx.clearRect(0,0,,, 'white');
    ctx.strokeStyle= 'white';
    ctx.strokeRect(50,50,1250,542);
    ctx.strokeRect(50,125,1250,392);
    ctx.strokeRect(300,125,750,392);
    ctx.strokeRect(300,321,750,1);
    // colorRect(0,0,,, 'white');
    // colorRect(0,0,,, 'white');
    // colorRect(0,0,,, 'white');
    if(winScreen){
        if(playerScore >= WIN_SCORE) {
            ctx.fillStyle = 'black';
            ctx.font="20px Arial";
            ctx.fillText('You Won!',canvas.width/2,canvas.height/6);
        }else if(cpuScore >= WIN_SCORE){
            ctx.fillStyle = 'black';
            ctx.font="20px Arial";
            ctx.fillText('Computer Won! Try Harder',canvas.width/3,canvas.height/6);
        }
        ctx.fillStyle = 'black';
        ctx.fillText('Click to Continue',canvas.width/3,canvas.height/3);
        return;
    }
function drawNet(){
    for(var i=50;i<canvas.height-50; i+=40){
        colorRect(canvas.width/2-1,i,2,20, 'white');
    }
}
    drawNet(); //must draw after the ball to be underlayer

    colorRect(5,leftPaddleY,PADDLE_THICKNESS,PADDLE_HEIGHT,'orange'); //left player paddle
    colorRect(canvas.width-PADDLE_THICKNESS-5,rightPaddleY,PADDLE_THICKNESS,PADDLE_HEIGHT,'purple'); //CPU player paddle
    colorBall(ballPosX, ballPosY, 13, '#80ff00');
    ctx.fillStyle = 'black';
    ctx.font="20px Arial";
    ctx.fillText(playerScore,100,100);
    ctx.fillStyle = 'black';
    ctx.font="20px Arial";
    ctx.fillText(cpuScore,canvas.width-120,100);
}

function colorBall(centerX, centerY, radius, drawColor){
    ctx.fillStyle = drawColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0,Math.PI*2, true); // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.fill();
    ctx.stroke();
}

function colorRect(leftX,topY, width,height, drawColor){
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX,topY, width,height);
}
};
// Drwaing a Star instead of Ball
/*function drawStar(cx,cy,spikes,outerRadius,innerRadius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=5;
      ctx.strokeStyle='blue';
      ctx.stroke();
      ctx.fillStyle='skyblue';
      ctx.fill();
    }

    drawStar(100,100,5,30,15);
    drawStar(175, 100, 12, 30, 10);
    drawStar(75, 200, 6, 30, 15);
    drawStar(175, 200, 20, 30, 25);
    */