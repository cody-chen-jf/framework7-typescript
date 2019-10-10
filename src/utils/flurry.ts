/*
 *  NativeStorage, Sentry
 * */
import config from '@/config.json'
import nativePluginHelper from '@/utils/nativePlugin'
import * as globalConstant from '@/constant'

export default {
  async init() {
    let currentUserInfo = await nativePluginHelper.nativeStorage.getItem(globalConstant.CURRENT_USER_INFO_KEY)
    let userName = ''
    if (currentUserInfo) {
      userName = JSON.parse(currentUserInfo).displayName
    }
    if (userName) {
      let key = ''
      if (nativePluginHelper.device.platform().toUpperCase() === globalConstant.ANDROID_PLATFORM.toUpperCase()) {
        key = 'androidKey'
      } else {
        key = 'iosKey'
      }
      console.log('sss === ', __VERSION__)
      const flurryKey = (config[process.env.NODE_ENV] as any).flurry[key]
      nativePluginHelper.flurry.init(flurryKey, __VERSION__, userName)
    }
  },
  logEvent(eventName: string, param: any) {
    nativePluginHelper.flurry.logEvent(eventName, param)
  },
  event: {
    SWITCH_MENU: {
      name: 'SWITCH MENU',
      param: 'menu:{0}'
    },
    SWITCH_FORM_TYPE: {
      name: 'OPEN FORM TYPE',
      param: 'formType:{0}'
    },
    OPEN_FORM_DETAIL: {
      name: 'OPEN FORM DETAIL',
      param: 'formNum:{0},status:{1}'
    },
    OPEN_MORE_DETAIL: {
      name: 'OPEN MORE DETAIL',
      param: 'formNum:{0},status:{1},type:{2}'
    },
    APPROVAL_ACTION: {
      name: 'APPROVAL ACTION',
      param: 'formNum:{0},status:{1},action:{2}'
    },
    SEARCH_FORM: {
      name: 'SEARCH FORM',
      param: 'formNum:{0}'
    },
    FILTER_SEARCH: {
      name: 'FILTER SEARCH',
      param: 'formType:{0},filter:{1}'
    },
    DOWNLOAD_DOCUMENT: {
      name: 'DOWNLOAD DOCUMENT',
      param: 'fileName:{0}'
    },
    SWITCH_LANGUAGE: {
      name: 'SWITCH LANGUAGE',
      param: 'originalLang:{0},DestinedLang:{1}'
    },
    LOGIN: {
      name: 'LOGIN'
    },
    LOGOUT: {
      name: 'LOGOUT'
    }
  }
}
