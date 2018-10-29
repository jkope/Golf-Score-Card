let ScoringService = require("../js/scoring-service");

describe('Scoring-Service', ()=>{
    let scoringService;
    beforeEach(() =>{
        scoringService = new ScoringService();
    });
    describe('calculateScoreofPar',()=> {
        it('calculates score reletive to par correctly when under par', () =>{
            let par = 72;
            let playerScore = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
            let scoreofPar =  scoringService.calculateScoreofPar(par,playerScore);
            expect(scoreofPar).toEqual(-18);
        });
        it('return a number', () =>{
            let par = 72;
            let playerScore = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            let scoreofPar = scoringService.calculateScoreofPar(par, playerScore);
            expect(scoreofPar).toEqual(-18); 
        });
        it('calculates score reletive to par correctly when over par', () =>{
            let par = 72;
            let playerScore = Array(18).fill(5,0,18);
            let scoreofPar = scoringService.calculateScoreofPar(par, playerScore);
            expect(typeof scoreofPar).toEqual('number');
        });
        it('calculates even when no scores', () =>{
            let par = 72;
            let playerScore = Array(18);
            let scoreofPar = scoringService.calculateScoreofPar(par, playerScore);
            expect(scoreofPar).toEqual(-72);
        });
    });
    describe('calculateOutScore',()=>{

    });
    describe('calculateInScore',()=>{

    });
    describe('calculateTotalScore',()=>{

    });
})