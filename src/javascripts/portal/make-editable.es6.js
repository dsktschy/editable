export default () => {
  var id, elem;
  id = 'editable-script';
  if (document.getElementById(id)) {
    return;
  }
  elem = document.createElement('script');
  elem.id = id;
  elem.type = 'text/javascript';
  elem.src = 'javascripts/editable.min.js';
  elem.setAttribute('data-config-src', 'javascripts/editable-config.json');
  document.getElementsByTagName('head')[0].appendChild(elem);
};
