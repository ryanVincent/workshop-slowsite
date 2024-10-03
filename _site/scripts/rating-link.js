class RatingLink extends HTMLElement {
  connectedCallback() {
    this.abortController = new AbortController()

    this.addEventListener("click", this, {
      signal: this.abortController.signal
    })
  }

  disconnectedCallback() {
    this.abortController?.abort()
    this.abortController = null
  }

  handleEvent(event) {
    const target = document.querySelector(event.target.getAttribute("href"))
    console.log("RatingLink#handleEvent", target)
    if (target) {
      // enqueue opening and scrolling to the target in the next frame
      requestAnimationFrame(() => {
        target.setAttribute("open", true)
        target.scrollIntoView({ behavior: "auto" })
      })
      // don't append the target hash to the URL
      event.preventDefault()
    }
  }
}

customElements.define("rating-link", RatingLink)
