var board;
var rows = 4;
var columns = 4;
var score = document.getElementById('score');
var points = 0;
score.innerText = 'Score : ' + points.toString();
var newspawn = [2, 4]
var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
var endscreen = document.getElementById('gameend');

window.onload = function(){
    endscreen.style.zIndex = 10;
    endscreen.innerText = "USE ARROW KEYS TO MOVE"
    setgame();
    spawn();
    spawn();
}

function setgame(){
    for(r = 0; r < 4; r++){
        for(c = 0; c < 4; c++){
            let tile = document.createElement("div");
            tile.id = '_' + r.toString() + c.toString();
            let num = board[r][c];
            update(tile, num);
            document.getElementById('board').append(tile);
        }
    }
}

function update(tile, num){
    tile.innerText = '';
    tile.classList = '';
    tile.classList.add('tile');
    if(num > 0){
        tile.innerText = num;
        tile.classList.add('n'+ num.toString())
    }
}

function boardup(){
    let game = 0;
    for(r=0;r<4;r++){
        for(c=0;c<4;c++){
            let tile = document.getElementById('_' + r.toString() + c.toString());
            num = board[r][c];
            update(tile, num);
        }
        console.log(Math.max(...board[r]));
        if(Math.max(...board[r]) == 2048){
            game = 1;
        }
    }
    if (game){
        endscreen.style.zIndex = 10;
        endscreen.innerText = 'YOU WON'
    }
}

document.addEventListener('keyup', (e)=> {
    endscreen.style.zIndex = -1;
    if (e.code == 'ArrowLeft'){
        moveleft();
        spawn();
    }
    else if (e.code == 'ArrowRight'){
        moveright();
        spawn();
    }
    else if (e.code == 'ArrowUp'){
        moveup();
        spawn();
    }
    else if (e.code == 'ArrowDown'){
        movedown();
        spawn();
    }
});

function moveleft(){
    for (i=0;i<3;i++){
        for(r=0;r<4;r++){
            for(c=3;c>0;c--){
                if((board[r][c - 1] == 0)||(board[r][c - 1] == board[r][c])){
                    var tmp = board[r][c];
                    if (board[r][c - 1] != 0){
                        points += tmp;
                        score.innerText = 'Score : ' + points.toString();
                    }
                    board[r][c] = 0;
                    board[r][c - 1] = board[r][c - 1] + tmp;
                    
                }          
            }       
        }          
    }
    boardup()
}

function moveright(){
    for (i=0;i<3;i++){
        for(r=0;r<4;r++){
            for(c=0;c<3;c++){
                if((board[r][c + 1] == 0)||(board[r][c + 1] == board[r][c])){
                    var tmp = board[r][c];
                    if (board[r][c + 1] != 0){
                        points += tmp;
                        score.innerText = 'Score : ' + points.toString();
                    }
                    board[r][c] = 0;
                    board[r][c + 1] = board[r][c + 1] + tmp;
                }          
            }       
        }          
    }
    boardup()
}

function moveup(){
    for (i=0;i<3;i++){
        for(c=0;c<4;c++){
            for(r=3;r>0;r--){
                if ((board[r - 1][c] == 0) || (board[r - 1][c] == board[r][c])){
                    var tmp = board[r][c];
                    if (board[r - 1][c] != 0){
                        points += tmp;
                        score.innerText = 'Score : ' + points.toString();
                    }
                    board[r][c] = 0;
                    board[r - 1][c] = board[r - 1][c] + tmp;
                }  
            }
        }       
    }
    boardup()
}
function movedown(){
    for (i=0;i<3;i++){
        for(c=0;c<4;c++){
            for(r=0;r<3;r++){
                if ((board[r + 1][c] == 0) || (board[r + 1][c] == board[r][c])){
                    var tmp = board[r][c];
                    if (board[r + 1][c] != 0){
                        points += tmp;
                        score.innerText = 'Score : ' + points.toString();
                    }
                    board[r][c] = 0;
                    board[r + 1][c] +=  tmp;
                }  
            }
        }       
    }
    boardup()
}

function spawn(){
    nullpos = []
    for(r=0;r<4;r++){
        for(c=0;c<4;c++){
            if (board[r][c] == 0){
                nullpos.push([r, c]);
            }
        }
    } 
    if (!(nullpos.length == 0)){
        var index = Math.floor(Math.random() * nullpos.length);
        var coords = nullpos[index];
        board[coords[0]][coords[1]] = newspawn[Math.floor(Math.random() * 2)];
    }  
    else{
        var game = 0;
        for(r=0;r<4;r++){
            if (!game){
                for(c=0;c<4;c++){
                    if ((c != 3) && (board[r][c] == board[r][c+1])){
                        game = 1;
                        break;
                    }
                    if ((r != 3) && (board[r + 1][c] == board[r][c])){
                        game = 1;
                        break;
                    }
                }
            }
        }
        if (!game){
            endscreen.style.zIndex = 10;
            endscreen.innerText = 'GAME OVER'
        }
    }
   boardup();
}