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

var init, set$cache, $cache;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${MOD_NAME}`),
  };
};

/**
 * module起動
 * @exports
 */
init = ($wrapper) => {
  $wrapper.prepend(HTML);
  set$cache();
};

export default {
  init,
};
