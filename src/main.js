import './main.css'

const messageNotSupported = 'This browser is not supported.'
const readyToDownloadHtml = true
const fileNameDefault = 'index.html'
const elTriggerDownload = elementize(`
<div data-editable="trigger-download"></div>
`)

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

// Check supported or not
if (FileReader == null) throw new Error(messageNotSupported)
// Trigger to download
elTriggerDownload.addEventListener('click', downloadHtml)
document.body.insertBefore(elTriggerDownload, document.body.firstChild)
