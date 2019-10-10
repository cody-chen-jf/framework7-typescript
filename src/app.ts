// Import Vue
import '@babel/polyfill'
import Vue from 'vue'

// Import F7
import Framework7 from 'framework7/framework7.esm.bundle.js'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'

import '@/utils/flexble.ts'
// import i18n from '@/locale'

// Import F7 Styles
import 'framework7/css/framework7.bundle.css'

// Import Icons and App Custom Styles
import './css/icons.css'
import './css/app.scss'

// Import App Component
import App from './app.vue'
import nativePluginHelper from './utils/nativePlugin'
import sentryHelper from './utils/sentry'
import flurryHelper from './utils/flurry'

// Init F7 Vue Plugin
Framework7.use(Framework7Vue)

class Application {
  public firstClickBackTime: number

  constructor(firstClickBackTime: number) {
    this.firstClickBackTime = firstClickBackTime
    this.onDeviceReady.bind(this)
  }

  public initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    if (!nativePluginHelper.isNative()) {
      // not run in real device, need to trigger manually
      this.onDeviceReady()
    }
    console.log('You are running in', process.env.NODE_ENV, 'mode.')
  }

  private onDeviceReady = async () => {
    console.log('[onDeviceReady] device ready', this)
    // init sentry
    await sentryHelper.init()
    await sentryHelper.setUserName()
    // init flurry
    await flurryHelper.init()
    // fix scroll issue in iOS which build with version larger xcode9
    nativePluginHelper.keyboard.automaticScrollToTopOnHiding(true)
    window.addEventListener('keyboardWillHide', () => {
      scrollTo(0, 0)
    })
    // Register the event listener
    document.addEventListener('backbutton', this.onBackKeyDown, false)
    // get token
    const token = await this.getStoreToken()
    // init Notification
    if (nativePluginHelper.isNative()) {
      // if (device.platform === ANDROID_PLATFORM) jpushHelper.initJPush()
      // if (device.platform === IOS_PLATFORM) apnsHelper.initAPNs()
    }

    /* eslint no-new: "off" */
    window.vue = new Vue({
      el: '#app',
      template: '<app/>',
      // i18n,
      // Register App Component
      components: {
        app: App
      }
    })
  }

  private getStoreToken = async () => {
    const access_token = await nativePluginHelper.nativeStorage.getItem('access_token')
    const refresh_token = await nativePluginHelper.nativeStorage.getItem('refresh_token')
    console.log('[onDeviceReady]', 'get store access token:', access_token)
    console.log('[onDeviceReady]', 'get store refresh token:', refresh_token)
    return {
      access_token,
      refresh_token
    }
  }

  private onBackKeyDown = () => {
    console.log('[onBackKeyDown]', 'Back Button is Pressed!')
    if (window.vue) {
      // handle dialog
      const dialog = window.vue.$f7.dialog.get(window.vue.$$('.dialog'))
      if (dialog) {
        const buttons = dialog.params.buttons
        buttons.forEach((button: any) => {
          const keyCodes = button.keyCodes
          keyCodes.forEach((keyCode: any) => {
            if (keyCode === 27) {
              const onClick = button.onClick
              if (onClick) {
                onClick()
              }
              dialog.close()
            }
          })
        })
      } else {
        if (window.vue.$$('#login-screen').css('display') === 'block') {
          // login page shown, exit app
          this.exitApp()
        } else {
          let mainViews = window.vue.$f7.views.filter((view: any) => {
            return view.main === true
          })
          const history = mainViews[0].history
          if (history && history.length > 1) {
            // back to previous page
            if (window.vue.$$('.page-shadow-effect').length === 0) {
              mainViews[0].router.back()
            }
          } else {
            // exit app
            this.exitApp()
          }
        }
      }
    } else {
      // exit app
      this.exitApp()
    }
  }

  private exitApp = () => {
    let t = new Date().getTime()
    if (t - this.firstClickBackTime > 2000) {
      window.plugins.toast.showWithOptions({
        message: 'Click again to exit the app.',
        duration: 'short',
        position: 'bottom',
        addPixelsY: -20
      })
      this.firstClickBackTime = t
    } else {
      nativePluginHelper.app.exitApp()
    }
  }
}

const application = new Application(0)
application.initialize()
