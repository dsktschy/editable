import $ from 'jquery';

const
  /** HTML要素名 */
  ELEM_NAME = 'portal-demo';

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
};

export default {
  init,
};
