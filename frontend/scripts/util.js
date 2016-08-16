export function getLanguageSetting(context) {
  const navigator = context.navigator;
  if (!navigator) {
    return 'en_US';
  }
  return (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage ||
    navigator.browserLanguage || 'en_US';
}
