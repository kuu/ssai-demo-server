import values from '../../const.js';

const playerParam = {
  pcode: values.PCODE,
  playerBrandingId: values.PLAYER_ID,
  skin: {
    config: `//player.ooyala.com/static/v4/stable/${values.OOYALA_VERSION}/skin-plugin/skin.json`
  },
  embedToken: tokenRequest,
  'ssai-pulse-ads-manager': {
    'cacheBuster': false
  }
};

window.getAdsQuery = function (url = '') {
  window.adsQueryObject = {t: gender};
  url = url || '';
  const params = [];
  if (window.adsQueryObject) {
    const obj = window.adsQueryObject;
    Object.keys(obj).forEach(key => {
      params.push(`${key}=${obj[key]}`);
    });
  }
  if (params.length > 0) {
    const delimiter = url.indexOf('?') === -1 ? '?' : '&';
    return `${url}${delimiter}${params.join('&')}`;
  }
  return url;
};

OO.ready(() => {
  OO.Player.create('container', values.EMBED_CODE, playerParam);
});
