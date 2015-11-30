export default () => {
  var className, jquerySrc, editableSrc, appendScript;
  className = 'editable-script';
  jquerySrc = '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js';
  editableSrc = '//raw.githubusercontent.com/dsktschy/editable/gh-pages/javascripts/editable.min.js';
  appendScript = (src, onload) => {
    var elem;
    elem = document.createElement('script');
    elem.className = className;
    elem.type = 'text/javascript';
    elem.src = src;
    if (onload) {
      elem.onload = onload;
    }
    document.getElementsByTagName('head')[0].appendChild(elem);
  };
  if (document.getElementsByClassName(className).length) {
    return;
  }
  if (typeof jQuery === 'undefined') {
    appendScript(jquerySrc, appendScript.bind(null, editableSrc));
    return;
  }
  appendScript(editableSrc);
};
