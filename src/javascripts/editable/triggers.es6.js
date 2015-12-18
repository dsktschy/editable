import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'triggers',
  /** セレクタ */
  SELF_SELECTOR = `[data-editable=${MOD_NAME}]`,
  /** HTML */
  HTML = '' +
    `<div data-editable="${MOD_NAME}">` +
      '<span></span>' +
      '<span></span>' +
      '<span></span>' +
    '</div>';

var init, set$cache, $cache, onGetData, modModel, setVisibility, reset;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(SELF_SELECTOR),
    window: $(window),
  };
};

/**
 * 渡された要素内のトリガーの表示/非表示を切り替える
 * @exports
 * @param {boolean} bool
 * @param {Object} $group
 */
setVisibility = (bool, $group) => {
  $group.find(SELF_SELECTOR).css('visibility', bool ? 'visible' : 'hidden');
};

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 * @param {Object} $html
 */
reset = ($html) => {
  $html.find(SELF_SELECTOR).remove();
};

/**
 * データ取得完了時のコールバック
 *   クリックイベント、テキスト、スタイルを設定する
 */
onGetData = () => {
  var {eventMaps, styleMap} = modModel.getConfigMap()[MOD_NAME];
  $cache.self.each((index, triggers) => {
    $(triggers).children().each((_index, trigger) => {
      var {name, text} = eventMaps[_index];
      $(trigger)
        .on('click', (event) => {
          $cache.window.trigger(`click-trigger.${name}`, [event.currentTarget]);
        })
        .html(text);
    });
  });
  for (let key in styleMap) {
    if (!styleMap.hasOwnProperty(key)) {
      continue;
    }
    (key ? $cache.self.find(key) : $cache.self).css(styleMap[key]);
  }
};

/**
 * module起動
 * @exports
 * @param {Object} $wrapper
 * @param {Object} _modModel
 */
init = ($wrapper, _modModel) => {
  modModel = _modModel;
  $wrapper.prepend(HTML);
  set$cache();
  $cache.self.css('visibility', 'hidden');
  $cache.window.on('get-data', onGetData);
};

export default {
  init,
  setVisibility,
  reset,
};
