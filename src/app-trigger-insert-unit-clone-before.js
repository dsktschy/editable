export default class AppTriggerInsertUnitCloneBefore {
  static get template () {
    return '<div data-editable="trigger-insert-unit-clone-before"></div>'
  }
  constructor ({ elementize, onClick }) {
    this.el = elementize(AppTriggerInsertUnitCloneBefore.template)
    this.el.addEventListener('click', onClick)
  }
}
