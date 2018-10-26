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
let players = [];
let idPromise = getCourseInfo();
// let coursePromise = getCourseId();

function buildPlayer(){
    players.push (new Player($('#player').val(),$('#teeBox').val()));
    $('#player').val('');
    $('#teeBox').val('');
    listPlayers();
}

function listPlayers(){
    $('.playerLst').child() // add the player name and tee to the card and the dialog
}

// calls
function getCourseInfo() {                
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://golf-courses-api.herokuapp.com/courses/11819",
            type: 'GET',
            success: response => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}

function getCourseId() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://golf-courses-api.herokuapp.com/courses",
            type: 'GET',
            success: response => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}







//for the MDL dialog box
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