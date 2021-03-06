type Platform = 'browser' | 'android' | 'ios';

declare const cordova: AnyObject;
declare const __VERSION__: string;

interface Window {
  vue: AnyObject
  $sentry: AnyObject
  plugins: AnyObject
}

interface AnyObject {
  [propName: string]: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'dev' | 'prod' | 'qa' | 'pp'
    flurry: string
  }
}
