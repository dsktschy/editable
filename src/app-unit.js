import AppTarget from './app-target'
import AppTriggerInsertUnitCloneBefore from './app-trigger-insert-unit-clone-before'
import AppTriggerInsertUnitCloneAfter from './app-trigger-insert-unit-clone-after'
import AppTriggerRemoveUnit from './app-trigger-remove-unit'

export default class AppUnit {
  static get selector () {
    return '[data-editable="unit"]'
  }
  constructor ({
    el,
    createAppTargets,
    elementize,
    onClickAppTriggerInsertUnitCloneBefore,
    onClickAppTriggerInsertUnitCloneAfter,
    onClickAppTriggerRemoveUnit
  }) {
    this.el = el
    this.appTargets = createAppTargets({
      appTargetElements: [ ...this.el.querySelectorAll(AppTarget.selector) ]
    })
    this.appTriggerInsertUnitCloneBefore = new AppTriggerInsertUnitCloneBefore({
      elementize,
      onClick: () => { onClickAppTriggerInsertUnitCloneBefore(this) }
    })
    this.appTriggerInsertUnitCloneAfter = new AppTriggerInsertUnitCloneAfter({
      elementize,
      onClick: () => { onClickAppTriggerInsertUnitCloneAfter(this) }
    })
    this.appTriggerRemoveUnit = new AppTriggerRemoveUnit({
      elementize,
      onClick: () => { onClickAppTriggerRemoveUnit(this) }
    })
    this.editedStyle = false
  }
  setPositionRelative () {
    if (getComputedStyle(this.el, null).position !== 'static') return
    this.el.style.position = 'relative'
    this.editedStyle = true
  }
  removePositionRelative () {
    if (!this.editedStyle) return
    const resetStyle = this.el.getAttribute('style')
      .replace(/position\s*:\s*relative\s*;\s*/, '')
    if (resetStyle.indexOf(':') > -1) {
      this.el.setAttribute('style', resetStyle)
    } else {
      this.el.removeAttribute('style')
    }
  }
  createElementClone () {
    this.deactivate()
    const el = this.el.cloneNode(true)
    this.activate()
    return el
  }
  activate () {
    this.setPositionRelative()
    this.el.appendChild(this.appTriggerInsertUnitCloneBefore.el)
    this.el.appendChild(this.appTriggerInsertUnitCloneAfter.el)
    this.el.appendChild(this.appTriggerRemoveUnit.el)
    for (let appTarget of this.appTargets) appTarget.activate()
  }
  deactivate () {
    for (let appTarget of this.appTargets) appTarget.deactivate()
    this.el.removeChild(this.appTriggerInsertUnitCloneBefore.el)
    this.el.removeChild(this.appTriggerInsertUnitCloneAfter.el)
    this.el.removeChild(this.appTriggerRemoveUnit.el)
    this.removePositionRelative()
  }
}
