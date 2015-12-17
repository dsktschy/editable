import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'menu',
  /** HTML要素名 */
  ELEM_NAME = 'editable-menu',
  /** ダウンロードリンク文言 */
  DOWNLOAD_ELEM_TEXT = 'Download',
  /** HTML */
  HTML = '' +
    `<div id="${ELEM_NAME}">` +
      `<span>${DOWNLOAD_ELEM_TEXT}</span>` +
    '</div>';

var init, set$cache, $cache, onClick, reset, onGetData, modModel;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${ELEM_NAME}`),
    download: $(`#${ELEM_NAME}`).find('span'),
    window: $(window),
  };
};

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 */
reset = ($html) => {
  $html.find(`#${ELEM_NAME}`).remove();
};

/**
 * ダウンロードリンククリック時のハンドラー
 */
onClick = () => {
  $cache.window.trigger('click-download');
};

/**
 * データ取得完了時のコールバック
 *   スタイルを設定する
 */
onGetData = () => {
  var {styleMap} = modModel.getConfigMap()[MOD_NAME];
  for (let key in styleMap) {
    if (!styleMap.hasOwnProperty(key)) {
      continue;
    }
    (key ? $cache.self.find(key) : $cache.self).css(styleMap[key]);
  }
};

/**
 * module起動
 * @exports
 */
init = ($wrapper, _modModel) => {
  modModel = _modModel;
  $wrapper.prepend(HTML);
  set$cache();
  $cache.download.on('click', onClick);
  $cache.window.on('get-data', onGetData);
};

export default {
  init,
  reset,
};
