import './app.css'
import AppTriggerDownload from './app-trigger-download'
import AppTarget from './app-target'
import AppUnitParent from './app-unit-parent'
import AppUnit from './app-unit'

const messageNotSupported = 'This browser is not supported.'
const messageOnPrompt = 'Enter the destination URL.'
const fileNameDefault = 'index.html'
const ua = navigator.userAgent.toLowerCase()
const app = {}

if (ua.indexOf('msie') > -1 || ua.indexOf('trident') > -1) {
  alert(messageNotSupported)
} else {
  app.triggerDownload = new AppTriggerDownload({ elementize, onClick: download })
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
  const newlineCode = searchFirstNewlineCode(html)
  const blob = new Blob([ doctype + newlineCode + html ])
  el.setAttribute('download', fileName)
  el.setAttribute('href', URL.createObjectURL(blob))
  el.dispatchEvent(new MouseEvent('click'))
}
function searchFirstNewlineCode (html) {
  let matched = html.match(/(\r\n|\r|\n)/)
  return matched != null ? matched[0] : ''
}
function createAppTargets ({ appTargetElements }) {
  return appTargetElements.map(
    el => new AppTarget({ el, createDivElement, paragraphize, convertToPlainText, createLink })
  )
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
    createAppTargets,
    elementize
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
function convertToPlainText (event, { newlineReplacementString }) {
  event.preventDefault()
  let plainText = event.clipboardData.getData('text/plain') || ''
  if (newlineReplacementString == null) {
    document.execCommand('insertText', false, plainText)
  } else {
    plainText = plainText.replace(/\r?\n/g, newlineReplacementString)
    document.execCommand('insertHTML', false, plainText)
  }
}
function createLink ({ targetBlank }) {
  const url = new URL(prompt(messageOnPrompt))
  if (targetBlank) {
    const selectedText = getSelection().toString()
    const html = `<a href="${url.href}" target="_blank">${selectedText}</a>`
    document.execCommand('insertHTML', false, html)
  } else {
    document.execCommand('createLink', false, url.href)
  }
}
function createDivElement () {
  return document.createElement('div')
}
