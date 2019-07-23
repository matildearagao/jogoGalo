const player1 = "X";
const player2 = "O";

var activePlayer = player1;
var gameOver = false;

changeImgActivePlayer();
initSpaces();

function changeImgActivePlayer(){
    if(gameOver){ return;}
    
    var player = document.querySelector('#board img');

    if(activePlayer == player1){
        player.setAttribute("src", "images/x.png");
    } else{
        player.setAttribute("src", "images/o.png");

    }
}

function initSpaces(){

    var spaces = document.getElementsByClassName('space');
    for (let index = 0; index < spaces.length; index++) {

        spaces[index].addEventListener("click", function(){

            if(gameOver){ return;}

            //if is empty
            if(this.getElementsByTagName("img").length == 0){
                this.innerHTML = `<img src='images/${activePlayer}.png'>`;
                this.setAttribute("play", `${activePlayer}`);
                //switch players
                activePlayer == player1 ? activePlayer = player2 : activePlayer = player1;              
                
                changeImgActivePlayer();
                checkWinner();
            }
        })
    }
}

async function checkWinner(){

    var winner = "";

    let spacesObj = {};
    let spaces = document.querySelectorAll('.space');

    //store each space based on div id and play (x or O)
    spaces.forEach(element => {
        spacesObj[element.getAttribute("id")] = element.getAttribute('play')
    });

    //deconstruct obj to get indivudual spaces
    let {a1, a2, a3, b1, b2, b3, c1, c2, c3} = spacesObj;

    //compare spaces to see if play match
    if((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")){
        winner = a1;
    } else if((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")){
        winner = b2;
    } else if(((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) && c3 != ""){
        winner = c3
    }

    if(winner != ""){
        gameOver = true;
        await sleep(50);
        alert("the winner is: " + winner)
    }
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
}
