import {getLanguageSetting} from './util';

const APP_ID = '1726608580890029';

export function initSDK(window, document) {
  return new Promise(resolve => {
    if (document.getElementById('facebook-jssdk')) {
      resolve();
    } else {
      window.fbAsyncInit = () => {
        FB.init({
          appId: APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v2.5'
        });
        resolve();
      };
      // Load the SDK asynchronously
      const firstJS = document.getElementsByTagName('script')[0];
      const js = document.createElement('script');
      js.id = 'facebook-jssdk';
      js.src = `//connect.facebook.net/${getLanguageSetting(window)}/sdk.js`;
      firstJS.parentNode.insertBefore(js, firstJS);
    }
  });
}

export function handleLogin(login, logout) {
  FB.getLoginStatus(response => {
    if (response.status === 'connected') {
      login();
    } else {
      logout();
    }
  });
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    FB.api('/me?fields=name,gender', response => {
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response);
      }
    });
  });
}
