import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'editable-target',
  /** ctrl,commandとの同時押下が有効なキーのコード */
  VALID_SHORTCUT_KEY_CODES = [65, 67, 86, 88, 89, 90];

var init, set$cache, $cache, onKeydown;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`.${MOD_NAME}`),
  };
};

/**
 * キーボード操作時のハンドラー
 *   コピー・カット・ペースト・全選択・redo・undo以外のショートカットと
 *   Enterのみ(Shiftなし)での改行を無効化する
 */
onKeydown = ({ctrlKey, metaKey, which, shiftKey}) => {
  var
    isPushedCTRL, isPushedCTRLOrCommand, isPushedValidShortcutKey,
    isPushedCommand, isPushedInvalidShortcut, isPushedEnterWithoutShift;
  isPushedCTRL = ctrlKey && !metaKey;
  isPushedCommand = metaKey && !ctrlKey;
  isPushedCTRLOrCommand = isPushedCTRL || isPushedCommand;
  isPushedValidShortcutKey = VALID_SHORTCUT_KEY_CODES.indexOf(which) > -1;
  isPushedInvalidShortcut = isPushedCTRLOrCommand && !isPushedValidShortcutKey;
  isPushedEnterWithoutShift = which === 13 && !shiftKey;
  if (isPushedInvalidShortcut || isPushedEnterWithoutShift) {
    return false;
  }
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.self
    .on('keydown', onKeydown)
    .prop('contenteditable', true);
};

export default {
  init,
};
