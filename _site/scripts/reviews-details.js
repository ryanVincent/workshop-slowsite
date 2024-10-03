class ReviewsDetails extends HTMLElement {
  static scriptUrl = "https://twnsnd-slowsite-reviews.netlify.app/reviews.js"

  /* polyfills scheduler.yield providing the best fallback possible */
  static #yieldToMain() {
    if ("scheduler" in window) {
      if ("yield" in scheduler) return scheduler.yield()
      if ("postTask" in scheduler) return scheduler.postTask(() => {})
    }

    return new Promise(resolve => { setTimeout(resolve) })
  }

  connectedCallback() {
    this.abortController = new AbortController()

    // listen on mouseover to inject our preload
    this.addEventListener("mouseover", this, {
      signal: this.abortController.signal,
      once: true
    })

    // listen on open to load the reviews script and execute it
    this.querySelector(":scope > details").addEventListener("toggle", this, {
      signal: this.abortController.signal
    })
  }

  disconnectedCallback() {
    this.abortController?.abort()
    this.abortController = null
  }

  async handleEvent(event) {
    // on hover, inject a preload for the reviews script
    if (event.type == "mouseover") {
      // double rAF to ensure this DOM manipulation occurs after the next paint
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const link = document.createElement("link")
          link.rel = "preload"
          link.as = "script"
          link.href = this.constructor.scriptUrl
          document.head.appendChild(link)
        })
      })
    // on open, inject the reviews script to execute it
    } else if (event.type == "toggle") {
      if (event.target.open) {
        // yield to the main thread, allowing paint to occur
        await this.constructor.#yieldToMain()
        // after yielding to the main thread, inject our script
        requestAnimationFrame(() => {
          const script = document.createElement("script")
          script.src = this.constructor.scriptUrl
          document.head.appendChild(script)
        })
        // prevent further events from triggering
        this.abortController?.abort()
      }
    } else {
      throw new Error(`Unhandled event: ${event.type}`)
    }
  }
}

customElements.define("reviews-details", ReviewsDetails)
