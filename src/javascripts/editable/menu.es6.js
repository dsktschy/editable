import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'editable-menu',
  /** ダウンロードリンク文言 */
  DOWNLOAD_ELEM_TEXT = 'Download',
  /** HTML */
  HTML = '' +
    `<div id="${MOD_NAME}" class="${MOD_NAME}">` +
      `<span>${DOWNLOAD_ELEM_TEXT}</span>` +
    '</div>';

var init, set$cache, $cache, onClick;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${MOD_NAME}`),
    download: $(`#${MOD_NAME}`).find('span'),
    window: $(window),
  };
};

/**
 * ダウンロードリンククリック時のハンドラー
 */
onClick = () => {
  $cache.window.trigger('click-download');
};

/**
 * module起動
 * @exports
 */
init = ($wrapper) => {
  $wrapper.prepend(HTML);
  set$cache();
  $cache.download.on('click', onClick);
};

export default {
  init,
};
