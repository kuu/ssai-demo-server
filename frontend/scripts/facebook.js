import {getLanguageSetting} from './util';

const APP_ID = '1726608580890029';

export function initSDK(window, document) {
  if (document.getElementById('facebook-jssdk')) {
    return;
  }

  window.fbAsyncInit = () => {
    FB.init({
      appId: APP_ID,
      cookie: true,
      xfbml: true,
      version: 'v2.5'
    });
  };
  // Load the SDK asynchronously
  const firstJS = document.getElementsByTagName('script')[0];
  const js = document.createElement('script');
  js.id = 'facebook-jssdk';
  js.src = `//connect.facebook.net/${getLanguageSetting(window)}/sdk.js`;
  firstJS.parentNode.insertBefore(js, firstJS);
}

export function getLoginStatus() {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        resolve();
      } else {
        reject(new Error('Not logged in'));
      }
    });
  });
}

export function logIn() {
  return getLoginStatus().then(() => {
    return new Promise(resolve => {
      FB.login(response => {
        console.log(`Login: ${response}`);
        resolve();
      }, {scope: 'publish_actions'});
    });
  });
}

export function getUserInfo() {
  return getLoginStatus().then(() => {
    return new Promise(resolve => {
      FB.api('/me', response => {
        resolve(response);
      });
    });
  });
}
