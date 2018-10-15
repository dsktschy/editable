export default class AppTriggerDownload {
  static get template () {
    return '<div data-editable="trigger-download"></div>'
  }
  constructor ({ elementize, onClick }) {
    this.el = elementize(AppTriggerDownload.template)
    this.el.addEventListener('click', onClick)
  }
}
