module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ka'],
    localePath:
      typeof window === 'undefined'
        ? require('path').resolve('./public/locales')
        : '/locales',
  },
};
