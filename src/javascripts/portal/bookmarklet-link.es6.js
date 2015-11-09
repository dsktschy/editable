import $ from 'jquery';
import makeEditable from './make-editable';

const
  /** モジュール名 */
  MOD_NAME = 'bookmarklet-link',
  /** a要素の文言 */
  ANCHOR_TEXT = 'Make editable',
  /** URIエンコードしたmakeEditable関数 */
  ENCODED_MAKE_EDITABLE = encodeURIComponent(makeEditable.toString()),
  /** HTML */
  HTML = '' +
    `<div id="${MOD_NAME}" class="${MOD_NAME}">` +
      `<a href="javascript:(${ENCODED_MAKE_EDITABLE})();">${ANCHOR_TEXT}</a>` +
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
  $wrapper.append(HTML);
  set$cache();
};

export default {
  init,
};
