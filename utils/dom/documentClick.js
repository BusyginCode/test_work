
class DocumentClick {

  listeners = [];

  subscribe(listener) {
    this.listeners.push(listener)
  }

  unsubscribe(listener) {
    let key = this.listeners.indexOf(listener)
    if (key >= 0) {
      this.listeners.splice(key, 1)
    }
  }

}

const documentClick = new DocumentClick()

  document.addEventListener('click', (e) => {
  
    documentClick.listeners.forEach((listener) => {
      listener(e)
    })

  }, false)

export default documentClick