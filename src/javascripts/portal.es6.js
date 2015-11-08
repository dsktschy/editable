import $ from 'jquery';
import bookmarkletLink from './bookmarklet-link';

const
  /** モジュール名 */
  MOD_NAME = 'portal',
  /** HTML */
  HTML = `<div id="${MOD_NAME}" class="${MOD_NAME}"></div>`;

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
  bookmarkletLink.init($cache.self);
};

export default {
  init,
};
