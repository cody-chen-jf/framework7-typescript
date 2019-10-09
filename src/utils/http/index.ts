import axios, { AxiosRequestConfig } from 'axios'
import { ServerApiErrorInfo } from '@/types/sentry'

interface ResponseData<T> {
  data: T
  success: boolean
  errorMessage: string
  errorCode: number
}

function errorReport(url: string, error: string | Error, requestOptions: AxiosRequestConfig, response?: AnyObject) {
  console.log('error report')
  if (window.$sentry) {
    const errorInfo: ServerApiErrorInfo = {
      error: typeof error === 'string' ? new Error(error) : error,
      type: 'request',
      requestUrl: url,
      requestOptions: JSON.stringify(requestOptions)
    }

    if (response) {
      errorInfo.response = JSON.stringify(response)
    }

    window.$sentry.log(errorInfo)
  }
}

const DEFAULT_OPTIONS = {
  timeout: 30000
}

const instance = axios.create(DEFAULT_OPTIONS)

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (thrown) => {
    return Promise.reject(thrown)
  }
)

// 封装 axios
export default async function<T = any>(options: AxiosRequestConfig): Promise<ResponseData<T>> {
  const { url } = options

  const requestOptions = Object.assign(
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    options
  )

  try {
    const {
      data,
      data: { errorCode, errorMessage, success }
    } = await instance.request<ResponseData<T>>(requestOptions)
    if (!success) {
      errorReport(url!, errorMessage, requestOptions, data)
      throw new Error(errorMessage)
    }

    return data
  } catch (err) {
    errorReport(url!, err, requestOptions)
    throw err
  }
}
