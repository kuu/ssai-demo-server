import {initSDK, logIn, getUserInfo} from './facebook';

initSDK(window, document);
const loginButton = document.getElementById('login');
loginButton.addEventListener('click', () => {
  logIn().then(() => {
    return getUserInfo();
  })
  .then(data => {
    console.log(`User Info: ${data}`);
  });
});
