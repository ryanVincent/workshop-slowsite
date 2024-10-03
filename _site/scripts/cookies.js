import "https://unpkg.com/react/umd/react.development.js"
import "https://unpkg.com/react-dom/umd/react-dom.development.js"

const reactRoot = ReactDOM.createRoot(document.getElementById("cookie-wrapper"));
reactRoot.render(
  React.createElement("dialog-cookies", { key: "cookie-dialog-wrapper" }, [
    React.createElement("dialog", { key: "cookie-dialog" }, [
      React.createElement("p", {
        key: "cookie-notice"
      }, "Relic Seeker's Cookie Policy: This site uses cookies to slow your experience. By using this site, you agree to our use of cookies for the purposes of marketing, analytics and your maintaining your preferences across visits."),
      React.createElement("form", { key: "cookie-form", "method": "dialog" }, [
        React.createElement("button", {
          key: "cookie-button",
          type: "submit"
        }, "Close")
      ])
    ])
  ])
)

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
