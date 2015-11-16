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
  remove, handlerMap, setVisible;

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
 * 渡された要素内のトリガーの表示/非表示を切り替える
 * @exports
 */
setVisible = (bool, $group) => {
  $group.find(`.${ELEM_NAME}`).css('opacity', +bool);
};

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
  $cache.self.css('opacity', 0);
  $cache.window.on('get-data', onGetData);
};

export default {
  init,
  setVisible,
};
