const
  /** HTML要素名 */
  ELEM_NAME = 'editable-script';

var reset;

/**
 * 渡されたhtmlからeditableによる変更を取り消す
 * @exports
 */
reset = ($html) => {
  $html.find(`#${ELEM_NAME}`).remove();
};

export default {
  reset,
};
