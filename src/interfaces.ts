import config from '@/config.json'

let host = config[process.env.NODE_ENV].oneprotalHost
let oauth_host = config[process.env.NODE_ENV].oauthHost

export const oauth_login = `${oauth_host}/oauthserver/oauth/authorize`
export const oauth_get_token = `${oauth_host}/oauthserver/oauth/token`
export const get_todo_list = `${host}/api/v1/formRequest/getToDoList`
export const getUser = `${host}/getUser`
