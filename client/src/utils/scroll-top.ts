const isBrowser = () => typeof window !== 'undefined'

function scrollToTop() {
  if (!isBrowser()) return
  setTimeout(() => {
    window.document.body.scrollIntoView({ behavior: 'smooth' })
  }, 500)
}
