import $ from 'jquery';
import makeEditable from './make-editable';

const
  /** モジュール名 */
  MOD_NAME = 'portal-bookmarklet-link';

var init, set$cache, $cache, initAnchor;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${MOD_NAME}`),
    anchor: $(`#${MOD_NAME}`).find('a'),
  };
};

/**
 * a要素にブックマークレットを設定する
 */
initAnchor = () => {
  var encodedMakeEditable;
  encodedMakeEditable = encodeURIComponent(makeEditable.toString());
  $cache.anchor.attr('href', `javascript:(${encodedMakeEditable})();`);
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  initAnchor();
};

export default {
  init,
};
