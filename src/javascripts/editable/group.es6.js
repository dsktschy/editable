import $ from 'jquery';
import modTriggers from './triggers';

const
  /** HTML要素名 */
  ELEM_NAME = 'editable-group';

var init, set$cache, $cache, cancelStaticPosOf, onMouseenter, onMouseleave;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`.${ELEM_NAME}`),
  };
};

/**
 * positionをstatic以外に設定する
 */
cancelStaticPosOf = ($elem) => {
  if ($elem.css('position') !== 'static') {
    return;
  }
  $elem
    .css('position', 'relative')
    .data('is-edited-style', true);
};

/**
 * カーソルが乗った時のハンドラー
 */
onMouseenter = ({currentTarget}) => {
  modTriggers.setVisible(true, $(currentTarget));
};

/**
 * カーソルが離れた時のハンドラー
 */
onMouseleave = ({currentTarget}) => {
  modTriggers.setVisible(false, $(currentTarget));
};

/**
 * module起動
 * @exports
 */
init = (modModel) => {
  set$cache();
  modTriggers.init($cache.self, modModel);
  $cache.self
    .each((index, elem) => {
      cancelStaticPosOf($(elem));
    })
    .on({
      mouseenter: onMouseenter,
      mouseleave: onMouseleave,
    });
};

export default {
  init,
};
