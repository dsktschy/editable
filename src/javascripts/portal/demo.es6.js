import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'portal-demo',
  /** HTML */
  HTML = '' +
    `<div id="${MOD_NAME}" class="${MOD_NAME}">` +
      '<p>Demo</p>' +
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
