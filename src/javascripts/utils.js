const detectMobile = () => {
  /android.+mobile|ip(hone|[oa]d)/i.test(navigator.userAgent)
    ? document.documentElement.classList.add('is-mobile')
    : document.documentElement.classList.remove('is-mobile')

  return true
}

export {
  detectMobile
}
