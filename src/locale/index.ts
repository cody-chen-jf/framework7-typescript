import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langCN from '@/locale/lang/cn'
import langTW from '@/locale/lang/tw'
import langEN from '@/locale/lang/en'

Vue.use(VueI18n)

// 自动根据浏览器系统语言设置语言
let lang = localStorage.getItem('lang') || 'en-US'

const messages = {
  'zh-CN': langCN,
  'zh-TW': langTW,
  'en-US': langEN
}

const i18n = new VueI18n({
  locale: lang,
  messages
})

export default i18n
