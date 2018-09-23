import './main.css'

class App {
  static get messageNotSupported () {
    return 'This browser is not supported.'
  }
  static get fileNameDefault () {
    return 'index.html'
  }
  constructor () {
    this.appHtml = new AppHtml({
      onClickAppTriggerDownload: this.downloadHtml.bind(this)
    })
    this.onSupportedBrowser = FileReader != null
  }
  downloadHtml () {
    const el = document.createElement('a')
    const fileName = location.pathname.split('/').pop() || App.fileNameDefault
    const blob = new Blob([ this.appHtml.el.outerHTML ])
    el.setAttribute('download', fileName)
    el.setAttribute('href', URL.createObjectURL(blob))
    el.dispatchEvent(new MouseEvent('click'))
  }
}
class AppHtml {
  constructor ({ onClickAppTriggerDownload }) {
    this.el = document.documentElement
    this.appBody = new AppBody({ onClickAppTriggerDownload })
    this.setActivatedMark()
  }
  setActivatedMark () {
    this.el.setAttribute('data-editable', '')
  }
  removeActivatedMark () {
    this.el.removeAttribute('data-editable')
  }
}
class AppBody {
  constructor ({ onClickAppTriggerDownload }) {
    this.el = document.body
    this.appTriggerDownload = new AppTriggerDownload({
      onClick: onClickAppTriggerDownload
    })
    this.appTargets = this.createAppTargets()
    this.appUnitParents = this.createAppUnitParents()
    this.appendTrigger()
  }
  createAppTargets () {
    return Array.from(document.querySelectorAll(AppTarget.selector))
      .map(el => new AppTarget({ el }))
  }
  createAppUnitParents () {
    const appUnitElements = Array.from(document.querySelectorAll(AppUnit.selector))
    const appUnitParentElements = Array.from(new Set(appUnitElements.map(el => el.parentNode)))
    const map = new Map()
    for (let el of appUnitParentElements) map.set(el, [])
    for (let el of appUnitElements) map.get(el.parentNode).push(el)
    return appUnitParentElements.map(el => new AppUnitParent({
      el,
      appUnitElements: map.get(el)
    }))
  }
  appendTrigger () {
    this.el.appendChild(this.appTriggerDownload.el)
  }
  removeTrigger () {
    this.el.removeChild(this.appTriggerDownload.el)
  }
}
class AppTriggerDownload {
  static get template () {
    return '<div data-editable="trigger-download"></div>'
  }
  constructor ({ onClick }) {
    this.el = elementize(AppTriggerDownload.template)
    this.el.addEventListener('click', onClick)
  }
}
class AppTarget {
  static get selector () {
    return '[data-editable="target"]'
  }
  constructor ({ el }) {
    this.el = el
    this.enableToEdit()
  }
  enableToEdit () {
    this.el.setAttribute('contenteditable', '')
  }
  disableToEdit () {
    this.el.removeAttribute('contenteditable')
  }
}
class AppUnitParent {
  constructor ({ el, appUnitElements }) {
    this.el = el
    this.appUnits = appUnitElements.map(el => this.createAppUnit({ el }))
  }
  createAppUnit ({ el }) {
    return new AppUnit({
      el,
      onClickAppTriggerInsertUnitCloneBefore: this.insertAppUnitCloneBefore.bind(this),
      onClickAppTriggerInsertUnitCloneAfter: this.insertAppUnitCloneAfter.bind(this),
      onClickAppTriggerRemoveUnit: this.removeAppUnit.bind(this)
    })
  }
  insertAppUnitCloneBefore (appUnit) {
    const appUnitClone = this.createAppUnit({ el: appUnit.createElementClone() })
    this.appUnits.push(appUnitClone)
    this.el.insertBefore(appUnitClone.el, appUnit.el)
  }
  insertAppUnitCloneAfter (appUnit) {
    const appUnitClone = this.createAppUnit({ el: appUnit.createElementClone() })
    this.appUnits.push(appUnitClone)
    this.el.insertBefore(appUnitClone.el, appUnit.el.nextSibling)
  }
  removeAppUnit (appUnit) {
    this.el.removeChild(appUnit.el)
    this.appUnits.splice(this.appUnits.indexOf(appUnit), 1)
    appUnit = null
  }
}
class AppUnit {
  static get selector () {
    return '[data-editable="unit"]'
  }
  constructor ({
    el,
    onClickAppTriggerInsertUnitCloneBefore,
    onClickAppTriggerInsertUnitCloneAfter,
    onClickAppTriggerRemoveUnit
  }) {
    this.el = el
    this.appTriggerInsertUnitCloneBefore = new AppTriggerInsertUnitCloneBefore({
      onClick: () => { onClickAppTriggerInsertUnitCloneBefore(this) }
    })
    this.appTriggerInsertUnitCloneAfter = new AppTriggerInsertUnitCloneAfter({
      onClick: () => { onClickAppTriggerInsertUnitCloneAfter(this) }
    })
    this.appTriggerRemoveUnit = new AppTriggerRemoveUnit({
      onClick: () => { onClickAppTriggerRemoveUnit(this) }
    })
    this.editedStyle = false
    this.setPositionRelative()
    this.appendTriggerElements()
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
  appendTriggerElements () {
    this.el.appendChild(this.appTriggerInsertUnitCloneBefore.el)
    this.el.appendChild(this.appTriggerInsertUnitCloneAfter.el)
    this.el.appendChild(this.appTriggerRemoveUnit.el)
  }
  removeTriggerElements () {
    this.el.removeChild(this.appTriggerInsertUnitCloneBefore.el)
    this.el.removeChild(this.appTriggerInsertUnitCloneAfter.el)
    this.el.removeChild(this.appTriggerRemoveUnit.el)
  }
  createElementClone () {
    this.removeTriggerElements()
    const el = this.el.cloneNode(true)
    this.appendTriggerElements()
    return el
  }
}
class AppTriggerInsertUnitCloneBefore {
  static get template () {
    return '<div data-editable="trigger-insert-unit-clone-before"></div>'
  }
  constructor ({ onClick }) {
    this.el = elementize(AppTriggerInsertUnitCloneBefore.template)
    this.el.addEventListener('click', onClick)
  }
}
class AppTriggerInsertUnitCloneAfter {
  static get template () {
    return '<div data-editable="trigger-insert-unit-clone-after"></div>'
  }
  constructor ({ onClick }) {
    this.el = elementize(AppTriggerInsertUnitCloneAfter.template)
    this.el.addEventListener('click', onClick)
  }
}
class AppTriggerRemoveUnit {
  static get template () {
    return '<div data-editable="trigger-remove-unit"></div>'
  }
  constructor ({ onClick }) {
    this.el = elementize(AppTriggerRemoveUnit.template)
    this.el.addEventListener('click', onClick)
  }
}

const app = new App()
if (!app.onSupportedBrowser) throw new Error(App.messageNotSupported)

function elementize (str = '') {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
