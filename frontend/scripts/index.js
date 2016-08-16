import {initSDK, handleLogin, getUserInfo} from './facebook';

const liveButton = document.getElementById('live');
const loginName = document.getElementById('login-name');

let gender = null;

initSDK(window, document).then(() => {
  checkLoginState();
});

liveButton.addEventListener('click', () => {
  location.href = `${location.protocol}//${location.host}/live?gender=${gender || 'unknown'}`;
});

function loggedIn() {
  getUserInfo().then(data => {
    loginName.textContent = data.name;
    gender = data.gender;
  });
}

function loggedOut() {
  loginName.textContent = '';
  gender = null;
}

function checkLoginState() {
  handleLogin(loggedIn, loggedOut);
}

window.checkLoginState = checkLoginState;
