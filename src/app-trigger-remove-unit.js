export default class AppTriggerRemoveUnit {
  static get template () {
    return '<div data-editable="trigger-remove-unit"></div>'
  }
  constructor ({ elementize, onClick }) {
    this.el = elementize(AppTriggerRemoveUnit.template)
    this.el.addEventListener('click', onClick)
  }
}
