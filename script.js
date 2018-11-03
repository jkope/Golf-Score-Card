class Player {
    constructor(name) {
        this.name = name;
        this.holeScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.totalScore = ()=>{return this.holeScore.reduce((a, b) => a + b, 0)};
        this.outScore = ()=>{return this.holeScore.slice(0,9).reduce((a,b) => a + b, 0)};
        this.inScore = () =>{return this.holeScore.slice(9, 18).reduce((a, b) => a + b, 0)};
    }
}
let tees;
let players = [];
let idPromise;
let tee;
let teeList = [];
let course;
let holesList =[];
let holeYards = [];
let holeCap = []; 
let holePar = []; 

getCourseId();

function buildCard(holes){
    
    $('.card').html('');
    $('.card').append(`<div id="col0" class="column">-</div>`);
    for(let i=1; i<=holes.length; i++){
        $('.card').append(`<div id="col${i}" class="column">Hole ${i}</div>`);
    }
    $('.card').append(`<div id="out" class="column">OUT</div>`);
    $('.card').append(`<div id="in" class="column">IN</div>`);
    $('.card').append(`<div id="total" class="column">TOTAL</div>`);

//  Yards 
    $('#col0').append(`<div id="yards" class="column">Yardage</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' + i).append(`<div class='yards' id="yards${i}">${holeYards[i - 1]}</div>`);
    }
    $('#out').append(`<div class="column">-</div>`);
    $('#in').append(`<div  class="column">-</div>`);
    $('#total').append(`<div class="column">${holeYards.reduce((a, b) => a + b, 0)}</div>`);

//  Handicap
    $('#col0').append(`<div id="handicap" class="column">Handicap</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' + i).append(`<div class='handicap' id="handicap${i}">${holeCap[i - 1]}</div>`);
    }
    $('#out').append(`<div class="column">-</div>`);
    $('#in').append(`<div  class="column">-</div>`);
    $('#total').append(`<div class="column">-</div>`);

//  par
    $('#col0').append(`<div id="par" class="column">Par</div>`);
    for (let i = 1; i <= holes.length; i++) {
        $('#col' +i).append(`<div class='par' id="par${i}">${holePar[i-1]}</div>`);
    }
    $('#out').append(`<div class="column">-</div>`);
    $('#in').append(`<div  class="column">-</div>`);
    $('#total').append(`<div class="column">${holePar.reduce((a, b) => a + b, 0)}</div>`);

}

function addHoles(players,holes){

    for(let p=1; p<=players.length; p++){
        $('#col0').append(`<div id="p${p}" class="column">${players[p-1].name}</div>`);

        for(h=1; h<=holes.length; h++){
            $('#col' + h).append(`<input type="number" value="${players[p-1].holeScore[h-1] != 0 ? players[p-1].holeScore[h-1] : "" }" class='hole' id="p${p}h${h}" onblur="saveScore(${p-1},${h-1},'p${p}h${h}')" >`);
        }
        $('#out').append(`<div id="out${p-1}" class="column">${players[p-1].outScore()}</div>`);
        $('#in').append(`<div id="in${p-1}" class="column">${players[p-1].inScore()}</div>`);
        $('#total').append(`<div id="total${p-1}" class="column">${players[p-1].totalScore()}</div>`);
    }
 
}

function setCourse(id){
    getCourseInfo(id);
    $('.teeSelect').empty()
    $('.teeSelect').append(`<h4 class="mdl-dialog__title">Select a Tee</h4>
        <select name="tees" id="teeSelect"></select>`)
}

function buildPlayer(){
    let name = $('#player').val();
    let namelist = [];
    players.forEach(e=>{namelist.push(e.name.toUpperCase())});
    if(namelist.includes(name.toUpperCase())){
        $('#player').val('');
        $('#player').attr("placeholder","Name Already Used");
        }else{
    players.push (new Player(name));
    $('#player').val('');
    $('#player').attr("placeholder", "Name");
    listPlayers();
    }
}

function onCard(){
    tee = $('#teeSelect').val()
    $('.cardList').empty();
    id = $('#courseSelect').val();
    holesList = [];
    course.holes.forEach(e => { holesList.push(e.teeBoxes) })
    teeList = [];
    course.holes[0].teeBoxes.forEach((e) => { teeList.push(e.teeType) });
    holeYards = [];
    holeCap = [];
    holePar = [];
    holesList.forEach((e) => {
        let i = e.findIndex((el) => el.teeType == tee)
        holeYards.push(e[i].yards)
        holeCap.push(e[i].hcp)
        holePar.push(e[i].par)
    })
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

function fade(){
    $('#messageBox').empty();
};


function saveScore(playerIndex, holeIndex, id){
    players[playerIndex].holeScore[holeIndex] = Number($("#" + id).val());
    if(players[playerIndex].holeScore.includes(0)){
        " "
    } else{
        if (players[playerIndex].totalScore() < holePar.reduce((a, b) => a + b, 0) ){
            $('#messageBox').empty()
            $('#messageBox').html(
                `<h3>${players[playerIndex].name},  ${players[playerIndex].totalScore() - holePar.reduce((a, b) => a + b, 0)}, Great Score!</h3>`)
            setTimeout(fade,3000);
        } else if (players[playerIndex].totalScore() == holePar.reduce((a, b) => a + b, 0)) {
            $('#messageBox').empty()
            $('#messageBox').html(
                `<h3>${players[playerIndex].name},  zero under but also zero over. Par for the course ain't bad.</h3>`)
            setTimeout(fade, 3000);
        }else {
            $('#messageBox').empty()
            $('#messageBox').html(
                `<h3>${players[playerIndex].name}, +${players[playerIndex].totalScore() - holePar.reduce((a, b) => a + b, 0)}, Best keep practicing</h3>`)
            setTimeout(fade, 3000);
        }
    }
    $('#out'+playerIndex).html(players[playerIndex].outScore());
    $('#in'+playerIndex).html(players[playerIndex].inScore());
    $('#total'+playerIndex).html(players[playerIndex].totalScore());
}

function getCourseId() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "https://golf-courses-api.herokuapp.com/courses",
            type: 'GET',
            success: response => {
                response.courses.forEach((e) => { $('#courseSelect').append(`<option value="${e.id}">${e.name}</option>`) }) 
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
    
}

function getCourseInfo(id) {    
    if(id != ""){            
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://golf-courses-api.herokuapp.com/courses/${id}`,
            type: 'GET',
            success: (response, status) => {
                course = response.data;
                tees = '';
                tees = course.holes[0].teeBoxes;
                tees.forEach((e) => { $('#teeSelect').append(`<option value="${e.teeType}">${e.teeType}</option>`) }) 
                $('#courseName').html(course.name);
                resolve(response);
            },
            error: error => {
                reject(error);
            }
        });
    });
    }{
        ""
    }   
}
    


//for the MDL dialog box
let dialog = document.querySelector('dialog');
let showDialogButton = document.querySelector('#show-dialog1');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}
showDialogButton.addEventListener('click', function () {
    dialog.showModal();
});
dialog.querySelector('.close').addEventListener('click', function () {
    dialog.close();
});
