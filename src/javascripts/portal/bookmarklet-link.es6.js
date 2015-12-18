import $ from 'jquery';
import makeEditable from './make-editable';

const
  /** HTML要素名 */
  ELEM_NAME = 'portal-bookmarklet-link',
  /** IEをリンクのDnDに対応させるためにかぶせる画像 */
  COVERING_IMG_SRC = '/images/spacer.gif',
  /** IEをリンクのDnDに対応させるためにかぶせる画像の代替テキスト */
  COVERING_IMG_ALT = 'Make Editable';

var init, set$cache, $cache, initAnchor, onMousedown, onMouseup, onDragend;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`#${ELEM_NAME}`),
  };
};

/**
 * a要素にブックマークレットを設定する
 */
initAnchor = () => {
  var encodedMakeEditable;
  encodedMakeEditable = encodeURIComponent(makeEditable.toString());
  $cache.self.attr('href', `javascript:(${encodedMakeEditable})();`);
};

/**
 * マウス押下時のハンドラ(IEのみ)
 *   IEのみ、リンクをドラッグする際にimg要素の上を通過しないと
 *   dragstartが発火しないため、必ず通過するよう透明な画像でa要素を覆う
 */
onMousedown = () => {
  $cache.self
    .css('position', 'relative')
    .prepend(
      $('<img>')
        .attr({
          src: COVERING_IMG_SRC,
          alt: COVERING_IMG_ALT,
        })
        .css({
          display: 'block',
          position: 'fixed',
          width: '100%',
          height: $cache.self.height(),
        })
    );
};

/**
 * マウスを離した時のハンドラ(IEのみ)
 */
onMouseup = () => {
  $cache.self
    .removeAttr('style')
    .children('img').remove();
  makeEditable();
};

/**
 * ドラッグ終了時のハンドラ(IEのみ)
 */
onDragend = () => {
  $cache.self
    .removeAttr('style')
    .children('img').remove();
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  initAnchor();
  if (window.navigator.msSaveBlob) {
    $cache.self.on({
      mousedown: onMousedown,
      mouseup: onMouseup,
      dragend: onDragend,
    });
  }
};

export default {
  init,
};
