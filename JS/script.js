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
let coursePromise = getCourseId();
let courseName;
let courses = [];
let tee = "champion";


function buildCard(holes){
    $('.card').html('');
    $('.card').append(`<div id="col0" class="column">.</div>`);
    for(let i=1; i<=holes.length; i++){
        $('.card').append(`<div id="col${i}" class="column">hole ${i}</div>`);
    }
    $('.card').append(`<div id="out" class="column">Out</div>`);
    $('.card').append(`<div id="in" class="column">In</div>`);
    $('.card').append(`<div id="total" class="column">Total</div>`);

//Yards
    $('#col0').append(`<div id="yards" class="column">Yardage</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' + i).append(`<div class='yards' id="yards${i}">${holeYards[i - 1]}</div>`);
    }
    $('#out').append(`<div class="column">.</div>`);
    $('#in').append(`<div  class="column">.</div>`);
    $('#total').append(`<div class="column">${holeYards.reduce((a, b) => a + b, 0)}</div>`);

// Handicap
    $('#col0').append(`<div id="handicap" class="column">Handicap</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' + i).append(`<div class='handicap' id="handicap${i}">${holeCap[i - 1]}</div>`);
    }
    $('#out').append(`<div class="column">.</div>`);
    $('#in').append(`<div  class="column">.</div>`);
    $('#total').append(`<div class="column">.</div>`);

// par
    $('#col0').append(`<div id="par" class="column">Par</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' +i).append(`<div class='par' id="par${i}">${holePar[i-1]}</div>`);
    }
    $('#out').append(`<div class="column">.</div>`);
    $('#in').append(`<div  class="column">.</div>`);
    $('#total').append(`<div class="column">${holePar.reduce((a, b) => a + b, 0)}</div>`);
}

function addHoles(players,holes){

    for(let p=1; p<=players.length; p++){
        $('#col0').append(`<div id="p${p}" class="column">${players[p-1].name}</div>`);

        for(h=1; h<=holes.length; h++){
            $('#col' + h).append(`<input type="number" class='hole' id="p${p}h${h}" onblur="saveScore(${p-1},${h-1},'p${p}h${h}')" >`);
        }
        $('#out').append(`<div id="out${p-1}" class="column">${players[p-1].outScore()}</div>`);
        $('#in').append(`<div id="in${p-1}" class="column">${players[p-1].inScore()}</div>`);
        $('#total').append(`<div id="total${p-1}" class="column">${players[p-1].totalScore()}</div>`);
    }
}

function buildPlayer(){
    players.push (new Player($('#player').val(),$('#teeBox').val()));
    $('#player').val('');
    $('#teeBox').val('');
    listPlayers();
}

function onCard(){
    $('.cardList').empty();
    buildCard(holesList)
    addHoles(players, holesList)
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

function saveScore(playerIndex, holeIndex, id){
    players[playerIndex].holeScore[holeIndex] = Number($("#" + id).val());
    $('#out'+playerIndex).html(players[playerIndex].outScore());
    $('#in'+playerIndex).html(players[playerIndex].inScore());
    $('#total'+playerIndex).html(players[playerIndex].totalScore());
}

function getCourseInfo() {                
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://golf-courses-api.herokuapp.com/courses/11819",
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
    $('#courseName').html(nameResult.data.name);
})

// to access tee selections -> teeList[]
// to access outyardage, inyardage, totalyardage, inPar, outPar, totalPar
let tees;
let teeList = []
idPromise.then(teeChoices =>{
   tees = teeChoices.data.holes[0].teeBoxes;
   tees.forEach(element => {
       teeList.push(element.teeType)
   });
    let teeIndex = tees.findIndex((element) => element.teeType == tee)+1
    $('.yOut').html(tees[teeIndex].front_nine_yards);
    $('.yIn').html(tees[teeIndex].back_nine_yards);
    $('.yTotal').html(tees[teeIndex].yards);
    $('.pOut').html(tees[teeIndex].front_nine_par);
    $('.pIn').html(tees[teeIndex].back_nine_par);
    $('.pTotal').html(tees[teeIndex].par);
})

// to access yardage by tee type
let holesList =[];
let holeYards = []; //array of yardages based on tee selection (one value per hole 0-17)
let holeCap = []; //array of handicaps based on tee selection
let holePar = []; // array of par per hole
idPromise.then(holes => {
   let y = holes.data.holes;
   y.forEach(element =>{
        holesList.push(element.teeBoxes)
    })
    holesList.forEach((element) =>{
        let i = element.findIndex((e) => e.teeType == tee);
        holeYards.push(element[i].yards)
        holeCap.push(element[i].hcp)
        holePar.push(element[i].par)
    })
})

//to access out yardage by tee type



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

coursePromise.then(course =>{
    course.forEach($('#courseSelect').append(`<option value="${course.id}">${course.name}</option>`))
})







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