import $ from 'jquery';
import modData from './data';
import modModel from './model';
import modScript from './script';
import modMenu from './menu';
import modTarget from './target';
import modGroup from './group';

const
  /** モジュール名 */
  MOD_NAME = 'editable',
  /** ユーザー設定マップの相対パス */
  CONFIG_JSON_URL = 'editable-config.json',
  /** 非対応ブラウザに表示するアラートメッセージ */
  ALERT_MESSAGE = '' +
    'This browser is not supported.\n' +
    'Please edit in GoogleChrome.',
  /** URLのベースネームが存在しない場合に使用するダウンロードファイル名 */
  DEFAULT_FILE_NAME = 'index.html';

var
  init, isValidBrowser, set$cache, $cache, onGetData, onClickDownload,
  getFileName, getFileContent, isReady, getHTML;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    window: $(window),
    body: $('body'),
  };
};

/**
 * 有効なブラウザかどうか
 *   IE9以下とSafari(downloadできない)は非対応とする
 *   FileReaderがIE9以下には存在せずSafariのみobject扱いであることを利用する
 */
isValidBrowser = () => typeof window.FileReader === 'function';

/**
 * ファイル名を取得する
 *   ドメインのみである場合はDEFAULT_FILE_NAMEを
 *   それ以外の場合はURLのベースネームをファイル名として使用する
 */
getFileName = () =>
  window.location.pathname.split('/').pop() || DEFAULT_FILE_NAME;

/**
 * html要素を取得する
 */
getHTML = () => {
  var $html,
    {removedElements, removedAttributeMap, indent, eol}
      = modModel.getConfigMap()[MOD_NAME];
  $html = $('html').clone(true);
  modScript.reset($html);
  modMenu.reset($html);
  modTarget.reset($html);
  modTarget.convertLink($html);
  modGroup.reset($html);
  for (let selector of removedElements) {
    $html.find(selector).remove();
  }
  for (let key in removedAttributeMap) {
    if (!removedAttributeMap.hasOwnProperty(key)) {
      continue;
    }
    $html.find(key).removeAttr(removedAttributeMap[key]);
  }
  return modGroup.removeMarker($html[0].outerHTML)
    .replace(/><head/, `>\n${indent}<head`)
    .replace(new RegExp(`\n${eol}</body>`), '</body>\n');
};

/**
 * ファイルの内容を取得する
 */
getFileContent = () => {
  var {doctype, eol} = modModel.getConfigMap()[MOD_NAME];
  return doctype + getHTML() + eol;
};

/**
 * データ取得完了時のコールバック
 */
onGetData = () => {
  isReady = true;
};

/**
 * ダウンロードリンククリック時のハンドラ
 *   テキストをファイル化し、名前を付けてダウンロードする
 *   IEとそれ以外で処理を分ける
 */
onClickDownload = () => {
  var name, blob;
  if (!isReady) {
    return;
  }
  name = getFileName();
  blob = new Blob([getFileContent()]);
  if (window.navigator.msSaveBlob) {
    window.navigator.msSaveBlob(blob, name);
    return;
  }
  $('<a>').attr({
    download: name,
    href: (window.URL || window.webkitURL).createObjectURL(blob),
  })[0].dispatchEvent(new MouseEvent('click'));
};

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
  modMenu.init($cache.body, modModel);
  modTarget.init(modModel);
  modGroup.init(modModel);
  $cache.window.on({
    'get-data': onGetData,
    'click-download': onClickDownload,
  });
  modModel.getData(CONFIG_JSON_URL);
};

export default {
  init,
};
