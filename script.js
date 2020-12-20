//alert("Js Connected");
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let x =true;
let y =true;
let boardBounds= board.getBoundingClientRect();
let leftPlayerLives = 3;
let rightPlayerLives = 3;
window.addEventListener("change",function(){
    boardBounds= board.getBoundingClientRect();
})
//user input listen
document.addEventListener("keydown",function(e){
    console.log("Koi to key h");
    console.log(e);
    if(e.key=="w"){
        movePaddle(leftPaddle,-window.innerHeight*0.1);
    }
    else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight*0.1);
    }
    else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1);
    }
    else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1);
    }

})
function setColour(idx){
    let allIcons= document.querySelectorAll(".fas.fa-circle");
    console.log(allIcons,idx);
    allIcons[idx].style.color="#2980b9";
}
function movePaddle(cPaddle,change){
    let cPaddleBounds=cPaddle.getBoundingClientRect();
    if(cPaddleBounds.top+change >=boardBounds.top && cPaddleBounds.bottom+change <=boardBounds.bottom){
        cPaddle.style.top=cPaddleBounds.top+change+"px";
    }
    
}
function moveBall(){
    let ballcord = ball.getBoundingClientRect();
    let ballTop =ballcord.top;
    let ballLeft=ballcord.left;
    let ballBottom= ballcord.bottom;
    let ballRight=ballcord.right;
    //is ball in bound
    //handle verticalBound

    let hasTouchedLeft = ballLeft < boardBounds.left;
    let hasTouchedRight = ballRight > boardBounds.right;

    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            setColour(leftPlayerLives);
           
            if(leftPlayerLives==0){
                alert("Game Over Player B won");
                document.location.reload();
            }
            else{
                 
                 return resetGame();
            }
        }
        else{
             rightPlayerLives--;
             setColour(3+rightPlayerLives);
             
             if(rightPlayerLives==0){
                 alert("Game over, Player A won");
                 
                 document.location.reload();
             }
             else{
               
                 return resetGame();
             }
        }
    }
    
    
    if(ballTop<=boardBounds.top || ballBottom>=boardBounds.bottom){
        //vertically outside
        y=!y;
    }
    //handle horizonatlBound
    // if(ballLeft<=boardBounds.left || ballRight>=boardBounds.right){
    //     x=!x;
    // }
    //collision--------------------------------------------------------------
    let leftPaddleBounds = leftPaddle.getBoundingClientRect();
    let rightPaddleBounds = rightPaddle.getBoundingClientRect();
    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30 >=leftPaddleBounds.top && ballBottom-30<=leftPaddleBounds.bottom){
        x=!x;
    }
    if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30 >=rightPaddleBounds.top && ballBottom-30<=rightPaddleBounds.bottom){
        x=!x;
    }
    //---------------------------------------------------------------------
    ball.style.top= y==true?ballTop+4+"px":ballTop-4+"px";
    ball.style.left= x==true?ballLeft+4+"px":ballLeft-4+"px";
    requestAnimationFrame(moveBall);
}
function resetGame(){
    ball.style.top = (window.innerHeight*0.45)+"px";
    console.log(window.innerHeight,ball.style.top);
    ball.style.left =(window.innerWidth*0.45)+"px";
    console.log("hieeeeee");
    requestAnimationFrame(moveBall);
}
requestAnimationFrame(moveBall);
