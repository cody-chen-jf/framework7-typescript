// Import Vue
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

import './utils/flexble.ts'
import i18n from '@/locale'

// Import F7 Styles
import 'framework7/css/framework7.bundle.css'

import './css/reset.scss'
// Import Icons and App Custom Styles
import './css/icons.css'
import './css/app.scss'

// Import App Component
import App from './app.vue'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

/* eslint no-new: "off" */
new Vue({
  el: '#app',
  template: '<app/>',
  i18n,
  // Register App Component
  components: {
    app: App
  }
})
