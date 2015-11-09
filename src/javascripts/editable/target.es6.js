import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'editable-target';

var init, set$cache, $cache;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`.${MOD_NAME}`),
  };
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.self.prop('contenteditable', true);
};

export default {
  init,
};
