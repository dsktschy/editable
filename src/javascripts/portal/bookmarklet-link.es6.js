import $ from 'jquery';
import makeEditable from './make-editable';

const
  /** HTML要素名 */
  ELEM_NAME = 'portal-bookmarklet-link';

var init, set$cache, $cache, initAnchor;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${ELEM_NAME}`),
    anchor: $(`#${ELEM_NAME}`).find('a'),
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
