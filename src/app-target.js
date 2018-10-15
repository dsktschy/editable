export default class AppTarget {
  static get selector () {
    return '[data-editable="target"]'
  }
  constructor ({ el, createDivElement, paragraphize, convertToPlainText, createLink }) {
    this.el = el
    this.createDivElement = createDivElement
    this.textContainable = this.isContainable('a')
    this.brContainable = this.isContainable('<br>')
    this.pContainable = this.isContainable('<p></p>')
    this.bContainable = this.isContainable('<b></b>')
    this.iContainable = this.isContainable('<i></i>')
    this.uContainable = this.isContainable('<u></u>')
    this.aContainable = this.isContainable('<a></a>')
    this.onKeydown = event => {
      if (this.pContainable) this.doIfEmpty(paragraphize)
      this.filterShortcut(event, { createLink })
    }
    this.onPaste = event => {
      const newlineReplacementString =
        this.pContainable ? null : this.brContainable ? '<br>' : ''
      convertToPlainText(event, { newlineReplacementString })
    }
  }
  isContainable (text) {
    const elementName = this.el.tagName.toLowerCase()
    const expectedHtml = `<${elementName}>${text}</${elementName}>`
    const el = this.createDivElement()
    el.innerHTML = expectedHtml
    // If innerHTML is illegal and automatically corrected,
    // these values don't match before and after assignment
    return el.innerHTML === expectedHtml
  }
  doIfEmpty (fn) {
    if (!this.el.innerHTML) fn()
  }
  activate () {
    if (!this.textContainable) return
    this.el.addEventListener('keydown', this.onKeydown)
    this.el.addEventListener('paste', this.onPaste)
    this.el.setAttribute('contenteditable', '')
  }
  deactivate () {
    this.el.removeAttribute('contenteditable')
    this.el.removeEventListener('paste', this.onPaste)
    this.el.removeEventListener('keydown', this.onKeydown)
  }
  filterShortcut (event, { createLink }) {
    const pressedCTRLOrCommand =
      (event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)
    if (
      (!this.brContainable && (event.key === 'Enter' && event.shiftKey)) ||
      (!this.pContainable && (event.key === 'Enter' && !event.shiftKey)) ||
      (!this.bContainable && (event.key === 'b' && pressedCTRLOrCommand)) ||
      (!this.iContainable && (event.key === 'i' && pressedCTRLOrCommand)) ||
      (!this.uContainable && (event.key === 'u' && pressedCTRLOrCommand))
    ) event.preventDefault()
    else if (event.key === 'k' && pressedCTRLOrCommand) {
      if (!this.aContainable) event.preventDefault()
      else createLink({ targetBlank: !event.shiftKey })
    }
  }
}
