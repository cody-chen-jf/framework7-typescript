interface Window {
  StatusBar: StatusBar;
  Keyboard: AnyObject;
  flurryAnalytics: AnyObject;
}

declare var Connection: {
  UNKNOWN: string;
  ETHERNET: string;
  WIFI: string;
  CELL_2G: string;
  CELL_3G: string;
  CELL_4G: string;
  CELL: string;
  NONE: string;
}

interface StatusBar {
  overlaysWebView: (isOverlay: boolean) => void;
  styleDefault: () => void;
  styleLightContent: () => void;
  styleBlackTranslucent: () => void;
  styleBlackOpaque: () => void;
  backgroundColorByName: (color: string) => void;
  backgroundColorByHexString: (color: string) => void;
  hide: () => void;
  show: () => void;
  isVisible: boolean;
}

declare var StatusBar: StatusBar;


interface NativeStorage {
  getItem(key: any, success: Function, fail: Function): void;
  setItem(key: any, val: any, success: Function, fail: Function): void;
  remove(key: any, success: Function, fail: Function): void;
}

declare var NativeStorage: NativeStorage;

declare module SpinnerPlugin {
  interface SpinnerPluginStatic {
    activityStart(labelText?: string, options?: Options, successCallback?: () => void, failureCallback?: (error: string) => void): void;
    activityStop(successCallback?: () => void, failureCallback?: (error: string) => void): void;
  }

  interface Options {
    dimBackground?: boolean;
  }
}

declare var SpinnerPlugin: SpinnerPlugin.SpinnerPluginStatic;

interface Navigator {
  splashscreen: {
    hide(): void;
    show(): void;
  }
  app: AnyObject
}

interface Device {
  cordova: string;
  available: boolean;
  model: string;
  platform: string;
  uuid: string;
  version: string;
  manufacturer: string;
  isVirtual: boolean;
  serial: string;
}

declare var device: Device;

declare class FlurryAnalytics {
  constructor(object: AnyObject);
  logEvent(event: AnyObject, params?: AnyObject, success?: Function, error?: Function ): void
}
