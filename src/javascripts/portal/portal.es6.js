import $ from 'jquery';
import modBookmarkletLink from './bookmarklet-link';
import modDemo from './demo';

const
  /** HTML要素名 */
  ELEM_NAME = 'portal';

var init, set$cache, $cache;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${ELEM_NAME}`),
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
