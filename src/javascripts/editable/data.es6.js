import $ from 'jquery';

var init, getParsedData;

/**
 * データを取得してパース
 * @exports
 * @param {string} url
 * @param {Function} onSuccess
 * @param {Function} onError
 */
getParsedData = (url, onSuccess, onError) => {
  $.getJSON(url)
    .done(onSuccess)
    .fail(onError);
};

/**
 * module起動
 * @exports
 */
init = () => {};

export default {
  init,
  getParsedData,
};
