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
  /** for target */
  target: {
    /** 要素増加時に仮に設定しておく文字列 */
    defaultText: 'Edit here!',
  },
  /** for group */
  group: {
    /** インデント文字列 */
    indent: '  ',
  },
  /** for triggers */
  triggers: {
    /** トリガー要素の並び順とテキスト */
    maps: [
      {
        /** 発生させるクリックイベントの名前空間 */
        name: 'insert-before',
        /** トリガー要素の文字列 */
        text: '<',
      },
      {
        /** 発生させるクリックイベントの名前空間 */
        name: 'remove',
        /** トリガー要素の文字列 */
        text: '-',
      },
      {
        /** 発生させるクリックイベントの名前空間 */
        name: 'insert-after',
        /** トリガー要素の文字列 */
        text: '>',
      },
    ],
  },
};
