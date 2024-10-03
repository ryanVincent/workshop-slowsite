
class DialogCookies extends HTMLElement {
  static cookieKey = "consent"

  connectedCallback() {
    // read the current cookie
    const cookieValue = `; ${document.cookie}`.split(`; ${this.constructor.cookieKey}=`)[1]?.split(";")[0]

    // if closed, return early
    if ("accepted" == cookieValue) return

    this.abortController = new AbortController()

    const dialog = this.querySelector(":scope > dialog")

    dialog.addEventListener("close", this, {
      signal: this.abortController.signal,
      once: true
    })

    requestAnimationFrame(() => { dialog.show() })
  }

  disconnectedCallback() {
    this.abortController?.abort()
    this.abortController = null
  }

  handleEvent() {
    document.cookie = `${this.constructor.cookieKey}=accepted; SameSite=Lax; Secure`
  }
}

customElements.define("dialog-cookies", DialogCookies)
