import $ from 'jquery';
import modBookmarkletLink from './bookmarklet-link';
import modDemo from './demo';

const
  /** モジュール名 */
  MOD_NAME = 'portal';

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
init = () => {
  set$cache();
  modBookmarkletLink.init();
  modDemo.init();
};

export default {
  init,
};
