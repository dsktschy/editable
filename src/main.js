import './main.css'

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
  constructor ({ el, paragraphize }) {
    this.el = el
    this.textContainable = this.isContainable('a')
    this.pContainable = this.isContainable('<p></p>')
    this.onKeydown = event => {
      if (this.pContainable) this.doIfEmpty(paragraphize)
      this.filterShortcut(event)
    }
  }
  isContainable (text) {
    const elementName = this.el.tagName.toLowerCase()
    const expectedHtml = `<${elementName}>${text}</${elementName}>`
    const el = document.createElement('div')
    el.innerHTML = expectedHtml
    // If innerHTML is illegal and automatically corrected,
    // these values don't match before and after assignment
    return el.innerHTML === expectedHtml
  }
  doIfEmpty (fn) {
    if (!this.el.innerHTML) fn()
  }
  activate () {
    this.el.addEventListener('keydown', this.onKeydown)
    if (!this.textContainable) return
    this.el.setAttribute('contenteditable', '')
  }
  deactivate () {
    this.el.removeAttribute('contenteditable')
    this.el.removeEventListener('keydown', this.onKeydown)
  }
  filterShortcut (event) {
    if (!this.pContainable && (event.which === 13 && !event.shiftKey)) event.preventDefault()
  }
}
class AppUnitParent {
  constructor ({ el, appUnitElements, createAppTargets }) {
    this.el = el
    this.createAppTargets = createAppTargets
    this.appUnits = appUnitElements.map(el => this.createAppUnit({ el }))
  }
  createAppUnit ({ el }) {
    return new AppUnit({
      el,
      createAppTargets: this.createAppTargets,
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
class AppUnit {
  static get selector () {
    return '[data-editable="unit"]'
  }
  constructor ({
    el,
    createAppTargets,
    onClickAppTriggerInsertUnitCloneBefore,
    onClickAppTriggerInsertUnitCloneAfter,
    onClickAppTriggerRemoveUnit
  }) {
    this.el = el
    this.appTargets = createAppTargets({
      appTargetElements: [ ...this.el.querySelectorAll(AppTarget.selector) ]
    })
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

const messageNotSupported = 'This browser is not supported.'
const fileNameDefault = 'index.html'
const app = {}

if (FileReader == null) alert(messageNotSupported)
else {
  app.triggerDownload = new AppTriggerDownload({ onClick: download })
  app.unitParents = createAppUnitParents()
  const appTargetElements = [ ...document.body.querySelectorAll(AppTarget.selector) ]
    .filter(el => el.closest(AppUnit.selector) == null)
  app.targets = createAppTargets({ appTargetElements })
  activate()
}

function download () {
  const el = document.createElement('a')
  const fileName = location.pathname.split('/').pop() || fileNameDefault
  deactivate()
  const html = document.documentElement.outerHTML
  activate()
  const doctype = new XMLSerializer().serializeToString(document.doctype)
  const blob = new Blob([ doctype + html ])
  el.setAttribute('download', fileName)
  el.setAttribute('href', URL.createObjectURL(blob))
  el.dispatchEvent(new MouseEvent('click'))
}
function createAppTargets ({ appTargetElements }) {
  return appTargetElements.map(el => new AppTarget({ el, paragraphize }))
}
function createAppUnitParents () {
  const appUnitElements = [ ...document.body.querySelectorAll(AppUnit.selector) ]
  const appUnitParentElements = [ ...new Set(appUnitElements.map(el => el.parentNode)) ]
  const map = new Map()
  for (let el of appUnitParentElements) map.set(el, [])
  for (let el of appUnitElements) map.get(el.parentNode).push(el)
  return appUnitParentElements.map(el => new AppUnitParent({
    el,
    appUnitElements: map.get(el),
    createAppTargets
  }))
}
function activate () {
  // Output p instead of div on Enter
  document.execCommand('defaultParagraphSeparator', false, 'p')
  document.documentElement.setAttribute('data-editable', '')
  document.body.appendChild(app.triggerDownload.el)
  for (let appTarget of app.targets) appTarget.activate()
  for (let appUnitParent of app.unitParents) appUnitParent.activate()
}
function deactivate () {
  for (let appUnitParent of app.unitParents) appUnitParent.deactivate()
  for (let appTarget of app.targets) appTarget.deactivate()
  document.body.removeChild(app.triggerDownload.el)
  document.documentElement.removeAttribute('data-editable')
  document.execCommand('defaultParagraphSeparator', false, 'div')
}
function elementize (str = '') {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
// Wrap next input with p
function paragraphize () {
  document.execCommand('formatBlock', false, 'p')
}
