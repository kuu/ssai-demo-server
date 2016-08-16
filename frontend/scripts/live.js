import values from '../../const.js';

const playerParam = {
  pcode: values.PCODE,
  playerBrandingId: values.PLAYER_ID,
  skin: {
    config: '//player.ooyala.com/static/v4/stable/latest/skin-plugin/skin.json'
  },
  embedToken: tokenRequest,
  'videoplaza-ads-manager': {
    pulse_host: 'http://demo-live02.videoplaza.tv',
    pulse_tags: gender,
    pulse_custom_parameters: {
      t: gender
    }
  }
};

OO.ready(() => {
  OO.Player.create('container', values.EMBED_CODE, playerParam);
});
