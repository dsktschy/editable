import $ from 'jquery';

const
  /** HTML要素名 */
  ELEM_NAME = 'editable-menu',
  /** ダウンロードリンク文言 */
  DOWNLOAD_ELEM_TEXT = 'Download',
  /** HTML */
  HTML = '' +
    `<div id="${ELEM_NAME}" class="${ELEM_NAME}">` +
      `<span>${DOWNLOAD_ELEM_TEXT}</span>` +
    '</div>';

var init, set$cache, $cache, onClick, reset;

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
  reset,
};
