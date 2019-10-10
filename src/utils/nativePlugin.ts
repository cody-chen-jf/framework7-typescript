/*
 *  NativeStorage, Sentry
 * */
import * as globalConstant from '@/constant'

let Sentry: any = undefined

function isNative() {
  return process.env.NODE_ENV !== 'dev'
}

export default {
  isNative: isNative,
  sentry: {
    init(dsn: any, environment: any) {
      if (isNative()) {
        console.log('dsn, environment', dsn, environment)
        Sentry = cordova.require('sentry-cordova.Sentry')
        console.log('dsn ==== ', dsn)
        Sentry.init({ dsn })
        Sentry.configureScope((scope: any) => {
          console.log('scope', scope)
          scope.setTag('environment', environment)
        })
        console.log('Sentry', Sentry)
      } else {
        console.log('[NativePluginHelper]', 'sentry is not be initialized due to you are running in development mode.')
      }
    },
    async setUserName(username: any) {
      if (isNative()) {
        Sentry.configureScope((scope: any) => {
          scope.setTag('username', username)
        })
      } else {
        console.log('[NativePluginHelper]', 'sentry is not be initialized due to you are running in development mode.')
      }
    },
    captureException(error: any) {
      if (isNative() && Sentry) {
        Sentry.captureException(error)
      } else {
        console.log('[NativePluginHelper]', 'Sentry captureException', error)
      }
    },
    captureMessage(message: any) {
      if (isNative() && Sentry) {
        Sentry.captureMessage(message)
      } else {
        console.log('[NativePluginHelper]', 'Sentry captureException', message)
      }
    }
  },
  flurry: {
    init(appKey: any, version: string, userId: string) {
      console.log('[NativePluginHelper]', 'Init Flurry with version: ' + version)
      if (isNative()) {
        window.flurryAnalytics = new FlurryAnalytics({
          // requried
          appKey: appKey,
          // optional
          userId: userId,
          version: version, // overrides the version of the app
          continueSessionSeconds: 3, // how long can the app be paused before a new session is created, must be less than or equal to five for Android devices
          logLevel: 'ERROR', // (VERBOSE, DEBUG, INFO, WARN, ERROR)
          enablePulse: true, // defaults to false (I think :/ )
          enableLogging: true, // defaults to false
          enableEventLogging: false, // should every event show up the app's log, defaults to true
          enableCrashReporting: true, // should app crashes be recorded in flurry, defaults to false, iOS only
          enableBackgroundSessions: true, // should the session continue when the app is the background, defaults to false, iOS only
          reportSessionsOnClose: true, // should data be pushed to flurry when the app closes, defaults to true, iOS only
          reportSessionsOnPause: true // should data be pushed to flurry when the app is paused, defaults to true, iOS only
        })
      }
    },
    logEvent(event: any, params: any) {
      console.log('[NativePluginHelper]', 'Flurry logEvent:', event, params)
      if (isNative() && window.flurryAnalytics) {
        if (params !== undefined) {
          window.flurryAnalytics.logEvent(
            event,
            { params },
            function() {
              console.log('logEvent sucesss!', event)
            },
            function(err: Error) {
              console.error(['logEvent error!', err])
            }
          )
        } else {
          window.flurryAnalytics.logEvent(event)
        }
      }
    }
  },
  app: {
    exitApp() {
      if (isNative()) {
        if (device.platform === globalConstant.IOS_PLATFORM) {
          cordova.plugins.exit()
        } else {
          navigator.app.exitApp()
        }
      }
    },
    sendAppEmail(to: string, subject: string, body: string, callBack: any) {
      if (isNative()) {
        if (device.platform === globalConstant.ANDROID_PLATFORM) {
          cordova.plugins.email.getClients(function(apps: any) {
            if (apps !== undefined && apps.length > 0) {
              cordova.plugins.email.open({
                to: to,
                subject: subject,
                body: body
              })
              callBack(true)
            } else {
              callBack(false)
            }
          })
        } else {
          cordova.plugins.email.open({
            to: to,
            subject: subject,
            body: body
          })
          callBack(true)
        }
      }
    }
  },
  device: {
    platform() {
      if (isNative()) {
        return device.platform
      } else {
        return 'ios'
      }
    }
  },
  splashscreen: {
    hide() {
      if (isNative()) {
        navigator.splashscreen.hide()
      }
    },
    show() {
      if (isNative()) {
        navigator.splashscreen.show()
      }
    }
  },
  spinner: {
    show(labelText: string, successCallback: () => void, failureCallback: () => void) {
      if (isNative()) {
        let options = { dimBackground: true }
        SpinnerPlugin.activityStart(labelText, options, successCallback, failureCallback)
      }
    },
    hide(successCallback: () => void, failureCallback: () => void) {
      if (isNative()) {
        SpinnerPlugin.activityStop(successCallback, failureCallback)
      }
    }
  },
  nativeStorage: {
    getItem(key: any): any {
      return new Promise((resolve) => {
        if (isNative()) {
          NativeStorage.getItem(
            key,
            (value: any) => {
              resolve(value)
            },
            () => {
              resolve(null)
            }
          )
        } else {
          let value = localStorage.getItem(key)
          resolve(value)
        }
      })
    },
    setItem(key: any, value: any) {
      return new Promise((resolve) => {
        if (isNative()) {
          NativeStorage.setItem(
            key,
            value,
            () => {
              resolve(true)
            },
            () => {
              resolve(false)
            }
          )
        } else {
          localStorage.setItem(key, value)
          resolve(true)
        }
      })
    },
    removeItem(key: any) {
      return new Promise((resolve) => {
        if (isNative()) {
          NativeStorage.remove(
            key,
            () => {
              resolve(true)
            },
            () => {
              resolve(false)
            }
          )
        } else {
          localStorage.removeItem(key)
          resolve(true)
        }
      })
    }
  },
  connection: {
    none() {
      if (isNative()) {
        return Connection.NONE
      }
    },
    unknown() {
      if (isNative()) {
        return Connection.UNKNOWN
      }
    }
  },
  statusBar: {
    backgroundColorByHexString(val: any) {
      if (isNative()) {
        StatusBar.backgroundColorByHexString(val)
      }
    }
  },
  keyboard: {
    automaticScrollToTopOnHiding(val: any) {
      if (isNative()) {
        window.Keyboard.automaticScrollToTopOnHiding = val
      }
    }
  }
}
