require("dotenv").config();

export default {
  buildDir: "nuxt-dist",
  head: {
    title: "Treejer Admin",
    meta: [{
        charset: "utf-8"
      },
      {
        hid: "content",
        name: "content",
        content: "Treejer Admin content"
      },
      {
        hid: "robots",
        name: "robots",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "msapplication-TileColor",
        name: "msapplication-TileColor",
        content: "#ffffff",
      },
      {
        hid: "theme-color",
        name: "theme-color",
        content: "#67B68C"
      },
      {
        hid: "description",
        name: "description",
        content: "Treejer Admin"
      },

      {
        hid: "og:type",
        property: "og:type",
        content: "website"
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "Treejer Admin",
      },

      {
        hid: "og:title",
        property: "og:title",
        content: "Treejer Admin | Planters Without Borders",
      },
      {
        hid: "og:description",
        name: "og:description",
        content: "Treejer Admin",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://treejer.com"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://admin.treejer.com/featureImage/jake-hills.jpg",
      },

      {
        hid: "twitter:card",
        property: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:title",
        property: "twitter:title",
        content: "Treejer Admin",
      },

      {
        hid: "og:locale:alternate",
        property: "og:locale:alternate",
        content: "en",
      },
    ],
    script: [{
      src: "https://code.responsivevoice.org/responsivevoice.js?key=U26BzgW7",
      name: "responsivevoice",
    }, ],
    link: [{
        rel: "apple-touch-icon",
        sizes: "180x180",
        type: "image/png",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
        href: "/favicon-16x16.png",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest"
      },
      {
        rel: "mask-icon",
        href: "//safari-pinned-tab.svg",
        color: "#5bbad5"
      },
    ],
  },
  env: {
    baseUrl: process.env.BASE_URL || "https://treejer.com",
    apiUrl: process.env.API_URL || "https://api.treejer.com",
    tokenUrl: process.env.TOKEN_URL || "https://api.treejer.com",
    avatarURL: process.env.AVATAR_URL || "https://avatars.treejer.com/",
    explorerUrl: process.env.EXPLORER_URL || "https://etherscan.io",
    graphqlUrl: process.env.GRAPHQL_URL,
    zeroAddress: "0x0000000000000000000000000000000000000000",
    networkName: process.env.NETWORK_NAME,
    networkId: process.env.NETWORK_ID,
    contactArAddress: process.env.CONTRACT_AR_ADDRESS,
    polygon: {
      apiUrl: process.env.POLYGON_API_URL || 'https://api.treejer.com',
      explorerUrl: process.env.POLYGON_EXPLORER_URL,
      graphqlUrl: process.env.POLYGON_GRAPHQL_URL,
      networkName: process.env.POLYGON_NETWORK_NAME,
      networkId: process.env.POLYGON_NETWORK_ID,
      web3SProvider: process.env.POLYGON_WEB3_SOCKET_PROVIDER,
      web3Provider: process.env.POLYGON_WEB3_PROVIDER,
      contactArAddress: process.env.POLYGON_CONTRACT_AR_ADDRESS,
      contactPlanterAddress: process.env.POLYGON_CONTRACT_PLANTER_ADDRESS,

      transakApiKey: process.env.POLYGON_TRANSAK_API_KEY,
      transakEnvironment: process.env.POLYGON_TRANSAK_ENV,
      transakNetworks: process.env.POLYGON_TRANSAK_NETWROKS,
      transakDefaultNetwork: process.env.POLYGON_TRANSAK_DEFAULT_NETWROK,

      //contracts
      contractAuctionAddress: process.env.POLYGON_CONTRACT_TREE_AUCTION_ADDRESS,
      contractIncrementalSale: process.env.POLYGON_CONTRACT_INCREMENTAL_SELL_ADDRESS,
      contractTreeRegularSale: process.env.POLYGON_CONTRACT_REGULAR_SELL_ADDRESS,
      contractHonoraryTree: process.env.POLYGON_CONTRACT_COMMUNITY_GIFTS_ADDRESS,
      treeAddress: process.env.POLYGON_CONTRACT_TREE_ADDRESS,
      treeboxContractAddress: process.env.POLYGON_CONTRACT_TREE_BOX_ADDRESS,
      treeboxPaymasterContractAddress: process.env.POLYGON_CONTRACT_PAYMASTER_TREE_BOX,
      fundWithOffsetContractAddress: process.env.POLYGON_CONTRACT_FUNDWITHOFFSET_ADDRESS,
      uniswapV2Router02ContractAddress: process.env.POLYGON_DEX_ROUTER_UNISWAP_V2,
      daiTokenAddress: process.env.POLYGON_DAI_TOKEN_ADDRESS_RINKEBY,
      bctTokenAddress: process.env.POLYGON_CONTRACT_BASECARBONTONNE_ADDRESS,
      carbonRetirementsStorageContractAddress: process.env.POLYGON_CONTRACT_CARBONRETIREMENTSSTORAGE_ADDRESS,
      carbonRetirementAggregatorContractAddress: process.env.POLYGON_CONTRACT_CARBONRETIREMENTAGGREGATOR_ADDRESS,
      wethTokenAddress: process.env.POLYGON_WETH_TOKEN_ADDRESS_RINKEBY,
      offsetDexPath: process.env.POLYGON_OFFSET_DEX_PATH,

      marketPlaceAddress: process.env.POLYGON_CONTRACT_MARKET_PLACE_ADDRESS,

      gsnRelayUrl: process.env.POLYGON_GSN_RELAY_URL,
      gsnRelayLookupWindowBlocks: process.env.POLYGON_GSN_RELAYLOOKUPWINDOWBLOCKS,
      gsnRelayRegistrationLookupBlocks: process.env.POLYGON_GSN_RELAYREGISTRATIONLOOKUPBLOCKS,
      gsnPastEventQueryMaxPageSize: process.env.POLYGON_GSN_PASTEVENTSQUERYMAXPAGESIZE,
    },
    polygont: {
      apiUrl: process.env.POLYGONT_API_URL || 'https://api.treejer.com',
      explorerUrl: process.env.POLYGONT_EXPLORER_URL,
      graphqlUrl: process.env.POLYGONT_GRAPHQL_URL,
      networkName: process.env.POLYGONT_NETWORK_NAME,
      networkId: process.env.POLYGONT_NETWORK_ID,
      web3SProvider: process.env.POLYGONT_WEB3_SOCKET_PROVIDER,
      web3Provider: process.env.POLYGONT_WEB3_PROVIDER,
      contactArAddress: process.env.POLYGONT_CONTRACT_AR_ADDRESS,
      contactPlanterAddress: process.env.POLYGONT_CONTRACT_PLANTER_ADDRESS,


      transakApiKey: process.env.POLYGONT_TRANSAK_API_KEY,
      transakEnvironment: process.env.POLYGONT_TRANSAK_ENV,
      transakNetworks: process.env.POLYGONT_TRANSAK_NETWROKS,
      transakDefaultNetwork: process.env.POLYGONT_TRANSAK_DEFAULT_NETWROK,

      //contracts
      contractAuctionAddress: process.env.POLYGONT_CONTRACT_TREE_AUCTION_ADDRESS,
      contractIncrementalSale: process.env.POLYGONT_CONTRACT_INCREMENTAL_SELL_ADDRESS,
      contractTreeRegularSale: process.env.POLYGONT_CONTRACT_REGULAR_SELL_ADDRESS,
      contractHonoraryTree: process.env.POLYGONT_CONTRACT_COMMUNITY_GIFTS_ADDRESS,
      contractTreeFactory: process.env.POLYGONT_CONTRACT_TREE_FACTORY_ADDRESS,
      treeAddress: process.env.POLYGONT_CONTRACT_TREE_ADDRESS,
      treeboxContractAddress: process.env.POLYGONT_CONTRACT_TREE_BOX_ADDRESS,
      treeboxPaymasterContractAddress: process.env.POLYGONT_CONTRACT_PAYMASTER_TREE_BOX,
      fundWithOffsetContractAddress: process.env.POLYGONT_CONTRACT_FUNDWITHOFFSET_ADDRESS,
      uniswapV2Router02ContractAddress: process.env.POLYGONT_DEX_ROUTER_UNISWAP_V2,
      daiTokenAddress: process.env.POLYGONT_DAI_TOKEN_ADDRESS_RINKEBY,
      bctTokenAddress: process.env.POLYGONT_CONTRACT_BASECARBONTONNE_ADDRESS,
      carbonRetirementsStorageContractAddress: process.env.POLYGONT_CONTRACT_CARBONRETIREMENTSSTORAGE_ADDRESS,
      carbonRetirementAggregatorContractAddress: process.env.POLYGONT_CONTRACT_CARBONRETIREMENTAGGREGATOR_ADDRESS,
      wethTokenAddress: process.env.POLYGONT_WETH_TOKEN_ADDRESS_RINKEBY,
      offsetDexPath: process.env.POLYGONT_OFFSET_DEX_PATH,

      marketPlaceAddress: process.env.POLYGONT_CONTRACT_MARKET_PLACE_ADDRESS,

      gsnRelayUrl: process.env.POLYGONT_GSN_RELAY_URL,
      gsnRelayLookupWindowBlocks: process.env.POLYGONT_GSN_RELAYLOOKUPWINDOWBLOCKS,
      gsnRelayRegistrationLookupBlocks: process.env.POLYGONT_GSN_RELAYREGISTRATIONLOOKUPBLOCKS,
      gsnPastEventQueryMaxPageSize: process.env.POLYGONT_GSN_PASTEVENTSQUERYMAXPAGESIZE,
    },


    goerli: {
      apiUrl: process.env.GOERLI_API_URL || 'https://lbapi.treejer.com',
      explorerUrl: process.env.GOERLI_EXPLORER_URL,
      graphqlUrl: process.env.GOERLI_GRAPHQL_URL,
      networkName: process.env.GOERLI_NETWORK_NAME,
      networkId: process.env.GOERLI_NETWORK_ID,
      web3SProvider: process.env.GOERLI_WEB3_SOCKET_PROVIDER,
      web3Provider: process.env.GOERLI_WEB3_PROVIDER,
      contactArAddress: process.env.GOERLI_CONTRACT_AR_ADDRESS,
      contactPlanterAddress: process.env.GOERLI_CONTRACT_PLANTER_ADDRESS,


      transakApiKey: process.env.GOERLI_TRANSAK_API_KEY,
      transakEnvironment: process.env.GOERLI_TRANSAK_ENV,
      transakNetworks: process.env.GOERLI_TRANSAK_NETWROKS,
      transakDefaultNetwork: process.env.GOERLI_TRANSAK_DEFAULT_NETWROK,

      contractAuctionAddress: process.env.GOERLI_CONTRACT_TREE_AUCTION_ADDRESS,
      contractIncrementalSale: process.env.GOERLI_CONTRACT_INCREMENTAL_SELL_ADDRESS,
      contractTreeRegularSale: process.env.GOERLI_CONTRACT_REGULAR_SELL_ADDRESS,
      contractHonoraryTree: process.env.GOERLI_CONTRACT_COMMUNITY_GIFTS_ADDRESS,
      contractTreeFactory: process.env.GOERLI_CONTRACT_TREE_FACTORY_ADDRESS,


      treeAddress: process.env.GOERLI_CONTRACT_TREE_ADDRESS,
      treeboxContractAddress: process.env.GOERLI_CONTRACT_TREE_BOX_ADDRESS,
      treeboxPaymasterContractAddress: process.env.GOERLI_CONTRACT_PAYMASTER_TREE_BOX,
      fundWithOffsetContractAddress: process.env.GOERLI_CONTRACT_FUNDWITHOFFSET_ADDRESS,
      uniswapV2Router02ContractAddress: process.env.GOERLI_DEX_ROUTER_UNISWAP_V2,
      daiTokenAddress: process.env.GOERLI_DAI_TOKEN_ADDRESS_GOERLI,
      bctTokenAddress: process.env.GOERLI_CONTRACT_BASECARBONTONNE_ADDRESS,
      carbonRetirementsStorageContractAddress: process.env.GOERLI_CONTRACT_CARBONRETIREMENTSSTORAGE_ADDRESS,
      carbonRetirementAggregatorContractAddress: process.env.GOERLI_CONTRACT_CARBONRETIREMENTAGGREGATOR_ADDRESS,
      wethTokenAddress: process.env.GOERLI_WETH_TOKEN_ADDRESS_GOERLI,

      marketPlaceAddress: process.env.GOERLI_CONTRACT_MARKET_PLACE_ADDRESS,

      offsetDexPath: process.env.GOERLI_OFFSET_DEX_PATH,

      gsnRelayUrl: process.env.GOERLI_GSN_RELAY_URL,
      gsnRelayLookupWindowBlocks: process.env.GOERLI_GSN_RELAYLOOKUPWINDOWBLOCKS,
      gsnRelayRegistrationLookupBlocks: process.env.GOERLI_GSN_RELAYREGISTRATIONLOOKUPBLOCKS,
      gsnPastEventQueryMaxPageSize: process.env.GOERLI_GSN_PASTEVENTSQUERYMAXPAGESIZE,
    },
  },

  loading: {
    color: "rgba(103,182,140,0.62)",
    failedColor: "rgba(238,45,14,0.69)",
    height: "4px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 16px",
  },

  /*
   ** Global CSS
   */
  css: ["@/assets/main.scss"],
  middleware: [],
  router: {
    linkActiveClass: "active-link",
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: "~plugins/maps.js",
      ssr: false
    },
    {
      src: "~plugins/vueFormulate.js",
      ssr: false
    },
    {
      src: "~plugins/web3.js",
      ssr: false
    },
    {
      src: "~plugins/accountSlice.js",
      ssr: false
    },
    {
      src: "~plugins/num.js"
    },
    {
      src: "~plugins/avatar.js"
    },
    {
      src: "~plugins/axios.js"
    },
    {
      src: "~plugins/setConfig.js"
    },
  ],
  buildModules: [
    ["@nuxtjs/dotenv", {
      filename: ".env"
    }],
    ["@nuxtjs/pwa"],
    "@nuxtjs/google-analytics",
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
            loader: "style-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // {
      //   test: /\.vue$/,
      //   loader: 'vue-loader',
      //   options: {
      //     loaders: {
      //       i18n: '@kazupon/vue-i18n-loader'
      //     }
      //   }
      // },
      {
        test: /\.(png|jpe?g|gif|svg|webp|txt)$/,
        loader: "url-loader",
        query: {
          // limit: 1000, // 1kB
          name: "img/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        query: {
          // limit: 1000, // 1kB
          name: "fonts/[name].[hash:7].[ext]",
        },
      },
    ],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "bootstrap-vue/nuxt",
    ["nuxt-clipboard", {
      autoSetContainer: true
    }],
    // 'nuxt-clipboard',
    "cookie-universal-nuxt",
    "@nuxtjs/axios",

    "@nuxtjs/style-resources",
    ["nuxt-fontawesome"],
    "nuxt-i18n",
    [
      "nuxt-gmaps",
      {
        key: process.env.GOOGLE_MAP_API_KEY,
        //you can use libraries: ['places']
      },
    ],
    "@nuxtjs/apollo",
    [
      "@nuxtjs/moment",
      {
        plugins: ["moment-strftime"],
      },
    ],
  ],
  robots: {
    UserAgent: "*",
    Disallow: "/",
  },
  clipboard: {
    autoSetContainer: true,
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.GRAPHQL_URL
      },
      polygon: {
        httpEndpoint: process.env.POLYGON_GRAPHQL_URL
      },
    
      rinkeby: {
        httpEndpoint: process.env.RINKEBY_GRAPHQL_URL
      },
      goerli: {
        httpEndpoint: process.env.GOERLI_GRAPHQL_URL
      }
    }
  },
  pwa: {
    manifest: {
      short_name: "Treejer Admin",
      name: "Treejer Admin",
      lang: "en",
    },
  },

  i18n: {
    locales: [{
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en.js",
      },
      // {
      //   name: 'Farsi',
      //   code: 'fa',
      //   iso: 'fa-FA',
      //   file: 'fa.js'
      // },
      // {
      //   name: 'Turkish',
      //   code: 'tr',
      //   iso: 'tr-TR',
      //   file: 'tr.js'
      // },
      // {
      //   name: 'Arabic',
      //   code: 'ar',
      //   iso: 'ar-AR',
      //   file: 'ar.js'
      // }
    ],
    defaultLocale: "en",
    loadLanguagesAsync: true,
    lazy: true,
    seo: true,
    langDir: "lang/",
    detectBrowserLanguage: false,
  },
  fontawesome: {
    component: "fa",
    imports: [{
        set: "@fortawesome/free-solid-svg-icons", // Solid icons
        icons: [
          "faEye",
          "faPlaneDeparture",
          "faExternalLinkAlt",
          "faLifeRing",
          "faTrophy",
          "faBell",
          "faTree",
          "faCalendarAlt",
          "faCaretDown",
          "faBars",
          "faCaretRight",
          "faTimes",
          "faAngleRight",
          "faPhoneSquareAlt",
          "faEnvelope",
          "faAngleDown",
          "faArrowCircleDown",
          "faArrowCircleUp",
          "faUser",
          "faShoppingCart",
          "faSearch",
          "faUsers",
          "faAngleDoubleDown",
          "faAngleDoubleUp",
        ],
      },
      {
        set: "@fortawesome/free-brands-svg-icons", // Brand icons
        icons: [
          "faEthereum",
          "faCcStripe",
          "faCcVisa",
          "faFacebook",
          "faInstagram",
          "faTelegram",
          "faWhatsapp",
          "faTwitter",
          "faLinkedinIn",
        ],
      },
    ],
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: "6Lck6LUZAAAAABnazIRRkNGZW9Nal9vhUbhSlIjI", // Site key for requests
    version: 3, // Version
    size: "invisible", // Size: 'compact', 'normal', 'invisible' (v2)
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Access-Control-Allow-Origin": "*/*",
    },
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID, // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.node = {
        fs: "empty",
      };
    },
  },
};
