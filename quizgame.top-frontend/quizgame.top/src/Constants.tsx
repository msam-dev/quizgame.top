const url: string = 'https://localhost:7025';
//const url: string = 'https://api.quizgame.top';

// Endpoints
export const loginEndPoint: string     = url+'/user/login/';
export const logOutEndPoint: string    = url+'/user/logout';
export const signUpEndPoint: string    = url+'/user/signup/';
export const loggedInEndpoint: string  = url+'/user/loggedin/';
export const addAnswerEndpoint: string = url+'/user/add-answer/';
export const leaderBoardEndpoint: string = url+'/user/leaderboard/';

//Regex
export const userRegex: RegExp = /^[a-zA-Z0-9_]+$/;




















