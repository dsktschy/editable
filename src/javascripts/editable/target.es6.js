import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'editable-target',
  /** ctrl,commandとの同時押下が有効なキーのコード */
  VALID_SHORTCUT_KEY_CODES = [65, 67, 86, 88, 89, 90],
  /** 入力テキストからスタイルを抜ききれないブラウザーに表示するアラートメッセージ */
  ALERT_MESSAGE = '' +
    'In this browser, paste is not supported.\n' +
    'Please edit in GoogleChrome.';

var init, set$cache, $cache, onKeydown, onPaste, reset;

/**
 * jqueryオブジェクトを保持
 */
set$cache = () => {
  $cache = {
    self: $(`.${MOD_NAME}`),
  };
};

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 */
reset = ($html) => {
  $html.find(`.${MOD_NAME}`).removeAttr('contenteditable');
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
 * ペースト時のハンドラー
 *   リッチテキストからプレーンテキストに、改行を半角スペースに変換する
 *   IEはスタイルを抜ききれないため非対応とする
 */
onPaste = ({originalEvent: {clipboardData}}) => {
  if (!clipboardData) {
    alert(ALERT_MESSAGE);
    return false;
  }
  document.execCommand(
    'insertText',
    false,
    (clipboardData.getData('text/plain') || '').replace(/[\n\r]/g, ' ')
  );
  return false;
};

/**
 * module起動
 * @exports
 */
init = () => {
  set$cache();
  $cache.self
    .on('keydown', onKeydown)
    .prop('contenteditable', true)
    .each((index, elem) => {
      $(elem).on('paste', onPaste);
    });
};

export default {
  init,
  reset,
};
