export default class AppTriggerInsertUnitCloneAfter {
  static get template () {
    return '<div data-editable="trigger-insert-unit-clone-after"></div>'
  }
  constructor ({ elementize, onClick }) {
    this.el = elementize(AppTriggerInsertUnitCloneAfter.template)
    this.el.addEventListener('click', onClick)
  }
}
