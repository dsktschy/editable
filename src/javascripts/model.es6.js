import $ from 'jquery';
import defaultConfigMap from './default-config-map';

var
  init, getData, modData, onSuccessToGetParsedData, onErrorToGetParsedData,
  set$cache, $cache, configMap, getConfigMap, setConfigMap;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    window: $(window),
  };
};

/**
 * 設定マップをデフォルトに設定
 */
setConfigMap = () => {
  configMap = $.extend(true, {}, defaultConfigMap) || {};
};

/**
 * データ取得成功時のコールバック
 */
onSuccessToGetParsedData = (data) => {
  var userConfigMap;
  userConfigMap = data || {};
  $.extend(true, configMap, userConfigMap);
  $cache.window.trigger('get-data');
};

/**
 * データ取得失敗時のコールバック
 */
onErrorToGetParsedData = (e) => {
  console.log(e);
  $cache.window.trigger('get-data');
};

/**
 * データ取得開始
 * @exports
 */
getData = (url) => {
  modData.getParsedData(url, onSuccessToGetParsedData, onErrorToGetParsedData);
};

/**
 * 設定マップを返す
 *   書き換えられないようコピーを返す
 * @exports
 */
getConfigMap = () => $.extend(true, {}, configMap) || {};

/**
 * module起動
 * @exports
 */
init = (_modData) => {
  set$cache();
  setConfigMap();
  modData = _modData;
};

export default {
  init,
  getData,
  getConfigMap,
};
