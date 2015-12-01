export default () => {
  var attrName, modName, jquerySrc, editableSrc, appendScript;
  attrName = 'data-editable';
  modName = 'script';
  jquerySrc = '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
  editableSrc = '//rawgit.com/dsktschy/editable/gh-pages/javascripts/editable.min.js';
  appendScript = (src, onload) => {
    var elem;
    elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.src = src;
    elem.setAttribute(attrName, modName);
    if (onload) {
      elem.onload = onload;
    }
    document.getElementsByTagName('head')[0].appendChild(elem);
  };
  if (document.querySelectorAll(`[${attrName}=${modName}]`).length) {
    return;
  }
  if (typeof jQuery === 'undefined') {
    appendScript(jquerySrc, appendScript.bind(null, editableSrc));
    return;
  }
  appendScript(editableSrc);
};
