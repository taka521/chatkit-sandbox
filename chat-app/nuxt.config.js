
export default {
  srcDir: 'app/',
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  env: {
    instanceLocator: process.env.CHATKIT_INSTANCE_LOCATOR || '',
    tokenProviderUrl: process.env.TOKEN_PROVIDER_URL || ''
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',

    '@nuxtjs/proxy',
  ],

  // デフォルトではlocalhost(127.0.0.0)からしかリクエストを受け付けない
  // ホストマシンからコンテナへアクセスするために、ホストを0.0.0.0に設定する
  server: {
    host: '0.0.0.0'
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true
  },

  /**
   * Proxy module configuration
   * CROSのためにプロキシを立てる
   */
  proxy: {
    "/auth/": {
      target: "http://auth-server:3001",
      pathRewrite: { '^/auth/': '/' }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
