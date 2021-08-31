const BackendURL = 'http://localhost:4000'

export default {
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { 
        rel: 'stylesheet', 
        href: 'https://use.fontawesome.com/releases/v5.15.4/css/all.css',
        integrity: 'sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm',
        crossorigin: '0anonymous'
      },
    ]
  },

  css: [
    '~/assets/css/main.scss',
    '~/assets/fonts/Roboto.css'
  ],

  styleResources: {
    scss: '~/assets/css/main.scss',
  },

  plugins: [
  ],

  components: [
    {
      path: '~/components', // will get any components too
      pathPrefix: false,
    },
  ],

  buildModules: [['@nuxtjs/eslint-module'], ['@nuxtjs/style-resources']],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    proxy: true,
    baseURL: BackendURL,
  },

  proxy: {
    '/api': BackendURL,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          type: 'Bearer',
          name: 'token',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: { url: '/api/login', method: 'post' },
          user: { url: '/api/user', method: 'get' },
          logout: { url: '/api/logout', method: 'post' },
        },
      },
    },

    redirect: {
      login: '/login', // User will be redirected to this path if login is required
      logout: '/', // User will be redirected to this path if after logout, current route is protected
      callback: '/home', // User will be redirected to this path by the identity provider after login
      home: '/home', // User will be redirected to this path after login. (rewriteRedirects: true, ... will rewrite this path)
    },
    rewriteRedirects: false,
  },

  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
}
