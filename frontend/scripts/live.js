import values from '../../const.js';

const playerParam = {
  pcode: values.PCODE,
  playerBrandingId: values.PLAYER_ID,
  skin: {
    config: `//player.ooyala.com/static/v4/stable/${values.OOYALA_VERSION}/skin-plugin/skin.json`
  },
  embedToken: tokenRequest
};

let embedCode;
if (gender === 'male') {
  embedCode = values.EMBED_CODE_MALE;
} else if (gender === 'female') {
  embedCode = values.EMBED_CODE_FEMALE;
} else {
  embedCode = values.EMBED_CODE_UNKNOWN;
}

OO.ready(() => {
  OO.Player.create('container', embedCode, playerParam);
});
