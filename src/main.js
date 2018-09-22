import './main.css'

const messageNotSupported = 'This browser is not supported.'
const readyToDownloadHtml = true
const fileNameDefault = 'index.html'
const templateTriggerDownload = '<div data-editable="trigger-download"></div>'
const templateTriggerInsertBefore = '<div data-editable="trigger-insert-before"></div>'
const templateTriggerRemoveSelf = '<div data-editable="trigger-remove-self"></div>'
const templateTriggerInsertAfter = '<div data-editable="trigger-insert-after"></div>'
const templateTriggersUnit = '<div data-editable="triggers-unit"></div>'

function elementize (str = '') {
  const el = document.createElement('div')
  el.innerHTML = str
  return el.firstElementChild
}
function downloadHtml () {
  if (!readyToDownloadHtml) return
  const fileName = location.pathname.split('/').pop() || fileNameDefault
  const blob = new Blob([ document.documentElement.outerHTML ])
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, fileName)
    return
  }
  const el = document.createElement('a')
  el.setAttribute('download', fileName)
  el.setAttribute('href', URL.createObjectURL(blob))
  el.dispatchEvent(new MouseEvent('click'))
}
function insertCloneBefore (event) {
  const el = event.currentTarget.closest('[data-editable="unit"]')
  const elClone = el.cloneNode(true)
  el.parentNode.insertBefore(elClone, el)
}
function removeSelf (event) {
  const el = event.currentTarget.closest('[data-editable="unit"]')
  el.parentNode.removeChild(el)
}
function insertCloneAfter (event) {
  const el = event.currentTarget.closest('[data-editable="unit"]')
  const elClone = el.cloneNode(true)
  el.parentNode.insertBefore(elClone, el.nextSibling)
}

// Check supported or not
if (FileReader == null) throw new Error(messageNotSupported)
document.documentElement.setAttribute('data-editable', '')
// Trigger to download
const elTriggerDownload = elementize(templateTriggerDownload)
elTriggerDownload.addEventListener('click', downloadHtml)
document.body.insertBefore(elTriggerDownload, document.body.firstChild)
// Make targets editable
for (let elTarget of document.querySelectorAll('[data-editable="target"]')) {
  elTarget.setAttribute('contenteditable', '')
}
// Enable to add and remove units
for (let elUnit of document.querySelectorAll('[data-editable="unit"]')) {
  if (window.getComputedStyle(elUnit, null).position === 'static') {
    elUnit.style.position = 'relative'
  }
  const elTriggerInsertBefore = elementize(templateTriggerInsertBefore)
  const elTriggerRemoveSelf = elementize(templateTriggerRemoveSelf)
  const elTriggerInsertAfter = elementize(templateTriggerInsertAfter)
  elTriggerInsertBefore.addEventListener('click', insertCloneBefore)
  elTriggerRemoveSelf.addEventListener('click', removeSelf)
  elTriggerInsertAfter.addEventListener('click', insertCloneAfter)
  const elTriggersUnit = elementize(templateTriggersUnit)
  for (let el of [elTriggerInsertBefore, elTriggerRemoveSelf, elTriggerInsertAfter]) {
    elTriggersUnit.appendChild(el)
  }
  elUnit.insertBefore(elTriggersUnit, elUnit.firstChild)
}
