var board = new Array();
var score = 0;
var hasConflict = new Array();

var startx = 0;
var starty = 0;

$(document).ready(function(){
    prepareForMobile();
    newgame();
});
function prepareForMobile(){

    if( documentWidth > 500 ){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
    }

    $('#grid-container').css('width',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);
}
function newgame(){
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    updateScore(score);
}

function init(){
    //遍历整个gridCell数组，确定每个小格的位置
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){

            var gridCell = $('#grid-cell-'+i+"-"+j);
            gridCell.css('top', getPosTop( i , j ) );
            gridCell.css('left', getPosLeft( i , j ) );
        }


    for (var i = 0; i <4; i++) {
            board[i]=new Array();
            hasConflict[i] = new Array();
            for (var j= 0;j< 4;j++) {
                board[i][j]=0;
                hasConflict[i][j] = false;
            };
        }; 
    //刷新格子内容
    updateBoardView(); 
    score = 0;      
}
function updateBoardView(){

    $(".number-cell").remove();
    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 0 ; j < 4 ; j ++ ){
            $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
            var theNumberCell = $('#number-cell-'+i+'-'+j);

            if( board[i][j] == 0 ){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellSideLength/2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellSideLength/2 );
            }
            else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberBackgroundColor( board[i][j] ) );
                theNumberCell.css('color',getNumberColor( board[i][j] ) );
                theNumberCell.text( board[i][j] );
            }

            hasConflict[i][j] = false;
        }

    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',0.6*cellSideLength+'px');
}
//随机生成数字
function generateOneNumber(){
    if( nospace( board ) )
        return false;
    //随机一个位置
        var temp = [];
        for (var i = 0; i <4; i++) {
            for (var j= 0;j< 4;j++) {
                if (board[i][j] == 0) {
                    temp.push(i+","+j);
                }
            }
        }
        var randNum = parseInt(Math.floor(Math.random()*temp.length));
        randx = parseInt(temp[randNum].split(",")[0]);
        randy = parseInt(temp[randNum].split(",")[1]);

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation( randx , randy , randNumber );
    return true;
}

$(document).keydown(function( event){
    event.preventDefault();
    switch(event.keyCode){
        case 37:
            if(canMoveLeft(board)){
                moveLeft();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
            break;
        case 38:
             if(canMoveUp(board)){
                moveUp();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
            break;
        case 39:
            if(canMoveRight(board)){
                moveRight();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
            break;
        case 40:
            if(canMoveDown(board)){
                moveDown();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
            break;
        default:break;
    }
})
function isgameover(){
    if(nospace(board)&&nomove(board)) {
        alert('Gameover!');
    }
}
function nomove (board) {
    if (canMoveDown(board)||canMoveRight(board)||canMoveUp(board)||canMoveLeft(board))
        return false;
    return true;
}
function moveLeft(){
    //左移
    for(var i=0;i<4;i++)
        for(var j=1;j<4;j++){
             if( board[i][j] != 0 ){
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflict[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;

                        score +=board[i][k];
                        updateScore(score);

                        hasConflict[i][k] = true;
                        continue;
                    }

                }
            }
        }
    //setTimeout(updateBoardView(),200);
}
function moveUp(){
    //上移
    for(var j=0;j<4;j++)
        for(var i=1;i<4;i++){
             if( board[i][j] != 0 ){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockVertical(j,k,i,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical(j,k,i,board)&&!hasConflict[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;

                        score +=board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }

                }
            }
        }
    //setTimeout("updateBoardView()",200);
}
function moveRight(){
    //左移
    for(var i=0;i<4;i++)
        for(var j=2;j>-1;j--){
             if( board[i][j] != 0 ){
                for(var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflict[i][k]){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        //添加分数
                        score +=board[i][k];
                        updateScore(score);
                        hasConflict[i][k] = true;
                        continue;
                    }

                }
            }
        }
    //setTimeout("updateBoardView()",200);
}
function moveDown(){
    //左移
    for(var j=0;j<4;j++)
        for(var i=2;i>-1;i--){
             if( board[i][j] != 0 ){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockVertical(j,i,k,board)){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        continue;
                    }else if(board[k][j]==board[i][j]&&noBlockVertical(j,i,k,board)&&!hasConflict[k][j]){
                        showMoveAnimation(i,j,k,j);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;

                        score +=board[k][j];
                        updateScore(score);
                        hasConflict[k][j] = true;
                        continue;
                    }

                }
            }
        }
    //setTimeout("updateBoardView()",200);
}

document.addEventListener("touchstart",function(){
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});
document.addEventListener("touchmove",function (e) {
    e.preventDefault();
})
document.addEventListener("touchend",function(){
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    var deltax = endx - startx;
    var deltay = endy - starty;

    if( Math.abs( deltax ) < 0.3*documentWidth && Math.abs( deltay ) < 0.3*documentWidth )
        return;

    if( Math.abs( deltax ) >= Math.abs( deltay ) ){

        if( deltax > 0 ){
            //move right
            if(canMoveLeft(board)){
                moveRight();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
        }
        else{
            //move left
            if( canMoveLeft(board) ){
                moveLeft();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
        }
    }
    else{
        if( deltay > 0 ){
            //move down
            if( canMoveDown(board) ){
                moveDown();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
        }
        else{
            //move up
            if( canMoveUp(board) ){
                moveUp();
                setTimeout(generateOneNumber(),300);
                setTimeout(updateBoardView(),200);
                setTimeout(isgameover(),400);
            }
        }
    }
})