import type { StrapiApp } from '@strapi/strapi/admin'
// import AuthLogo from './extensions/my-logo.png'
// import MenuLogo from './extensions/logo.png'
// import favicon from './extensions/favicon.png'

export default {
  config: {
    // auth: {
    //   logo: AuthLogo,
    // },
    // head: {
    //   // Try to change the origin favicon.png file in the
    //   // root of strapi project if this config don't work.
    //   favicon: favicon,
    // },
    // menu: {
    //   logo: MenuLogo,
    // },
    theme: {
      colors: {
        primary100: '#f6ecfc',
        primary200: '#e0c1f4',
        primary500: '#ac73e6',
        primary600: '#9736e8',
        primary700: '#8312d1',
        danger700: '#b72b1a',
      },
    },
    tutorials: false,
    notifications: { releases: false },
    locales: [],
  },
  bootstrap(app: StrapiApp) {
    console.log(app)
  },
}
