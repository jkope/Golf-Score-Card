class Player {
    constructor(name,teeBox) {
        this.name = name;
        this.holeScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.totalScore = ()=>{return this.holeScore.reduce((a, b) => a + b, 0)};
        this.outScore = ()=>{return this.holeScore.slice(0,9).reduce((a,b) => a + b, 0)};
        this.inScore = () =>{return this.holeScore.slice(9, 18).reduce((a, b) => a + b, 0)};
    }
}
let players = [];
let idPromise = getCourseInfo();
// let coursePromise = getCourseId();
let courseName;

function buildPlayer(){
    players.push (new Player($('#player').val(),$('#teeBox').val()));
    $('#player').val('');
    $('#teeBox').val('');
    listPlayers();
}

function onCard(){
    $('.cardList').empty();
    for (i=0; i<players.length; i++){
        $('.cardList').append(`
            <tr class="player1">
                <th class="">${players[i].name}</th>
                <th class="p${i}-1">${players[i].holeScore[0]}</th>
                <th class="p${i}-2">${players[i].holeScore[1]}</th>
                <th class="p${i}-3">${players[i].holeScore[2]}</th>
                <th class="p${i}-4">${players[i].holeScore[3]}</th>
                <th class="p${i}-5">${players[i].holeScore[4]}</th>
                <th class="p${i}-6">${players[i].holeScore[5]}</th>
                <th class="p${i}-7">${players[i].holeScore[6]}</th>
                <th class="p${i}-8">${players[i].holeScore[7]}</th>
                <th class="p${i}-9">${players[i].holeScore[8]}</th>
                <th class="p${i}-Out">${players[i].outScore()}</th>
                <th class=""></th>
                <th class="p${i}-10">${players[i].holeScore[9]}</th>
                <th class="p${i}-11">${players[i].holeScore[10]}</th>
                <th class="p${i}-12">${players[i].holeScore[11]}</th>
                <th class="p${i}-13">${players[i].holeScore[12]}</th>
                <th class="p${i}-14">${players[i].holeScore[13]}</th>
                <th class="p${i}-15">${players[i].holeScore[14]}</th>
                <th class="p${i}-16">${players[i].holeScore[15]}</th>
                <th class="p${i}-17">${players[i].holeScore[16]}</th>
                <th class="p${i}-18">${players[i].holeScore[17]}</th>
                <th class="p${i}-In">${players[i].inScore()}</th>
                <th class="p${i}-Total">${players[i].totalScore()}</th>
            </tr>
        `);
    }
}

function listPlayers(){
    $('.playerList').empty();
    for (i=0; i<players.length; i++){
        $('.playerList').append(`<div class="names">${players[i].name}<i class="fas fa-trash-alt" onclick="dltPlayer(${i})"></i></div>`);
    }
}

function dltPlayer(index){
    players.splice(index,1);
    listPlayers();
}

// calls
function getCourseInfo() {                
    return new Promise((resolve, reject) => {
        $.ajax({
            // url: "https://golf-courses-api.herokuapp.com/courses/11819",
            url: "temp.json",
            type: 'GET',
            success: (response, status) => {
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
}


// to access course name
idPromise.then(nameResult => {
   console.log(nameResult.course.name);
})

$('.courseName').html(idPromise.then(resultname =>{
    return resultname.course.name;
}))

// function getCourseId() {
//     return new Promise((resolve, reject) => {
//         $.ajax({
//             url: "https://golf-courses-api.herokuapp.com/courses",
//             type: 'GET',
//             success: response => {
//                 resolve(response);
//             },
//             error: error => {
//                 reject(error);
//             }
//         });
//     });
// }







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