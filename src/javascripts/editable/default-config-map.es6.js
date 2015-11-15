export default {
  /** for editable */
  editable: {
    /** doctype宣言部分(jsによる完全取得は不可能) */
    doctype: '<!DOCTYPE html>\n',
    /** インデント文字列 */
    indent: '  ',
    /** ダウンロード時に削除されるべき要素を指すセレクター */
    removedElements: [],
    /**
     * ダウンロード時に削除されるべき属性とそれを持つ要素のセレクター
     *   [selector, attributeName]の形式で指定
     */
    removedAttributes: [],
    /** ファイルの末尾の空行文字(存在しない場合は空文字を指定) */
    eol: '\n',
  },
  /** for triggers */
  triggers: {
    /** トリガー要素の並び順とテキスト */
    maps: [
      {
        /** 前方挿入ハンドラー */
        handlerName: 'insertBefore',
        /** トリガー要素の文字列 */
        text: '<',
      },
      {
        /** 削除ハンドラー */
        handlerName: 'remove',
        /** トリガー要素の文字列 */
        text: '-',
      },
      {
        /** 後方挿入ハンドラー */
        handlerName: 'insertAfter',
        /** トリガー要素の文字列 */
        text: '>',
      },
    ],
  },
};
