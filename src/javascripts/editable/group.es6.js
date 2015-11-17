import $ from 'jquery';
import modTriggers from './triggers';

const
  /** モジュール名 */
  MOD_NAME = 'group',
  /** HTML要素名 */
  ELEM_NAME = 'editable-group';

var
  init, set$cache, $cache, cancelStaticPosOf, onMouseenter, onMouseleave,
  createCloneOf, insertCloneOf, onClickTrigger, modModel, remove, removeMarker;

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
 * 渡されたグループのクローンを生成し初期化する
 *   生成挿入されてからカーソルが動かされるまでの間の
 *   トリガー要素の透明度も合わせて設定する
 */
createCloneOf = ($group, direction) => {
  var $clone;
  $clone = $group.clone(true);
  modTriggers.setVisible(direction !== 'before', $group);
  modTriggers.setVisible(direction === 'before', $clone);
  $cache.window.trigger('create-group-clone', [$clone]);
  return $clone;
};

/**
 * 渡されたグループのクローンを指定された方向に挿入する
 *   改行とインデントも合わせて挿入する
 */
insertCloneOf = ($group, direction) => {
  var $clone, whiteSpace,
    {indent} = modModel.getConfigMap()[MOD_NAME];
  $clone = createCloneOf($group, direction);
  whiteSpace = '\n';
  for (let i = 0; i < $group.parents().length; i++) {
    whiteSpace += indent;
  }
  $group[direction]($clone)[direction](whiteSpace);
};

/**
 * 渡されたグループを削除しグループ削除箇所を示すマーカーを挿入する
 */
remove = ($group) => {
  var {removedElemMarker} = modModel.getConfigMap()[MOD_NAME];
  modTriggers.setVisible(true, $group.next(`.${ELEM_NAME}`));
  $group
    .before(removedElemMarker)
    .remove();
};

/**
 * 渡された文字列からグループ削除箇所のマーカーを削除する
 * @exports
 */
removeMarker = (html) => {
  var {removedElemMarker} = modModel.getConfigMap()[MOD_NAME];
  return html.replace(new RegExp(`\\s*${removedElemMarker}`, 'mg'), '');
};

/**
 * トリガー要素がクリックされた時のハンドラー
 */
onClickTrigger = (event, trigger) => {
  var $group;
  $group = $(trigger).parents(`.${ELEM_NAME}`);
  switch (event.namespace) {
    case 'insert-before':
      insertCloneOf($group, 'before');
      break;
    case 'insert-after':
      insertCloneOf($group, 'after');
      break;
    case 'remove':
      remove($group);
      break;
  }
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
init = (_modModel) => {
  modModel = _modModel;
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
  $cache.window.on(
    'click-trigger.insert-before.insert-after.remove',
    onClickTrigger
  );
};

export default {
  init,
  removeMarker,
};
