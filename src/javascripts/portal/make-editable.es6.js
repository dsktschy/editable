export default () => {
  var id, elem;
  id = 'editable-script';
  if (document.getElementById(id)) {
    return;
  }
  elem = document.createElement('script');
  elem.id = id;
  elem.type = 'text/javascript';
  elem.src = '//localhost:3000/javascripts/editable.min.js';
  document.getElementsByTagName('head')[0].appendChild(elem);
};
