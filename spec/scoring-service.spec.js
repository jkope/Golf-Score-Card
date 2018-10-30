let ScoringService = require("../js/scoring-service");

describe('Scoring-Service', ()=>{
    let scoringService;
    beforeEach(() =>{
        scoringService = new ScoringService();
    });
    describe('calculateScoreofPar',()=> {
        it('calculates score relative to par correctly when under par', () =>{
            let par = 72;
            let playerScore = [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
            let scoreofPar =  scoringService.calculateScoreofPar(par,playerScore);
            expect(scoreofPar).toEqual(-18);
        });
        it('calculates score relative to par correctly when over par', () =>{
            let par = 72;
            let playerScore = Array(18).fill(5, 0, 18)
            let scoreofPar = scoringService.calculateScoreofPar(par, playerScore);
            expect(scoreofPar).toEqual(18); 
        });
        it('returns a number', () =>{
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
    describe('calculateOutScore', ()=>{
        it('calculates score relative to out-par correctly when under par', () => {
            let par = 36;
            let playerScore = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            let scoreofPar = scoringService.calculateOutScore(par, playerScore);
            expect(scoreofPar).toEqual(-9);
        });
        it('calculates score relative to out-par correctly when over par', () => {
            let par = 36;
            let playerScore = Array(18).fill(5, 0, 18);
            let scoreofPar = scoringService.calculateOutScore(par, playerScore);
            expect(scoreofPar).toEqual(9);
        });
        it('Returns a number', () => {
            let par = 72;
            let playerScore = Array(18).fill(5, 0, 18);
            let scoreofPar = scoringService.calculateOutScore(par, playerScore);
            expect(typeof scoreofPar).toEqual('number');
        });
        it('calculates even when no scores', () => {
            let par = 36;
            let playerScore = Array(18);
            let scoreofPar = scoringService.calculateOutScore(par, playerScore);
            expect(scoreofPar).toEqual(-36);
        });
    });
    describe('calculateInScore',()=>{
        it('calculates score relative to in-par correctly when under par', () => {
            let par = 36;
            let playerScore = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
            let scoreofPar = scoringService.calculateInScore(par, playerScore);
            expect(scoreofPar).toEqual(-9);
        });
        it('calculates score relative to in-par correctly when over par', () => {
            let par = 36;
            let playerScore = Array(18).fill(5, 0, 18);
            let scoreofPar = scoringService.calculateInScore(par, playerScore);
            expect(scoreofPar).toEqual(9);
        });
        it('Returns a number', () => {
            let par = 72;
            let playerScore = Array(18).fill(5, 0, 18);
            let scoreofPar = scoringService.calculateInScore(par, playerScore);
            expect(typeof scoreofPar).toEqual('number');
        });
        it('calculates even when no scores', () => {
            let par = 36;
            let playerScore = Array(18);
            let scoreofPar = scoringService.calculateInScore(par, playerScore);
            expect(scoreofPar).toEqual(-36);
        });
    });
    describe('calculateTotalScore',()=>{
        it('Returns a number', () => {
            let playerScore = Array(18).fill(5, 0, 18);
            let totalScore = scoringService.totalofScore(playerScore);
            expect(typeof totalScore).toEqual('number');
        });
        it('calculates even when no scores', () => {
            let playerScore = Array(18);
            let totalScore = scoringService.totalofScore(playerScore);
            expect(totalScore).toEqual(0);
        });
    });
})