import AppUnit from './app-unit'

export default class AppUnitParent {
  constructor ({ el, appUnitElements, createAppTargets, elementize }) {
    this.el = el
    this.createAppTargets = createAppTargets
    this.elementize = elementize
    this.appUnits = appUnitElements.map(el => this.createAppUnit({ el }))
  }
  createAppUnit ({ el }) {
    return new AppUnit({
      el,
      createAppTargets: this.createAppTargets,
      elementize: this.elementize,
      onClickAppTriggerInsertUnitCloneBefore: this.insertAppUnitCloneBefore.bind(this),
      onClickAppTriggerInsertUnitCloneAfter: this.insertAppUnitCloneAfter.bind(this),
      onClickAppTriggerRemoveUnit: this.removeAppUnit.bind(this)
    })
  }
  insertAppUnitCloneBefore (appUnit) {
    const appUnitClone = this.createAppUnit({ el: appUnit.createElementClone() })
    this.el.insertBefore(appUnitClone.el, appUnit.el)
    appUnitClone.activate()
    this.appUnits.push(appUnitClone)
  }
  insertAppUnitCloneAfter (appUnit) {
    const appUnitClone = this.createAppUnit({ el: appUnit.createElementClone() })
    this.el.insertBefore(appUnitClone.el, appUnit.el.nextSibling)
    appUnitClone.activate()
    this.appUnits.push(appUnitClone)
  }
  removeAppUnit (appUnit) {
    this.appUnits.splice(this.appUnits.indexOf(appUnit), 1)
    this.el.removeChild(appUnit.el)
    appUnit = null
  }
  activate () {
    for (let appUnit of this.appUnits) appUnit.activate()
  }
  deactivate () {
    for (let appUnit of this.appUnits) appUnit.deactivate()
  }
}
