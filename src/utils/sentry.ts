/*
 *  NativeStorage, Sentry
 * */
import config from '@/config.json'
import nativePluginHelper from '@/utils/nativePlugin'
import * as globalConstant from '@/constant'

export default {
  async init() {
    console.log('sentry init', process.env.NODE_ENV)
    await nativePluginHelper.sentry.init(config[process.env.NODE_ENV].sentryKey, process.env.NODE_ENV)
  },
  async setUserName() {
    let currentUserInfo = await nativePluginHelper.nativeStorage.getItem(globalConstant.CURRENT_USER_INFO_KEY)
    console.log('setUserName currentUserInfo', currentUserInfo)
    let userName = undefined
    if (currentUserInfo) {
      userName = JSON.parse(currentUserInfo).displayName
    }
    if (userName) {
      await nativePluginHelper.sentry.setUserName(userName)
    }
  }
}
