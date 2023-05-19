export const clearStorage = () => {
    sessionStorage.removeItem('finalRanking');
    sessionStorage.removeItem('gameCode');
    sessionStorage.removeItem('host');
    sessionStorage.removeItem('roundCount');
    sessionStorage.removeItem('roundLimit');
    sessionStorage.removeItem('inGame');
    sessionStorage.removeItem('foodLink');
    sessionStorage.removeItem('foodName');
    sessionStorage.removeItem('page');
    sessionStorage.removeItem('playerGuesses');
    sessionStorage.removeItem('ranking');
    sessionStorage.removeItem('solutionValues');
}