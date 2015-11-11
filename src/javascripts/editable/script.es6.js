const
  /** モジュール名 */
  MOD_NAME = 'editable-script';

var reset;

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 */
reset = ($html) => {
  $html.find(`#${MOD_NAME}`).remove();
};

export default {
  reset,
};
