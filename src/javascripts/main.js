const utils = require('./utils')
const demo = require('../components/demo/demo')

document.addEventListener('DOMContentLoaded', () => {
  // Utils callbacks
  utils.detectMobile()

  // Components callbacks
  demo.demo()
})

window.addEventListener('resize', () => {
  // Utils callbacks
  utils.detectMobile()

  // Components callbacks
  // Your callbacks here 👇
})

// window.addEventListener('scroll', () => {
//   const callback = () => {
//     // Your callbacks here 👇
//   }
//   requestAnimationFrame(callback)
// })
