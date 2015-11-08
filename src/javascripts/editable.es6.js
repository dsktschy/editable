const
  /** 非対応ブラウザーに表示するアラートメッセージ */
  ALERT_MESSAGE = '' +
    'This browser is not supported.\n' +
    'Please edit in GoogleChrome.';

var init, isValidBrowser;

/**
 * 有効なブラウザーかどうか
 *   IE9以下とSafari(downloadできない)は非対応とする
 *   FileReaderがIE9以下には存在せずSafariのみobject扱いであることを利用する
 */
isValidBrowser = () => typeof window.FileReader === 'function';

/**
 * module起動
 * @exports
 */
init = () => {
  if (!isValidBrowser()) {
    alert(ALERT_MESSAGE);
    return;
  }
};

export default {
  init,
};
