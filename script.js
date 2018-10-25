class Player {
    constructor(name,teeBox) {
        this.name = name;
        this.holeScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.totalScore = ()=>{return this.holeScore.reduce((a, b) => a + b, 0)};
        this.outScore = ()=>{return this.holeScore.slice(0,9).reduce((a,b) => a + b, 0)};
        this.inScore = () =>{return this.holeScore.slice(9, 18).reduce((a, b) => a + b, 0)};
        this.teeBox = teeBox;
    }
}

let player1 = new Player("Jake Kopenhefer", "green");
// player1.holeScore = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]



// console.log($('.pOne1').text())

// function strokeTotal(player){
//     let total =0;
//     let id;
//     for(i=1; i<19; i++){
//     id = "'." + player + i+"'"
//     console.log(id);
//     total = total + $(id).text();
//     console.log(total);
//     }
//     return total;
// }

// $('.pOneTotal').html(strokeTotal);

// strokeTotal('pOne');

// function addPlayers(){
//     for ....{
//     new Player
//     }
// }

function addplayers(){
    let numbplayers = $('.numbinput').val();
    for(let i = 0;i<numbplayers; i++){
        $('.card').append(`<div>Player ${i+1}</div>`)
    }
    $('.modal').hide();
}


//for the dialog box
let dialog = document.querySelector('dialog');
let showDialogButton = document.querySelector('#show-dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});