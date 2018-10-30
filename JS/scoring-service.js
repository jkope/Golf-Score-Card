module.exports = class ScoringService {
    calculateScoreofPar(par, scores){
        return scores.map((score)=> (score ? score : 0)).reduce((a,b) => a+b, 0)-par;
    }
    calculateOutScore(par, scores){
        let out = scores.slice(0, 9)
        return out.map((score) => (score ? score : 0)).reduce((a, b) => a + b, 0) - par;
    }
    calculateInScore(par, scores) {
        let instroke = scores.slice(9, 18)
        return instroke.map((score) => (score ? score : 0)).reduce((a, b) => a + b, 0) - par;
    }
    totalofScore(scores) {
        return scores.map((score) => (score ? score : 0)).reduce((a, b) => a + b, 0);
    }

};



