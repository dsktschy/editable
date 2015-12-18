const
  /** モジュール名 */
  MOD_NAME = 'script',
  /** セレクタ */
  SELF_SELECTOR = `[data-editable=${MOD_NAME}]`;

var reset;

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 * @param {Object} $html
 */
reset = ($html) => {
  $html.find(SELF_SELECTOR).remove();
};

export default {
  reset,
};
