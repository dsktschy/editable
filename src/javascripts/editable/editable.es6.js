import $ from 'jquery';
import modData from './data';
import modModel from './model';
import modTarget from './target';

const
  /** script要素のID */
  SCRIPT_ELEM_ID = 'editable-script',
  /** 非対応ブラウザーに表示するアラートメッセージ */
  ALERT_MESSAGE = '' +
    'This browser is not supported.\n' +
    'Please edit in GoogleChrome.';

var init, isValidBrowser, set$cache, $cache, onGetData;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    window: $(window),
    script: $(`#${SCRIPT_ELEM_ID}`),
  };
};

/**
 * データ取得完了時のコールバック
 */
onGetData = () => {
  console.log(modModel.getConfigMap());
};

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
  set$cache();
  modData.init();
  modModel.init(modData);
  modTarget.init();
  $cache.window.on('get-data', onGetData);
  modModel.getData($cache.script.data('config-src'));
};

export default {
  init,
};
