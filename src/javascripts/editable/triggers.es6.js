import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'triggers',
  /** HTML要素名 */
  ELEM_NAME = 'editable-triggers',
  /** HTML */
  HTML = '' +
    `<div class="${ELEM_NAME}">` +
      '<span></span>' +
      '<span></span>' +
      '<span></span>' +
    '</div>';

var
  init, set$cache, $cache, onGetData, modModel, insertBefore, insertAfter,
  remove, handlerMap;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`.${ELEM_NAME}`),
    window: $(window),
  };
};

/**
 *
 */
insertBefore = () => {

};

/**
 *
 */
insertAfter = () => {

};

/**
 *
 */
remove = () => {

};

/**
 * ハンドラー関数マップ
 */
handlerMap = {insertBefore, insertAfter, remove};

/**
 * データ取得完了時のコールバック
 */
onGetData = () => {
  var {maps} = modModel.getConfigMap()[MOD_NAME];
  $cache.self.each((index, triggers) => {
    $(triggers).children().each((_index, trigger) => {
      var {handlerName, text} = maps[_index];
      $(trigger)
        .on('click', handlerMap[handlerName])
        .html(text);
    });
  });
};

/**
 * module起動
 * @exports
 */
init = ($wrapper, _modModel) => {
  modModel = _modModel;
  $wrapper.prepend(HTML);
  set$cache();
  $cache.window.on('get-data', onGetData);
};

export default {
  init,
};
