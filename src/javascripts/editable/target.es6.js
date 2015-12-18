import $ from 'jquery';

const
  /** モジュール名 */
  MOD_NAME = 'target',
  /** セレクタ */
  SELF_SELECTOR = `[data-editable=${MOD_NAME}]`,
  /** ctrl,commandとの同時押下が有効なキーのコード */
  VALID_SHORTCUT_KEY_CODES = [65, 67, 86, 88, 89, 90],
  /** 入力テキストからスタイルを抜ききれないブラウザに表示するアラートメッセージ */
  ALERT_MESSAGE = '' +
    'In this browser, paste is not supported.\n' +
    'Please edit in GoogleChrome.';

var
  init, set$cache, $cache, onKeydown, onPaste, reset, convertLink,
  onCreateGroupClone, modModel, makeEditable;

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
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 * @param {Object} $html
 */
reset = ($html) => {
  $html.find(SELF_SELECTOR).removeAttr('contenteditable');
};

/**
 * 渡されたhtml中のmarkdown記法のリンクをHTMLのa要素へ変換する
 * @exports
 * @param {Object} $html
 */
convertLink = ($html) => {
  $html.find(SELF_SELECTOR).html((index, html) => html.replace(
    /\[.*?\]\(.*?\)/mg,
    (match) => {
      var brackets, parentheses, url, text;
      brackets = match.match(/\[.*?\]\(/)[0].slice(0, -1);
      parentheses = match.replace(brackets, '');
      url = parentheses.slice(1, -1);
      text = brackets.slice(1, -1);
      return `<a href="${url}">${text}</a>`;
    }
  ));
};

/**
 * contenteditable属性をセットする
 *   子要素にブロック要素を持つ場合はスルー
 */
makeEditable = () => {
  $cache.self.each((index, target) => {
    var $target, hasBlock;
    $target = $(target);
    hasBlock = false;
    $target.children().each((_index, child) => {
      if (hasBlock) {
        return;
      }
      hasBlock = $(child).css('display') === 'block';
    });
    if (hasBlock) {
      return;
    }
    $target.prop('contenteditable', true);
  });
};

/**
 * キーボード操作時のハンドラ
 *   コピー・カット・ペースト・全選択・redo・undo以外のショートカットと
 *   Enterのみ(Shiftなし)での改行を無効化する
 * @param {Object}
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
 * ペースト時のハンドラ
 *   リッチテキストからプレーンテキストに、改行を半角スペースに変換する
 *   IEはスタイルを抜ききれないため非対応とする
 * @param {Object}
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
 * グループのクローンが生成された時のハンドラ
 *   仮文字列を設定する
 * @param {Object} event
 * @param {Object} $clone
 */
onCreateGroupClone = (event, $clone) => {
  var {defaultText} = modModel.getConfigMap()[MOD_NAME];
  $clone.find(SELF_SELECTOR).html(defaultText);
};

/**
 * module起動
 * @exports
 * @param {Object} _modModel
 */
init = (_modModel) => {
  modModel = _modModel;
  set$cache();
  makeEditable();
  $cache.self
    .on('keydown', onKeydown)
    .each((index, elem) => {
      $(elem).on('paste', onPaste);
    });
  $cache.window.on('create-group-clone', onCreateGroupClone);
};

export default {
  init,
  reset,
  convertLink,
};
